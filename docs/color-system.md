# Color System

Hue-based core palettes with semantic role mappings for dark-first UI.

## Core palettes

Seven hue families, each with a 50-900 scale calibrated for dark mode. Complete hex values for all shades are available in the source JSON.

### Neutral

Foundation for UI structure and text hierarchy. Scale logic: 50-200 are foreground (text, icons), 300-500 are supporting elements, 600-900 are backgrounds.

| Shade | Hex | Primary Usage |
|-------|-----|---------------|
| 50 | #F8FAFC | Metric emphasis (brightest) |
| 100 | #F2F4F7 | Primary text |
| 200 | #E4E7EC | Icons, secondary elements |
| 300 | #CBD5E1 | Secondary text |
| 400 | #94A3B8 | Tertiary icons |
| 500 | #64748B | Tertiary text, metadata |
| 600 | #475569 | Disabled states |
| 700 | #2C2C2E | Card surfaces |
| 800 | #16181D | Elevated surfaces |
| 900 | #0A0B0D | Canvas background (darkest) |

### Blue (Primary Tint)

Interactive elements and brand color.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #007AFF | Primary actions, tint color |
| 600 | #0068D9 | Pressed state |

### Cyan

Data emphasis and informational states.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #00F2FF | Info status, data series |
| 900 | #00858C | Info surface background |

### Green

Success states and positive metrics.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #00F5A0 | Success foreground |
| 700 | #00AA6F | Success border |
| 900 | #006644 | Success surface |

### Amber

Warning states and caution indicators.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #FF9F0A | Warning foreground |
| 700 | #B26F07 | Warning border |
| 900 | #664004 | Warning surface |

### Red

Error states and destructive actions.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #FF453A | Error foreground, destructive actions |
| 700 | #B23029 | Error border |
| 900 | #661C17 | Error surface |

### Purple

Secondary accent and premium features.

| Shade | Hex | Usage |
|-------|-----|-------|
| 500 | #7C3AED | Accent color, premium indicators |

### Alpha layers

Transparent overlays for dark UI layering.

**White alpha:**  
`5`: rgba(255,255,255,0.05) · `10`: rgba(255,255,255,0.1) · `15`: rgba(255,255,255,0.15) · `20`: rgba(255,255,255,0.2) · `30`: rgba(255,255,255,0.3)
# Color System

Hue-based core palettes with semantic role mappings for dark-first IoT UI.

## Core palettes

Seven hue families calibrated for dark-first display. All values in `tokens/core/color.json`.

### Neutral

Foundation for backgrounds, text, and UI structure.

| Token | Value | Role |
|-------|-------|------|
| `neutral.0` | #FFFFFF | Primary text |
| `neutral.50` | #F5F7FA | — |
| `neutral.100` | #E8ECF2 | Secondary elements |
| `neutral.200` | #D0D7E2 | Secondary text |
| `neutral.300` | #AAB4C3 | — |
| `neutral.400` | #7C8798 | Tertiary text, icons |
| `neutral.500` | #5C6675 | Disabled states |
| `neutral.600` | #434C59 | Overlay surfaces |
| `neutral.700` | #2E3640 | Elevated surfaces |
| `neutral.800` | #1C222A | Card surfaces |
| `neutral.900` | #0F1318 | Canvas background |

Scale logic: 0–200 for foreground (text, icons), 600–900 for backgrounds.

### Blue — Primary interactive

| Token | Value | Usage |
|-------|-------|-------|
| `blue.500` | #007AFF | Primary actions, focus ring |
| `blue.600` | #005FCC | Pressed state |
| `blue.700` | #004799 | — |

### Green — Success

| Token | Value | Usage |
|-------|-------|-------|
| `green.100` | #D1FADF | — |
| `green.400` | #32D583 | — |
| `green.500` | #34C759 | Success foreground |
| `green.600` | #28A745 | — |
| `green.700` | #1A7A32 | Success border |
| `green.800` | #0F5221 | — |
| `green.900` | #072D12 | Success surface |

### Amber — Warning

| Token | Value | Usage |
|-------|-------|-------|
| `amber.500` | #FF9F0A | Warning foreground |
| `amber.600` | #CC7F08 | — |
| `amber.700` | #995F06 | Warning border |
| `amber.800` | #664004 | — |
| `amber.900` | #332002 | Warning surface |

### Red — Error / Destructive

| Token | Value | Usage |
|-------|-------|-------|
| `red.500` | #FF453A | Error fg, destructive actions |
| `red.600` | #D92D20 | Pressed destructive |
| `red.700` | #A32218 | Error border |
| `red.800` | #6E1710 | — |
| `red.900` | #390C08 | Error surface |

### Cyan — Data emphasis

| Token | Value | Usage |
|-------|-------|-------|
| `cyan.400` | #22D3EE | — |
| `cyan.500` | #00F2FF | Data series 2 |
| `cyan.600` | #0EA5B7 | — |

### Purple — Accent

| Token | Value | Usage |
|-------|-------|-------|
| `purple.500` | #7C3AED | Accent, premium features |
| `purple.600` | #5B21B6 | — |

