/**
 * FilteredLivePreview Component
 * 
 * Shows only components that are affected by the currently selected semantic token.
 * This provides focused feedback when editing theme colors.
 * 
 * Component mapping based on exhaustive grep of src/components:
 * - PRIMARY: 15 component usages
 * - DESTRUCTIVE: 10 component usages
 * - SUCCESS: 3 component usages
 * - WARNING: 3 component usages
 * - INFO: 3 component usages
 */

import * as React from "react";
import {
  WexButton,
  WexBadge,
  WexAlert,
  WexProgress,
  WexSwitch,
  WexCheckbox,
  WexRadioGroup,
  WexSlider,
  WexSkeleton,
  WexCard,
  WexTabs,
  WexInput,
  WexSeparator,
  WexCalendar,
} from "@/components/wex";
import { cn } from "@/lib/utils";

interface FilteredLivePreviewProps {
  /** The semantic token being edited, e.g., "--wex-primary" */
  selectedToken: string | null;
  /** Optional className */
  className?: string;
}

/**
 * Component preview configurations per semantic token
 */
const TOKEN_PREVIEW_MAP: Record<string, React.FC> = {
  // Intent colors
  "--wex-primary": PrimaryPreview,
  "--wex-destructive": DestructivePreview,
  "--wex-success": SuccessPreview,
  "--wex-warning": WarningPreview,
  "--wex-info": InfoPreview,
  // Surface tokens
  "--wex-content-bg": SurfacePreview,
  "--wex-content-border": SurfacePreview,
  "--wex-surface-subtle": SurfacePreview,
  "--wex-input-border": SurfacePreview,
  // Text tokens
  "--wex-text": TextPreview,
  "--wex-text-muted": TextPreview,
};

/**
 * Preview for Primary token - EXHAUSTIVE list from component grep:
 * 
 * 1. WexButton (default) - bg-primary, text-primary-foreground
 * 2. WexButton (link) - text-primary
 * 3. WexBadge (default) - bg-primary, text-primary-foreground
 * 4. WexSwitch (checked) - data-[state=checked]:bg-primary
 * 5. WexCheckbox (checked + border) - border-primary, data-[state=checked]:bg-primary
 * 6. WexRadio (border + indicator) - border-primary, text-primary
 * 7. WexSlider (track, range, thumb) - bg-primary/20, bg-primary, border-primary
 * 8. WexProgress (track, bar) - bg-primary/20, bg-primary
 * 9. WexSkeleton (pulse bg) - bg-primary/10
 * 10. WexCalendar (selected) - bg-primary, text-primary-foreground
 * 11. Field (checked bg/border) - bg-primary/5, border-primary
 * 12. Item/Empty (links) - text-primary
 * 13. Sonner (action button) - bg-primary, text-primary-foreground
 */
