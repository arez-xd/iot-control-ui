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

**Black alpha:**  
`10`: rgba(0,0,0,0.1) · `20`: rgba(0,0,0,0.2) · `30`: rgba(0,0,0,0.3) · `40`: rgba(0,0,0,0.4) · `60`: rgba(0,0,0,0.6)

Alpha values work over any background without per-context color definitions.

## Semantic color roles

Semantic tokens map core hues to UI purposes. Components consume these, never core tokens directly.

### Text hierarchy

| Role | Hex | Core Reference | Usage |
|------|-----|----------------|-------|
| `primary` | #F2F4F7 | neutral.100 | Headlines, main content |
| `secondary` | #CBD5E1 | neutral.300 | Body text, descriptions |
| `tertiary` | #64748B | neutral.500 | Metadata, timestamps |
| `disabled` | #475569 | neutral.600 | Unavailable states |
| `tint` | #007AFF | blue.500 | Links, interactive text |
| `destructive` | #FF453A | red.500 | Delete, remove actions |
| `success` | #00F5A0 | green.500 | Success messaging |
| `warning` | #FF9F0A | amber.500 | Warning messaging |
| `info` | #00F2FF | cyan.500 | Info messaging |
| `metric` | #F8FAFC | neutral.50 | Large dashboard numbers |
| `metricUnit` | #007AFF | blue.500 | Metric labels |

**Real usage:**

Transaction list: Amount uses `text.primary`, timestamp uses `text.tertiary`  
Settings row: Label uses `text.primary`, subtext uses `text.secondary`

### Icon colors

| Role | Hex | Usage |
|------|-----|-------|
| `primary` | #E4E7EC | Primary icons |
| `secondary` | #94A3B8 | Supporting icons |
| `tertiary` | #475569 | Decorative icons |
| `tint` | #007AFF | Interactive icons |
| `destructive` | #FF453A | Delete icons |

### Background

All surfaces use the same base colors. Elevation is communicated through highlights and shadows, not color shifts.

`canvas`: #0A0B0D (neutral.900) — Screen background  
`surface`: #16181D (neutral.800) — Card background  
`grouped`: #16181D (neutral.800) — Grouped list background  
`elevated`: #16181D (neutral.800) — Modal/sheet background

### Separators

`default`: rgba(255,255,255,0.1) (alpha.white.10) — Standard dividers  
`strong`: rgba(255,255,255,0.15) (alpha.white.15) — Emphasized dividers

### Control states

| Type | Background | Pressed | Text | Border |
|------|------------|---------|------|--------|
| **Primary** (high emphasis) | #007AFF | #0068D9 | #FFFFFF | — |
| **Secondary** (medium emphasis) | rgba(255,255,255,0.05) | rgba(255,255,255,0.1) | #F2F4F7 | rgba(255,255,255,0.1) |
| **Destructive** (irreversible actions) | #FF453A | #D93A31 | #FFFFFF | — |
| **Disabled** | rgba(255,255,255,0.05) | — | #475569 | — |

iOS pattern: No hover states. Pressed state provides tactile feedback.

### Form fields

`bg`: rgba(255,255,255,0.05) — Field background  
`border`: rgba(255,255,255,0.1) — Default border  
`borderFocused`: #007AFF — Focus indicator  
`text`: #F2F4F7 — Input text  
`placeholder`: #64748B — Placeholder text

### Status system (3-part)

Each status has foreground, surface, and border for consistent treatment across banners, badges, and alerts.

| Status | Foreground | Surface | Border |
|--------|------------|---------|--------|
| **Success** | #00F5A0 (green.500) | #006644 (green.900) | #00AA6F (green.700) |
| **Warning** | #FF9F0A (amber.500) | #664004 (amber.900) | #B26F07 (amber.700) |
| **Error** | #FF453A (red.500) | #661C17 (red.900) | #B23029 (red.700) |
| **Info** | #00F2FF (cyan.500) | #00858C (cyan.900) | #00A9B2 (cyan.700) |

**Usage example:**

