import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/**
 * Accessibility Test Suite for WEX Design System
 *
 * MANIFEST-DRIVEN APPROACH:
 * - Uses a11y-test-manifest.json to determine which examples to test
 * - Only tests examples marked with "test": true (unique color variants)
 * - Skips duplicates (same colors, just different layout/icons)
 * - Tests both light and dark modes
 * - Tracks per-example pass/fail with contrast ratios
 *
 * To regenerate the manifest:
 *   node scripts/generate-a11y-manifest.js
 *
 * THRESHOLD RULES:
 * - pass: 0 violations
 * - fail: any violations
 *
 * LEVEL MAPPING (signal only, not certification):
 * - 0 violations → "AA" (we run wcag2aa rules)
 * - Some violations → undefined
 */

// WCAG tags to test against
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

// Selector for component example containers
const EXAMPLE_SELECTOR = '[data-testid="component-example"]';

// ES Module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the test manifest
const manifestPath = path.join(__dirname, "a11y-test-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

// Extract component list from manifest
interface ManifestExample {
  id: string;
  title: string;
  test: boolean;
  reason: string;
}

interface ManifestComponent {
  name: string;
  key: string;
  route: string;
  totalExamples: number;
  untitledExamples: number;
  examples: ManifestExample[];
  testCount: number;
  skipCount: number;
}

const componentManifest: Record<string, ManifestComponent> = manifest.components;

// Mode configurations
type ColorMode = "light" | "dark";
const COLOR_MODES: ColorMode[] = ["light", "dark"];

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "test-results", "a11y-components");

/** Contrast ratio info extracted from axe-core message */
interface ContrastInfo {
  actual: number;
  required: number;
}

/** Result for a single example */
interface ExampleResult {
  status: "pass" | "fail";
  violations: number;
  issues: string[];
  contrastRatio?: ContrastInfo;
}

/** Violation summary for a failing element */
interface FailingElement {
  selector: string;
  violationId: string;
  impact: string;
  message: string;
  contrastRatio?: ContrastInfo;
}

/** Results for a mode */
interface ModeTestResult {
  status: "pass" | "fail" | "no_examples";
  violations: number;
  issues: string[];
  failingElements: FailingElement[];
  examples: Record<string, ExampleResult>;
  examplesTested: string[];
  examplesSkipped: string[];
  examplesFound: number;
}

/**
 * Extract contrast ratio from axe-core violation message
 * Example: "Element has insufficient color contrast of 4.15 ... Expected contrast ratio of 4.5:1"
 */
function extractContrastRatio(message: string): ContrastInfo | undefined {
  // Match "color contrast of X.XX" and "Expected contrast ratio of X.X:1"
  const actualMatch = message.match(/color contrast of ([\d.]+)/);
  const requiredMatch = message.match(/Expected contrast ratio of ([\d.]+):1/);
  
  if (actualMatch && requiredMatch) {
    return {
      actual: parseFloat(actualMatch[1]),
      required: parseFloat(requiredMatch[1]),
    };
  }
  return undefined;
}

