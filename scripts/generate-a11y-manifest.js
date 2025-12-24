#!/usr/bin/env node

/**
 * A11y Test Manifest Generator
 * 
 * Scans all component documentation pages to extract ExampleCard information
 * and generates a manifest that shows:
 * - Which examples exist per component
 * - Which ones should be tested for color contrast (unique color variants)
 * - Which ones are duplicates and can be skipped
 * 
 * The manifest gives visibility into the testing strategy before running tests.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, "..", "src", "docs", "pages", "components");
const outputPath = path.join(__dirname, "..", "tests", "a11y", "a11y-test-manifest.json");

// Components to exclude from testing (non-semantic/layout-only components)
const EXCLUDED_COMPONENTS = [
  "AspectRatioPage.tsx", // Layout utility, not a semantic component
];

/**
 * Known patterns for duplicate/non-color examples
 * These patterns indicate examples that repeat the same color variants
 */
const DUPLICATE_PATTERNS = [
  /with icons?/i,
  /icon only/i,
  /icon sizes?/i,
  /without title/i,
  /controlled/i,
  /uncontrolled/i,
  /loading/i,
  /disabled/i,
  /sizes?$/i,
  /alignment/i,
  /positioning/i,
  /placement/i,
  /orientation/i,
  /responsive/i,
  /stacking/i,
  /grouped/i,
  /form integration/i,
  /custom/i,
  /with description/i,
  /interactive/i,
];

/**
 * Known color variant patterns
 * These indicate examples with unique color combinations that should be tested
 */
const COLOR_VARIANT_PATTERNS = [
  /^default$/i,
  /^primary$/i,
  /^secondary$/i,
  /^destructive$/i,
  /^success$/i,
  /^warning$/i,
  /^info$/i,
  /^help$/i,
  /^error$/i,
  /^muted$/i,
  /^ghost$/i,
  /^outline/i,
  /^link$/i,
  /^tertiary$/i,
  /severity|severities/i,
  /intent|intents/i,
  /variant|variants/i,
  /all colors/i,
  /status indicator/i,
];

/**
 * Extract ExampleCard titles from a component file
 */
function extractExampleCards(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const examples = [];
  
  // Match ExampleCard with title prop
  const titleRegex = /<ExampleCard\s+(?:[^>]*\s)?title="([^"]+)"/g;
  let match;
  while ((match = titleRegex.exec(content)) !== null) {
    examples.push({
      title: match[1],
      id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    });
  }
  
  // Also match ExampleCard with exampleId prop
  const idRegex = /<ExampleCard\s+(?:[^>]*\s)?exampleId="([^"]+)"/g;
  while ((match = idRegex.exec(content)) !== null) {
    const existingById = examples.find(e => e.id === match[1]);
    if (!existingById) {
      examples.push({
        title: match[1],
        id: match[1],
      });
    }
  }
  
  // Count ExampleCards without title (auto-generated IDs)
  const totalExampleCards = (content.match(/<ExampleCard/g) || []).length;
  const untitledCount = totalExampleCards - examples.length;
  
  return { examples, untitledCount };
}

/**
 * Determine if an example should be tested for color contrast
 */
function shouldTestForColor(title) {
  // Check if it's a known color variant
  for (const pattern of COLOR_VARIANT_PATTERNS) {
    if (pattern.test(title)) {
      return { test: true, reason: "Color variant" };
    }
  }
  
  // Check if it's a known duplicate pattern
  for (const pattern of DUPLICATE_PATTERNS) {
    if (pattern.test(title)) {
      return { test: false, reason: `Duplicate (${pattern.source.replace(/[\\^$]/g, '')})` };
    }
  }
  
  // Default: test it (better to over-test than under-test)
  return { test: true, reason: "Default (unknown pattern)" };
}

/**
 * Get component key from filename
 */
function getComponentKey(filename) {
  return filename
    .replace(/Page\.tsx$/, "")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

function main() {
  console.log("Generating A11y Test Manifest...\n");
  
  // Get all component page files
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith("Page.tsx"));
  console.log(`Found ${files.length} component pages\n`);
  
  const manifest = {
    _meta: {
      description: "A11y test manifest - defines which examples to test for color contrast",
      generatedAt: new Date().toISOString(),
      totalComponents: files.length,
      howToUse: "Review this file, adjust 'test' flags as needed, then run tests",
    },
    summary: {
      totalExamples: 0,
      toTest: 0,
      toSkip: 0,
      untitled: 0,
    },
    components: {},
  };
  
  for (const file of files) {
    // Skip excluded components
    if (EXCLUDED_COMPONENTS.includes(file)) {
      console.log(`  Skipping ${file} (excluded)`);
      continue;
    }
    
    const filePath = path.join(componentsDir, file);
    const componentName = file.replace(/Page\.tsx$/, "");
    const componentKey = getComponentKey(file);
    
    const { examples, untitledCount } = extractExampleCards(filePath);
    
    const componentEntry = {
      name: `Wex${componentName}`,  // Use Wex* prefix to match actual component names
      key: componentKey,
      route: `/components/${componentKey}`,
      totalExamples: examples.length + untitledCount,
      untitledExamples: untitledCount,
      examples: examples.map(ex => {
        const decision = shouldTestForColor(ex.title);
        return {
          id: ex.id,
          title: ex.title,
          test: decision.test,
          reason: decision.reason,
        };
      }),
    };
    
    // Calculate stats
    const testCount = componentEntry.examples.filter(e => e.test).length;
    const skipCount = componentEntry.examples.filter(e => !e.test).length;
    
    componentEntry.testCount = testCount;
    componentEntry.skipCount = skipCount;
    
    manifest.components[componentKey] = componentEntry;
    
    // Update summary
    manifest.summary.totalExamples += examples.length;
    manifest.summary.toTest += testCount;
    manifest.summary.toSkip += skipCount;
    manifest.summary.untitled += untitledCount;
  }
  
  // Write manifest
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest written to: ${outputPath}\n`);
  
  // Print summary
  console.log("--- Summary ---");
  console.log(`Total components: ${manifest._meta.totalComponents}`);
  console.log(`Total titled examples: ${manifest.summary.totalExamples}`);
  console.log(`  → To test (color variants): ${manifest.summary.toTest}`);
  console.log(`  → To skip (duplicates): ${manifest.summary.toSkip}`);
  console.log(`Untitled examples (auto-ID): ${manifest.summary.untitled}`);
  
  // Print per-component breakdown
  console.log("\n--- Per-Component Breakdown ---");
  Object.entries(manifest.components).forEach(([key, comp]) => {
    const testList = comp.examples.filter(e => e.test).map(e => e.id).join(", ") || "(none)";
    const skipList = comp.examples.filter(e => !e.test).map(e => e.id).join(", ") || "(none)";
    
    console.log(`\n${comp.name}:`);
    console.log(`  Test (${comp.testCount}): ${testList}`);
    if (comp.skipCount > 0) {
      console.log(`  Skip (${comp.skipCount}): ${skipList}`);
    }
    if (comp.untitledExamples > 0) {
      console.log(`  Untitled: ${comp.untitledExamples}`);
    }
  });
}

main();