function PrimaryPreview() {
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-4">
      {/* Buttons */}
      <PreviewSection label="Button">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm">Primary</WexButton>
          <WexButton size="sm" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Link */}
      <PreviewSection label="Link Text">
        <a href="#" onClick={e => e.preventDefault()} className="text-primary hover:underline text-sm">
          Primary colored link
        </a>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge>Default Badge</WexBadge>
      </PreviewSection>

      {/* Progress */}
      <PreviewSection label="Progress (track + bar)">
        <WexProgress value={65} className="w-full" />
      </PreviewSection>

      {/* Switch */}
      <PreviewSection label="Switch (checked state)">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexSwitch defaultChecked id="sw-checked" />
            <label htmlFor="sw-checked" className="text-sm">On</label>
          </div>
          <div className="flex items-center gap-2">
            <WexSwitch id="sw-unchecked" />
            <label htmlFor="sw-unchecked" className="text-sm">Off</label>
          </div>
        </div>
      </PreviewSection>

      {/* Checkbox */}
      <PreviewSection label="Checkbox (border + checked)">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WexCheckbox defaultChecked id="cb-checked" />
            <label htmlFor="cb-checked" className="text-sm">Checked</label>
          </div>
          <div className="flex items-center gap-2">
            <WexCheckbox id="cb-unchecked" />
            <label htmlFor="cb-unchecked" className="text-sm">Unchecked</label>
          </div>
        </div>
      </PreviewSection>

      {/* Radio */}
      <PreviewSection label="Radio Group (border + indicator)">
        <WexRadioGroup defaultValue="opt1" className="flex gap-4">
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt1" id="r1" />
            <label htmlFor="r1" className="text-sm">Selected</label>
          </div>
          <div className="flex items-center gap-2">
            <WexRadioGroup.Item value="opt2" id="r2" />
            <label htmlFor="r2" className="text-sm">Option 2</label>
          </div>
        </WexRadioGroup>
      </PreviewSection>

      {/* Slider */}
      <PreviewSection label="Slider (track + range + thumb)">
        <WexSlider defaultValue={[50]} max={100} step={1} className="w-full" />
      </PreviewSection>

      {/* Skeleton */}
      <PreviewSection label="Skeleton (bg-primary/10)">
        <div className="flex items-center gap-3">
          <WexSkeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <WexSkeleton className="h-4 w-32" />
            <WexSkeleton className="h-3 w-24" />
          </div>
        </div>
      </PreviewSection>

      {/* Calendar */}
      <PreviewSection label="Calendar (selected date)">
        <div className="border rounded-md w-fit">
          <WexCalendar 
            mode="single" 
            selected={calendarDate} 
            onSelect={setCalendarDate}
            className="p-0"
          />
        </div>
      </PreviewSection>

      {/* Field checked state */}
      <PreviewSection label="Field (checked highlight)">
        <div className="flex items-center gap-3 p-3 rounded-md border bg-primary/5 border-primary">
          <WexCheckbox defaultChecked id="field-cb" />
          <label htmlFor="field-cb" className="text-sm">Selected field with primary highlight</label>
        </div>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Destructive token - EXHAUSTIVE list:
 * 
 * 1. WexButton (destructive) - bg-destructive, text-destructive-foreground
 * 2. WexBadge (destructive) - bg-destructive, text-destructive-foreground
 * 3. WexAlert (destructive) - border-destructive/50, text-destructive
 * 4. Form (error) - text-destructive
 * 5. Field (invalid) - text-destructive, border-destructive
 * 6. InputGroup (invalid) - ring-destructive/20, border-destructive
 * 7. Sonner (error toast) - bg-destructive
 */