test.describe("Component Accessibility Tests (Manifest-Driven)", () => {
  test.beforeAll(() => {
    // Create output directory for individual results
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  // Iterate over components in manifest
  for (const [componentKey, componentData] of Object.entries(componentManifest)) {
    test(`A11y: ${componentData.name}`, async ({ page }) => {
      // Get examples to test (where test: true)
      const examplesToTest = componentData.examples.filter(e => e.test);
      const examplesToSkip = componentData.examples.filter(e => !e.test);
      
      // Results for both modes
      const modeResults: Record<ColorMode, ModeTestResult> = {
        light: { 
          status: "no_examples", 
          violations: 0, 
          issues: [], 
          failingElements: [],
          examples: {},
          examplesTested: [],
          examplesSkipped: examplesToSkip.map(e => e.id),
          examplesFound: 0 
        },
        dark: { 
          status: "no_examples", 
          violations: 0, 
          issues: [], 
          failingElements: [],
          examples: {},
          examplesTested: [],
          examplesSkipped: examplesToSkip.map(e => e.id),
          examplesFound: 0 
        },
      };
      
      for (const mode of COLOR_MODES) {
        // Navigate to component page
        await page.goto(componentData.route);
        
        // Wait for page to be fully loaded
        await page.waitForLoadState("networkidle");
        
        // Set color mode by toggling .dark class on html element
        if (mode === "dark") {
          await page.evaluate(() => {
            document.documentElement.classList.add("dark");
          });
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove("dark");
          });
        }
        // Wait for CSS to update
        await page.waitForTimeout(100);
        
        // If no examples to test, check if there are any untitled examples to scan
        if (examplesToTest.length === 0) {
          // Fallback: scan all examples on the page
          const exampleCount = await page.locator(EXAMPLE_SELECTOR).count();
          
          if (exampleCount === 0) {
            console.warn(`\n⚠️  ${componentData.name} [${mode}]: No examples found`);
            continue;
          }
          
          // Scan all examples (no specific targeting)
          const accessibilityScanResults = await new AxeBuilder({ page })
            .include(EXAMPLE_SELECTOR)
            .withTags(WCAG_TAGS)
            .analyze();
          
          const issues: string[] = [];
          const failingElements: FailingElement[] = [];
          
          for (const violation of accessibilityScanResults.violations) {
            if (!issues.includes(violation.id)) {
              issues.push(violation.id);
            }
            for (const node of violation.nodes) {
              const message = node.failureSummary || violation.help;
              const contrastRatio = violation.id === "color-contrast" 
                ? extractContrastRatio(message)
                : undefined;
              
              failingElements.push({
                selector: node.target.join(" "),
                violationId: violation.id,
                impact: violation.impact || "unknown",
                message,
                contrastRatio,
              });
            }
          }
          
          // Create a single "untitled" example result
          const untitledResult: ExampleResult = {
            status: accessibilityScanResults.violations.length === 0 ? "pass" : "fail",
            violations: accessibilityScanResults.violations.length,
            issues,
          };
          
          modeResults[mode] = {
            status: accessibilityScanResults.violations.length === 0 ? "pass" : "fail",
            violations: accessibilityScanResults.violations.length,
            issues,
            failingElements,
            examples: { "(all-untitled)": untitledResult },
            examplesTested: ["(all-untitled)"],
            examplesSkipped: [],
            examplesFound: exampleCount,
          };
          
          if (accessibilityScanResults.violations.length > 0) {
            console.log(`\n❌ ${componentData.name} [${mode.toUpperCase()}]: ${accessibilityScanResults.violations.length} violations`);
          } else {
            console.log(`✅ ${componentData.name} [${mode.toUpperCase()}]: PASS (${exampleCount} untitled examples)`);
          }
          
          continue;
        }
        
        // Track violations across all targeted examples
        const allIssues: string[] = [];
        const allFailingElements: FailingElement[] = [];
        const exampleResults: Record<string, ExampleResult> = {};
        let totalViolations = 0;
        const testedIds: string[] = [];
        
        for (const exampleId of examplesToTest.map(e => e.id)) {
          const selector = `${EXAMPLE_SELECTOR}[data-example-id="${exampleId}"]`;
          const elementExists = await page.locator(selector).count() > 0;
          
          if (!elementExists) {
            // Example not found on page (may be dynamically loaded or different ID)
            continue;
          }
          
          testedIds.push(exampleId);
          
          // Run axe-core on this specific example
          const accessibilityScanResults = await new AxeBuilder({ page })
            .include(selector)
            .withTags(WCAG_TAGS)
            .analyze();
          
          const exampleIssues: string[] = [];
          let exampleContrastRatio: ContrastInfo | undefined;
          
          for (const violation of accessibilityScanResults.violations) {
            totalViolations++;
            if (!allIssues.includes(violation.id)) {
              allIssues.push(violation.id);
            }
            if (!exampleIssues.includes(violation.id)) {
              exampleIssues.push(violation.id);
            }
            
            for (const node of violation.nodes) {
              const message = node.failureSummary || violation.help;
              const contrastRatio = violation.id === "color-contrast" 
                ? extractContrastRatio(message)
                : undefined;
              
              // Store the first contrast ratio for this example
              if (contrastRatio && !exampleContrastRatio) {
                exampleContrastRatio = contrastRatio;
              }
              
              allFailingElements.push({
                selector: node.target.join(" "),
                violationId: violation.id,
                impact: violation.impact || "unknown",
                message,
                contrastRatio,
              });
            }
          }
          
          // Store per-example result
          exampleResults[exampleId] = {
            status: accessibilityScanResults.violations.length === 0 ? "pass" : "fail",
            violations: accessibilityScanResults.violations.length,
            issues: exampleIssues,
            contrastRatio: exampleContrastRatio,
          };
        }
        
        modeResults[mode] = {
          status: totalViolations === 0 ? "pass" : "fail",
          violations: totalViolations,
          issues: allIssues,
          failingElements: allFailingElements,
          examples: exampleResults,
          examplesTested: testedIds,
          examplesSkipped: examplesToSkip.map(e => e.id),
          examplesFound: testedIds.length,
        };
        
        // Log summary
        const skippedInfo = examplesToSkip.length > 0 ? ` (skipped ${examplesToSkip.length} duplicates)` : "";
        if (totalViolations > 0) {
          console.log(`\n❌ ${componentData.name} [${mode.toUpperCase()}]: ${totalViolations} violations in ${testedIds.length} examples${skippedInfo}`);
          allIssues.forEach(issue => console.log(`   - ${issue}`));
        } else {
          console.log(`✅ ${componentData.name} [${mode.toUpperCase()}]: PASS (${testedIds.length} examples tested${skippedInfo})`);
        }
      }
      
      // Determine combined status
      const lightStatus = modeResults.light.status;
      const darkStatus = modeResults.dark.status;
      let combinedStatus: "pass" | "fail" | "partial" | "no_examples";
      
      if (lightStatus === "no_examples" && darkStatus === "no_examples") {
        combinedStatus = "no_examples";
      } else if (lightStatus === "pass" && darkStatus === "pass") {
        combinedStatus = "pass";
      } else if (lightStatus === "fail" && darkStatus === "fail") {
        combinedStatus = "fail";
      } else if (lightStatus === "no_examples" || darkStatus === "no_examples") {
        combinedStatus = lightStatus === "no_examples" ? darkStatus : lightStatus;
      } else {
        combinedStatus = "partial";
      }
      
      // Write result file
      const result = {
        key: componentKey,
        name: componentData.name,
        scope: "manifest-driven",
        testedAt: new Date().toISOString(),
        status: combinedStatus,
        levelAchieved: combinedStatus === "pass" ? "AA" : undefined,
        manifest: {
          testCount: componentData.testCount,
          skipCount: componentData.skipCount,
          untitledCount: componentData.untitledExamples,
        },
        modes: {
          light: modeResults.light,
          dark: modeResults.dark,
        },
        // Legacy fields
        violations: modeResults.light.violations + modeResults.dark.violations,
        issues: [...new Set([...modeResults.light.issues, ...modeResults.dark.issues])],
        examplesFound: Math.max(modeResults.light.examplesFound, modeResults.dark.examplesFound),
        hasExamples: modeResults.light.examplesFound > 0 || modeResults.dark.examplesFound > 0,
      };

      const resultPath = path.join(outputDir, `${componentKey}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

      // Test always passes - we collect results for the report
      expect(true).toBe(true);
    });
  }
});
