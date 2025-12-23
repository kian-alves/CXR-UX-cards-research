import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";

/**
 * Accessibility Test Suite for WEX Design System
 *
 * SIMPLIFIED APPROACH:
 * - Scans ALL component examples on the page at once (not per-example)
 * - axe-core automatically deduplicates violations by element
 * - Tests both light and dark modes
 * 
 * This approach:
 * - Fixes components showing "no_examples" (Avatar, Breadcrumb, etc.)
 * - Stops redundant testing (Success button tested once, not per-example)
 * - Faster test execution
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

// Component registry - must match src/docs/registry/components.ts
const componentRoutes = [
  { key: "accordion", route: "/components/accordion", name: "Accordion" },
  { key: "alert", route: "/components/alert", name: "Alert" },
  { key: "alert-dialog", route: "/components/alert-dialog", name: "Alert Dialog" },
  { key: "aspect-ratio", route: "/components/aspect-ratio", name: "Aspect Ratio" },
  { key: "avatar", route: "/components/avatar", name: "Avatar" },
  { key: "badge", route: "/components/badge", name: "Badge" },
  { key: "breadcrumb", route: "/components/breadcrumb", name: "Breadcrumb" },
  { key: "button", route: "/components/button", name: "Button" },
  { key: "button-group", route: "/components/button-group", name: "Button Group" },
  { key: "calendar", route: "/components/calendar", name: "Calendar" },
  { key: "card", route: "/components/card", name: "Card" },
  { key: "data-table", route: "/components/data-table", name: "Data Table" },
  { key: "date-picker", route: "/components/date-picker", name: "Date Picker" },
  { key: "carousel", route: "/components/carousel", name: "Carousel" },
  { key: "chart", route: "/components/chart", name: "Chart" },
  { key: "checkbox", route: "/components/checkbox", name: "Checkbox" },
  { key: "collapsible", route: "/components/collapsible", name: "Collapsible" },
  { key: "combobox", route: "/components/combobox", name: "Combobox" },
  { key: "command", route: "/components/command", name: "Command" },
  { key: "context-menu", route: "/components/context-menu", name: "Context Menu" },
  { key: "dialog", route: "/components/dialog", name: "Dialog" },
  { key: "drawer", route: "/components/drawer", name: "Drawer" },
  { key: "dropdown-menu", route: "/components/dropdown-menu", name: "Dropdown Menu" },
  { key: "empty", route: "/components/empty", name: "Empty" },
  { key: "field", route: "/components/field", name: "Field" },
  { key: "form", route: "/components/form", name: "Form" },
  { key: "hover-card", route: "/components/hover-card", name: "Hover Card" },
  { key: "input", route: "/components/input", name: "Input" },
  { key: "input-group", route: "/components/input-group", name: "Input Group" },
  { key: "input-otp", route: "/components/input-otp", name: "Input OTP" },
  { key: "item", route: "/components/item", name: "Item" },
  { key: "kbd", route: "/components/kbd", name: "Kbd" },
  { key: "label", route: "/components/label", name: "Label" },
  { key: "menubar", route: "/components/menubar", name: "Menubar" },
  { key: "navigation-menu", route: "/components/navigation-menu", name: "Navigation Menu" },
  { key: "pagination", route: "/components/pagination", name: "Pagination" },
  { key: "popover", route: "/components/popover", name: "Popover" },
  { key: "progress", route: "/components/progress", name: "Progress" },
  { key: "radio-group", route: "/components/radio-group", name: "Radio Group" },
  { key: "resizable", route: "/components/resizable", name: "Resizable" },
  { key: "scroll-area", route: "/components/scroll-area", name: "Scroll Area" },
  { key: "select", route: "/components/select", name: "Select" },
  { key: "separator", route: "/components/separator", name: "Separator" },
  { key: "sheet", route: "/components/sheet", name: "Sheet" },
  { key: "sidebar", route: "/components/sidebar", name: "Sidebar" },
  { key: "skeleton", route: "/components/skeleton", name: "Skeleton" },
  { key: "slider", route: "/components/slider", name: "Slider" },
  { key: "sonner", route: "/components/sonner", name: "Sonner" },
  { key: "spinner", route: "/components/spinner", name: "Spinner" },
  { key: "switch", route: "/components/switch", name: "Switch" },
  { key: "table", route: "/components/table", name: "Table" },
  { key: "tabs", route: "/components/tabs", name: "Tabs" },
  { key: "textarea", route: "/components/textarea", name: "Textarea" },
  { key: "toast", route: "/components/toast", name: "Toast" },
  { key: "toggle", route: "/components/toggle", name: "Toggle" },
  { key: "toggle-group", route: "/components/toggle-group", name: "Toggle Group" },
  { key: "tooltip", route: "/components/tooltip", name: "Tooltip" },
];

// Mode configurations
type ColorMode = "light" | "dark";
const COLOR_MODES: ColorMode[] = ["light", "dark"];

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "test-results", "a11y-components");

/** Violation summary for a failing element */
interface FailingElement {
  selector: string;
  violationId: string;
  impact: string;
  message: string;
}

