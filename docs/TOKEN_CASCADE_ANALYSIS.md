# Token Cascade Analysis

**Generated:** December 21, 2025  
**Purpose:** Document the full cascade impact of WEX design tokens

---

## `--wex-primary` / `--primary` Cascade

### Summary
- **138 total usages** across 36 files
- **17 unique utility patterns**

### Utility Pattern Breakdown

| Pattern | Count | Category |
|---------|-------|----------|
| `text-primary` | 59 | Text accent color |
| `bg-primary` | 24 | Solid backgrounds (buttons, badges) |
| `bg-primary/10` | 12 | Light tinted backgrounds |
| `bg-primary/5` | 10 | Very light tinted backgrounds |
| `border-primary` | 7 | Borders (focus states, inputs) |
| `ring-primary/20` | 6 | Light focus rings |
| `text-primary/80` | 4 | Slightly faded text |
| `hover:bg-primary/90` | 3 | Hover state (slightly darker) |
| `ring-primary/50` | 2 | Medium focus rings |
| `ring-primary` | 2 | Solid focus rings |
| `hover:bg-primary/80` | 2 | Hover state (more faded) |
| `hover:bg-primary` | 2 | Solid hover backgrounds |
| `bg-primary/20` | 2 | Light backgrounds (progress track) |
| `hover:bg-primary/5` | 1 | Very light hover |
| `border-primary/30` | 1 | Light border accent |
| `border-primary/20` | 1 | Very light border accent |
| `bg-primary/8` | 1 | Custom light background |

### Files by Directory

| Directory | File Count | Purpose |
|-----------|------------|---------|
| `src/docs/pages` | 13 | Documentation pages |
| `src/components/ui` | 13 | Base shadcn components |
| `src/docs/components` | 7 | Docs-specific components |
| `src/components/wex` | 2 | WEX wrapper components |
| `src/docs/data` | 1 | Token registry data |

### Categorized Impact

#### 1. Solid Backgrounds (bg-primary)
Components that use the full primary color as background:
- `WexButton` (default intent)
- `WexBadge` (default intent)
- `WexProgress` (indicator bar)
- `WexSwitch` (checked state)
- `WexCheckbox` (checked state)
- `WexRadioGroup` (selected state)
- `WexCalendar` (selected dates)
- `WexSlider` (range fill, thumb border)

#### 2. Tinted Backgrounds (bg-primary/5, bg-primary/10, bg-primary/20)
UI elements with subtle primary tinting:
- Navigation hover states (`NavLink`)
- Active navigation items
- Section highlights (Theme Builder "affected" sections)
- Status badges ("stable" status)
- Icon containers (Getting Started, Architecture pages)
- `WexSkeleton` (loading placeholder)
- `WexProgress` (track background)
- `WexField` (checkbox container checked state)

#### 3. Text Color (text-primary)
Elements using primary as text color:
- Token code display (monospace code blocks)
- Links and interactive text
- Icon accents (Palette, Layers, Package icons)
- Stat numbers
- Active labels
- Link-style buttons

#### 4. Borders (border-primary)
Elements with primary-colored borders:
- `WexCheckbox` border
- `WexRadioGroup` item border
- `WexSlider` thumb border
- Highlight containers (Architecture page)
- Focus states

#### 5. Focus Rings (ring-primary, ring-primary/*)
Focus indicators:
- Selected swatches (Theme Builder)
- Highlighted sections
- Active selections

---

## Implications for Theme Builder

### What We Currently Show
- WexButton (default)
- WexBadge (default)
- WexProgress
- WexSwitch
- All focusable elements

### What We're Missing
- **Text elements** (59 usages of `text-primary`)
- **Tinted backgrounds** (25+ usages of `bg-primary/*`)
- **Navigation states** (hover/active in sidebar)
- **Icon accents** (decorative icons using `text-primary`)
- **Link styling** (underlined links)
- **Skeleton loaders** (`bg-primary/10`)

### Recommended Display Categories

1. **Components** - WexButton, WexBadge, WexProgress, WexSwitch, WexCheckbox, WexRadioGroup, WexSlider, WexCalendar
2. **Text Accents** - Links, code blocks, labels (59 instances)
3. **Backgrounds** - Tinted sections, hover states, highlights (25+ instances)
4. **Borders & Focus** - Input focus, selection rings (15+ instances)

---

## Other Token Cascades (TODO)

Similar analysis needed for:
- `--wex-destructive` → destructive utilities
- `--wex-success` → success utilities
- `--wex-warning` → warning utilities
- `--wex-info` → info utilities
- `--wex-muted` → muted backgrounds/text