```swift
// Error banner
HStack {
  Image(systemName: "exclamationmark.circle.fill")
    .foregroundColor(DS.Color.Status.Error.foreground)
  Text("Payment failed")
    .foregroundColor(DS.Color.Status.Error.foreground)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Status.Error.surface)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(DS.Color.Status.Error.border, lineWidth: 1)
)
```

## Data visualization

Data colors are structurally separate from status colors to avoid semantic encoding.

### Series colors

Eight colors optimized for perceptual distinction in dark UI, colorblind-safe combinations, and no inherent meaning.

| Series | Hex | Hue |
|--------|-----|-----|
| 1 | #007AFF | Blue |
| 2 | #00F2FF | Cyan |
| 3 | #00F5A0 | Green |
| 4 | #FF9F0A | Amber |
| 5 | #8B5CF6 | Purple |
| 6 | #5CBFD6 | Sky |
| 7 | #94A3B8 | Gray |
| 8 | #FF453A | Red |

**Critical principle:** Don't encode "good" or "bad" in chart colors. Use `data.series.3` (happens to be green) without semantic meaning. A revenue line doesn't change color based on whether it's up or down — the axis communicates that.

### Chart foundations

`grid`: rgba(255,255,255,0.1) — Subtle gridlines  
`axis`: #64748B (neutral.500) — Axis labels, readable but not prominent

**Design rules:**

* Grid lines visible but don't compete with data
* Axis labels use `text.secondary` for hierarchy
* Data points use full-saturation series colors
* Overlays (tooltips) use `elevation.floating` for depth

### Metric display

Large numbers in dashboards use specialized treatment:

```swift
Text("$1.2M")
  .font(DS.Typography.Role.numericMetric())
  .foregroundColor(DS.Color.Text.metric)

Text("Revenue")
  .font(DS.Typography.Role.caption1())
  .foregroundColor(DS.Color.Text.metricUnit)
```

`numericMetric`: SF Mono 34px semibold (tabular figures prevent layout shift)  
`text.metric`: Neutral.50 (brightest white for emphasis)  
`text.metricUnit`: Blue.500 (tint color for label)

This creates hierarchy: the number is primary, the label is supporting context.

## Implementation guidelines

### Use semantic tokens exclusively

```swift
// Correct
.foregroundColor(DS.Color.Text.secondary)
.background(DS.Color.Status.Success.surface)

// Wrong
.foregroundColor(DS.Core.Color.Neutral.n300)
.background(Color(hex: "#006644"))
```

### Text hierarchy decision tree

```
Main content / headlines?
  → text.primary

Body copy / descriptions?
  → text.secondary

Metadata / timestamps?
  → text.tertiary

Disabled / unavailable?
  → text.disabled

Interactive / link?
  → text.tint

Destructive action?
  → text.destructive
```

### Status color usage

**Use for:**
* Alerts and banners
* Status badges
* Validation messages
* System feedback

**Don't use for:**
* Data visualization (use series colors)
* Decorative accents
* Arbitrary emphasis

### Common mistakes

**Using core tokens directly:**

```swift
// Wrong
.foregroundColor(Color(hex: "#CBD5E1"))

// Correct
.foregroundColor(DS.Color.Text.secondary)
```

**Encoding status in data colors:**

```swift
// Wrong - encodes "good" vs "bad" with colors
let profitColor = profit > 0 ? DS.Color.Status.Success : DS.Color.Status.Error

// Correct - use neutral series color
let profitColor = DS.Color.Data.Series.one
```

## Why this structure

**Hue-based core palettes** allow the same color to serve different purposes without coupling:

```json
// Same hue, different purposes
"control.primary.bg": "{blue.500}",     // Interactive buttons
"data.series.1": "{blue.500}",          // Chart color
"text.tint": "{blue.500}"               // Link text
```

**Semantic separation** enables systematic remapping:

```json
// Default
"status.error.fg": "{red.500}"

// Colorblind mode
"status.error.fg": "{amber.500}"
```

All error states update automatically without component changes.

See [Principles](principles.md) for detailed reasoning and [Components](components.md) for implementation patterns.