function DestructivePreview() {
  return (
    <div className="space-y-4">
      {/* Button */}
      <PreviewSection label="Button">
        <div className="flex flex-wrap gap-2">
          <WexButton size="sm" intent="destructive">Delete</WexButton>
          <WexButton size="sm" intent="destructive" disabled>Disabled</WexButton>
        </div>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="destructive">Error</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="destructive">
          <WexAlert.Title>Error</WexAlert.Title>
          <WexAlert.Description>
            Something went wrong. Please try again.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>

      {/* Form Error State */}
      <PreviewSection label="Form Field (error state)">
        <div className="space-y-1">
          <WexInput 
            placeholder="Email address" 
            className="border-destructive focus-visible:ring-destructive/20"
            aria-invalid="true"
          />
          <p className="text-sm text-destructive">Please enter a valid email address.</p>
        </div>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Success token:
 * 1. WexAlert (success) - border-success/50, bg-success/10, text-success
 * 2. WexBadge (success) - bg-success, text-success-foreground
 * 3. Sonner (success toast) - bg-success
 */
function SuccessPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="success">Success</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="success">
          <WexAlert.Title>Success!</WexAlert.Title>
          <WexAlert.Description>
            Your changes have been saved successfully.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Warning token:
 * 1. WexAlert (warning) - border-warning/50, bg-warning/10, text-warning-foreground
 * 2. WexBadge (warning) - bg-warning, text-warning-foreground
 * 3. Sonner (warning toast) - bg-warning
 */
function WarningPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="warning">Warning</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="warning">
          <WexAlert.Title>Warning</WexAlert.Title>
          <WexAlert.Description>
            Please review this information before continuing.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Info token:
 * 1. WexAlert (info) - border-info/50, bg-info/10, text-info
 * 2. WexBadge (info) - bg-info, text-info-foreground
 * 3. Sonner (info toast) - bg-info
 */
function InfoPreview() {
  return (
    <div className="space-y-4">
      {/* Badge */}
      <PreviewSection label="Badge">
        <WexBadge intent="info">Info</WexBadge>
      </PreviewSection>

      {/* Alert */}
      <PreviewSection label="Alert">
        <WexAlert intent="info">
          <WexAlert.Title>Information</WexAlert.Title>
          <WexAlert.Description>
            Here is some helpful information for you.
          </WexAlert.Description>
        </WexAlert>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Surface tokens (bg, border, subtle)
 */
function SurfacePreview() {
  return (
    <div className="space-y-4">
      {/* Card */}
      <PreviewSection label="Card (background + border)">
        <WexCard className="p-4">
          <p className="text-sm">This card uses surface background and border colors.</p>
        </WexCard>
      </PreviewSection>

      {/* Input */}
      <PreviewSection label="Input (border)">
        <WexInput placeholder="Input with border..." />
      </PreviewSection>

      {/* Separator */}
      <PreviewSection label="Separator">
        <div className="space-y-2">
          <p className="text-sm">Content above</p>
          <WexSeparator />
          <p className="text-sm">Content below</p>
        </div>
      </PreviewSection>

      {/* Subtle background */}
      <PreviewSection label="Subtle Background (muted)">
        <div className="bg-muted rounded-md p-4">
          <p className="text-sm">This uses the subtle surface background.</p>
        </div>
      </PreviewSection>

      {/* Tabs (uses muted bg) */}
      <PreviewSection label="Tabs (muted background)">
        <WexTabs defaultValue="tab1" className="w-full">
          <WexTabs.List>
            <WexTabs.Trigger value="tab1">Selected</WexTabs.Trigger>
            <WexTabs.Trigger value="tab2">Tab Two</WexTabs.Trigger>
          </WexTabs.List>
        </WexTabs>
      </PreviewSection>
    </div>
  );
}

/**
 * Preview for Text tokens
 */
function TextPreview() {
  return (
    <div className="space-y-4">
      {/* Foreground text */}
      <PreviewSection label="Primary Text (foreground)">
        <p className="text-foreground">
          This is primary text content using the foreground color.
        </p>
      </PreviewSection>

      {/* Muted text */}
      <PreviewSection label="Muted Text">
        <p className="text-muted-foreground">
          This is secondary/muted text for descriptions and labels.
        </p>
      </PreviewSection>

      {/* Mixed example */}
      <PreviewSection label="Combined Example">
        <div className="space-y-1">
          <h4 className="text-foreground font-medium">Heading Text</h4>
          <p className="text-muted-foreground text-sm">
            Description text that provides additional context.
          </p>
        </div>
      </PreviewSection>

      {/* Placeholder */}
      <PreviewSection label="Placeholder (muted)">
        <WexInput placeholder="Placeholder uses muted color..." />
      </PreviewSection>
    </div>
  );
}

/**
 * Helper component for preview sections
 */
function PreviewSection({ 
  label, 
  children 
}: { 
  label: string; 
  children: React.ReactNode; 
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

/**
 * Default preview when no token is selected
 */
function DefaultPreview() {
  return (
    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
      Select a semantic token to preview affected components
    </div>
  );
}

/**
 * Main FilteredLivePreview component
 */
export function FilteredLivePreview({ 
  selectedToken, 
  className 
}: FilteredLivePreviewProps) {
  const PreviewComponent = selectedToken 
    ? TOKEN_PREVIEW_MAP[selectedToken] || DefaultPreview
    : DefaultPreview;

  return (
    <WexCard className={cn("h-fit", className)}>
      <WexCard.Header className="pb-2">
        <WexCard.Title className="text-base">Live Preview</WexCard.Title>
        <WexCard.Description>
          {selectedToken 
            ? `Showing components affected by ${selectedToken.replace("--wex-", "")}`
            : "Components update in real-time as you make changes"
          }
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content>
        <PreviewComponent />
      </WexCard.Content>
    </WexCard>
  );
}
