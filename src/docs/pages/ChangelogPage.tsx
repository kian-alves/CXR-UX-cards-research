/**
 * Changelog page
 * Placeholder for future release notes
 */
export default function ChangelogPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Changelog
        </h1>
        <p className="text-lg text-muted-foreground">
          Release notes and version history.
        </p>
      </header>

      <div className="space-y-8">
        <ChangelogEntry
          version="0.4.1"
          date="December 20, 2024"
          title="Dark Mode Accessibility Fixes"
          changes={[
            "Colors: Added MutationObserver to re-compute contrast when theme changes",
            "Colors: Fixed contrast badge text unreadable in dark mode (AA-large was black-on-dark)",
            "Colors: Updated badge styling to use theme-adaptive text colors",
            "Colors: All contrast indicators now update live when toggling light/dark mode",
            "A11y: Replaced text-warning-foreground with text-warning across all docs components",
            "A11y: Fixed warning icons/badges unreadable in dark mode (21 instances)",
          ]}
        />

        <ChangelogEntry
          version="0.4.0"
          date="December 20, 2024"
          title="Charts, Colors & Governance"
          changes={[
            "Charts: Added 4 rendered examples (bar, line, multi-series, area, pie/donut)",
            "Charts: Created chartColors.ts utility for CSS variable resolution",
            "Charts: Updated chart page with guidance on when to use each chart type",
            "Colors: Added 'What These Ratings Mean' definitions section explaining WCAG thresholds",
            "Colors: Improved contrast badge legibility with larger text, icons, and better contrast",
            "Colors: Added compact contrast scores to extended palette (50-900) swatches",
            "Colors: Moved contrast badges from swatch overlay to card section for readability",
            "Governance: Added Section 7 to WEX_COMPONENT_RULES.md requiring changelog updates",
            "A11y Dashboard: Removed internal test metadata (scope, scenarios) from modal display",
            "A11y Dashboard: Added 'Variants Tested' section showing named variants only",
            "Dialog: Fixed centering issue with inline styles for reliable positioning",
          ]}
        />

        <ChangelogEntry
          version="0.3.0"
          date="December 19, 2024"
          title="Accessibility & Polish Update"
          changes={[
            "WCAG 2.2 AA compliance notes added to all component pages",
            "Navigation scroll-to-top on route change",
            "WEX logo integration in header (light/dark mode support)",
            "Favicon configuration with all platform sizes",
            "Dark mode contrast improvements (especially toast descriptions)",
            "Toast positioning variants (all 6 viewport positions)",
            "Toggle page completed with all sections and examples",
            "Success, warning, and info token definitions added",
            "Accessibility section standardization across components",
          ]}
        />

        <ChangelogEntry
          version="0.2.0"
          date="December 2024"
          title="Component Library Expansion"
          changes={[
            "All shadcn/ui components installed and wrapped as Wex* components",
            "Complete component documentation site with interactive examples",
            "Pattern A architecture with Wex wrapper components",
            "Single namespace exports from @/components/wex",
            "Page titles cleaned up (removed 'Wex' prefix for readability)",
            "Color swatches added to Colors foundation page",
            "Drawer, Sheet, HoverCard pages completed with all sections",
          ]}
        />

        <ChangelogEntry
          version="0.1.0"
          date="December 2024"
          title="Initial Release"
          changes={[
            "WexButton component with 5 intent variants and 3 sizes",
            "Two-layer token architecture (wex.tokens.css + wex.shadcn-bridge.css)",
            "Light and dark mode support",
            "Documentation site foundation",
            "WEX_COMPONENT_RULES.md governance document",
          ]}
        />

        <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">
            More releases coming soon. Watch the repository for updates.
          </p>
        </div>
      </div>
    </article>
  );
}

interface ChangelogEntryProps {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

function ChangelogEntry({ version, date, title, changes }: ChangelogEntryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-2 py-1 text-sm font-mono bg-primary/10 text-primary rounded">
          v{version}
        </span>
        <span className="text-sm text-muted-foreground">{date}</span>
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        {changes.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </ul>
    </div>
  );
}