### Alpha layers

Transparent overlays for dark UI layering.

| Token | Value |
|-------|-------|
| `alpha.white.5` | #FFFFFF0D |
| `alpha.white.10` | #FFFFFF1A |
| `alpha.white.20` | #FFFFFF33 |
| `alpha.white.40` | #FFFFFF66 |
| `alpha.white.60` | #FFFFFF99 |
| `alpha.black.40` | #00000066 |
| `alpha.black.60` | #00000099 |

Alpha values adapt to any surface without per-context color definitions.

## Semantic color roles

Components always consume semantic tokens. Never use core tokens directly.

### Background

| Token | Value | Usage |
|-------|-------|-------|
| `color.bg.canvas` | #0F1318 | Screen background |
| `color.bg.surface.base` | #1C222A | Cards, containers |
| `color.bg.surface.grouped` | #2E3640 | Grouped lists |
| `color.bg.surface.elevated` | #2E3640 | Floating elements |
| `color.bg.surface.overlay` | #434C59 | Tooltips, overlays |
| `color.bg.surface.modal` | #1C222A | Modal sheets |

Elevation is communicated through highlights and shadows, not by lightening the surface color.

### Text hierarchy

| Token | Value | Usage |
|-------|-------|-------|
| `color.text.primary` | #FFFFFF | Headlines, main content |
| `color.text.secondary` | #D0D7E2 | Body text, descriptions |
| `color.text.tertiary` | #7C8798 | Metadata, timestamps |
| `color.text.disabled` | #5C6675 | Unavailable states |
| `color.text.inverse` | #000000 | Text on light surfaces |

**Decision tree:**
```
Main content / headlines?  → text.primary
Body copy / descriptions?  → text.secondary
Metadata / timestamps?     → text.tertiary
Disabled / unavailable?    → text.disabled
On light surface?          → text.inverse
```

### Icon colors

Icon colors mirror text hierarchy: `color.icon.{primary|secondary|tertiary|disabled|inverse}`

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `color.border.subtle` | #FFFFFF0D | Hairline dividers |
| `color.border.default` | #FFFFFF1A | Standard borders |
| `color.border.strong` | #FFFFFF33 | Emphasized borders |
| `color.border.focus` | #007AFF | Focus indicator |
| `color.border.disabled` | #FFFFFF0D | Disabled borders |

### Interactive controls

| Token | Background | Text | Pressed |
|-------|------------|------|---------|
| `interactive.primary` | #007AFF | inverse | #005FCC |
| `interactive.secondary` | #FFFFFF0D | primary | #FFFFFF1A |
| `interactive.destructive` | #FF453A | primary | #D92D20 |

Full paths: `color.interactive.{primary|secondary|destructive}.{default|pressed|disabled|text}`

No hover states — iOS uses pressed states for tactile feedback.

### Status system

Each status provides three tokens: foreground, surface, border. Use all three together.

| Status | fg | bg (surface) | border |
|--------|----|----|--------|
| `success` | #34C759 | #072D12 | #1A7A32 |
| `warning` | #FF9F0A | #332002 | #995F06 |
| `error` | #FF453A | #390C08 | #A32218 |

Full paths: `color.status.{success|warning|error}.{fg|bg|border}`

**Usage:**
```swift
HStack(spacing: DS.Space.Cluster.sm) {
  Image(systemName: "exclamationmark.circle.fill")
    .foregroundColor(DS.Color.Status.error.fg)
  Text("Connection lost")
    .font(DS.Typography.Role.callout())
    .foregroundColor(DS.Color.Status.error.fg)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Status.error.bg)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(DS.Color.Status.error.border, lineWidth: 1)
)
```

**Don't use status colors for data visualization** — use series colors instead.

### Focus & overlay

`color.focus.ring` → #007AFF — consistent focus indicator for accessibility

`color.overlay.scrim` → #00000099 — modal backdrop

### Data visualization

Four series colors for charts. No semantic meaning — don't encode "good/bad" with these.

| Token | Value |
|-------|-------|
| `color.data.series.1` | #007AFF |
| `color.data.series.2` | #00F2FF |
| `color.data.series.3` | #00F5A0 |
| `color.data.series.4` | #FF9F0A |

**Chart principle:** A sensor line doesn't change color based on whether the reading is in range or not. The axis and thresholds communicate that. Use fixed series colors.

## Implementation guidelines

### Always use semantic tokens

```swift
// Correct
.foregroundColor(DS.Color.Text.secondary)
.background(DS.Color.Status.success.bg)

// Wrong
.foregroundColor(Color(hex: "#D0D7E2"))
.background(DS.Color.Base.Green.n100)
```

### Status color usage

**Use for:** alerts, banners, badges, validation messages, system feedback.

**Don't use for:** data visualization, decorative accents, arbitrary emphasis.

### Common mistake — status in charts

```swift
// Wrong — encodes "good" vs "bad" with semantic colors
let lineColor = isInRange ? DS.Color.Status.success.fg : DS.Color.Status.error.fg

// Correct — neutral series color, threshold line shows range
let lineColor = DS.Color.Data.series1
```