/** Results for a mode */
interface ModeTestResult {
  status: "pass" | "fail" | "no_examples";
  violations: number;
  issues: string[];
  failingElements: FailingElement[];
  examplesFound: number;
}

test.describe("Component Accessibility Tests (Light + Dark Modes)", () => {
  test.beforeAll(() => {
    // Create output directory for individual results
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  for (const component of componentRoutes) {
    test(`A11y: ${component.name}`, async ({ page }) => {
      // Results for both modes
      const modeResults: Record<ColorMode, ModeTestResult> = {
        light: { status: "no_examples", violations: 0, issues: [], failingElements: [], examplesFound: 0 },
        dark: { status: "no_examples", violations: 0, issues: [], failingElements: [], examplesFound: 0 },
      };
      
      for (const mode of COLOR_MODES) {
        // Navigate to component page
        await page.goto(component.route);
        
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
        
        // Count example containers
        const exampleCount = await page.locator(EXAMPLE_SELECTOR).count();
        
        // Handle case where no examples are found
        if (exampleCount === 0) {
          console.warn(`\n⚠️  ${component.name} [${mode}]: No example containers found!`);
          modeResults[mode] = {
            status: "no_examples",
            violations: 0,
            issues: [],
            failingElements: [],
            examplesFound: 0,
          };
          continue;
        }
        
        // Run axe-core on ALL example containers at once
        // axe-core automatically deduplicates violations by element
        const accessibilityScanResults = await new AxeBuilder({ page })
          .include(EXAMPLE_SELECTOR)
          .withTags(WCAG_TAGS)
          .analyze();
        
        // Process violations
        const issues: string[] = [];
        const failingElements: FailingElement[] = [];
        
        for (const violation of accessibilityScanResults.violations) {
          if (!issues.includes(violation.id)) {
            issues.push(violation.id);
          }
          
          // Extract failing elements (deduplicated by axe-core)
          for (const node of violation.nodes) {
            failingElements.push({
              selector: node.target.join(" "),
              violationId: violation.id,
              impact: violation.impact || "unknown",
              message: node.failureSummary || violation.help,
            });
          }
        }
        
        const totalViolations = accessibilityScanResults.violations.length;
        
        modeResults[mode] = {
          status: totalViolations === 0 ? "pass" : "fail",
          violations: totalViolations,
          issues,
          failingElements,
          examplesFound: exampleCount,
        };
        
        // Log summary
        if (totalViolations > 0) {
          console.log(`\n❌ ${component.name} [${mode.toUpperCase()}]: ${totalViolations} violations`);
          issues.forEach(issue => console.log(`   - ${issue}`));
        } else {
          console.log(`✅ ${component.name} [${mode.toUpperCase()}]: PASS (${exampleCount} examples scanned)`);
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
        // One mode has no examples - use the other's status
        combinedStatus = lightStatus === "no_examples" ? darkStatus : lightStatus;
      } else {
        // Mixed: one passes, one fails
        combinedStatus = "partial";
      }
      
      // Write result file
      const result = {
        key: component.key,
        name: component.name,
        scope: "component-examples-only",
        testedAt: new Date().toISOString(),
        status: combinedStatus,
        levelAchieved: combinedStatus === "pass" ? "AA" : undefined,
        modes: {
          light: modeResults.light,
          dark: modeResults.dark,
        },
        // Legacy fields for backwards compatibility
        violations: modeResults.light.violations + modeResults.dark.violations,
        issues: [...new Set([...modeResults.light.issues, ...modeResults.dark.issues])],
        examplesFound: Math.max(modeResults.light.examplesFound, modeResults.dark.examplesFound),
        hasExamples: modeResults.light.examplesFound > 0 || modeResults.dark.examplesFound > 0,
      };

      const resultPath = path.join(outputDir, `${component.key}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

      // Test always passes - we collect results for the report
      expect(true).toBe(true);
    });
  }
});
