# Typography

iOS-native text system with semantic roles aligned to Apple's Dynamic Type.

## Font families

**SF Pro Text** — Primary interface font
Used for all UI text. Optimized for legibility at interface sizes with adjusted letter spacing and x-height.

**SF Mono** — Monospace font
Used for numeric data and tabular figures. Prevents layout shift when numbers update.

**System fallbacks:**
`SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif`
`SF Mono, SFMono-Regular, ui-monospace, monospace`

Token path: `typography.family.text` · `typography.family.mono`

## Core typography primitives

Design-system internal. Components use semantic roles instead.

### Font sizes

| Token | Value |
|-------|-------|
| `typography.fontSize.11` | 11px |
| `typography.fontSize.12` | 12px |
| `typography.fontSize.13` | 13px |
| `typography.fontSize.15` | 15px |
| `typography.fontSize.17` | 17px |
| `typography.fontSize.20` | 20px |
| `typography.fontSize.22` | 22px |
| `typography.fontSize.28` | 28px |
| `typography.fontSize.34` | 34px |

### Line heights

| Token | Value | Usage |
|-------|-------|-------|
| `typography.lineHeight.120` | 1.2 | Tight — UI elements, headings |
| `typography.lineHeight.130` | 1.3 | Medium — labels, captions |
| `typography.lineHeight.140` | 1.4 | Comfortable — body text |

### Font weights

| Token | Value |
|-------|-------|
| `typography.fontWeight.400` | 400 Regular |
| `typography.fontWeight.500` | 500 Medium |
| `typography.fontWeight.600` | 600 Semibold |
| `typography.fontWeight.700` | 700 Bold |

### Letter spacing

| Token | Value | Usage |
|-------|-------|-------|
| `typography.letterSpacing.0` | 0em | Most UI text |
| `typography.letterSpacing.1` | 0.01em | Labels, captions |
| `typography.letterSpacing.2` | 0.02em | Wide tracking |

## Semantic text roles

Components reference `typography.role.*`, never raw primitives.

### Interface roles (SF Pro Text)

| Role | Size | Weight | Line Height | Tracking | Usage |
|------|------|--------|-------------|----------|-------|
| `largeTitle` | 34px | 600 | 1.2 | 0 | Screen-level titles |
| `title1` | 28px | 600 | 1.2 | 0 | Section headers |
| `title2` | 22px | 600 | 1.2 | 0 | Subsection headers |
| `headline` | 17px | 600 | 1.2 | 0 | Card headers, list titles |
| `body` | 17px | 400 | 1.4 | 0 | Primary reading content |
| `bodyEmphasized` | 17px | 500 | 1.4 | 0 | Emphasized inline text |
| `callout` | 15px | 400 | 1.4 | 0 | Secondary reading content |
| `subhead` | 13px | 400 | 1.4 | 0 | Supporting text |
| `footnote` | 12px | 400 | 1.4 | 0 | Captions, helper text |
| `caption` | 11px | 400 | 1.3 | 0.01em | Tiny labels, timestamps |
| `label` | 13px | 500 | 1.2 | 0.01em | Form labels, tags |
| `button` | 17px | 500 | 1.2 | 0 | Standard button labels |
| `buttonCompact` | 15px | 500 | 1.2 | 0 | Compact button labels |

### Data roles (SF Mono)

| Role | Size | Weight | Line Height | Tracking | Usage |
|------|------|--------|-------------|----------|-------|
| `numericMetric` | 20px | 600 | 1.2 | 0 | Dashboard values, KPIs |
| `numericLabel` | 12px | 500 | 1.3 | 0.01em | Metric units, axis labels |

**Why monospace for numbers:** Tabular figures maintain consistent character width. When values update in real time, layout doesn't shift.

## Role combinations

Common patterns:

**Dashboard card:**
Value: `numericMetric` · Unit/label: `numericLabel` · Card title: `headline`

**List row:**
Title: `callout` · Subtitle: `subhead` · Metadata: `caption`

**Form field:**
Label: `label` · Input text: `body` · Helper: `footnote`

**Status banner:**
Message: `callout` · Detail: `footnote`

**Section:**
Header: `title2` · Subheader: `subhead`

## Decision tree

```
Screen-level title?
  → largeTitle

Section header?
  → title1, title2

Card / list header?
  → headline

Primary reading text?
  → body

Emphasized inline?
  → bodyEmphasized

Secondary content?
  → callout

Supporting / helper text?
  → subhead · footnote

Form label / tag?
  → label

Button?
  → button (standard) · buttonCompact (dense UI)

Tiny label / timestamp?
  → caption

Dashboard number?
  → numericMetric

Axis label / unit?
  → numericLabel
```

## Implementation

### iOS (SwiftUI)

```swift
// Semantic role access
Text("Temperature")
    .font(DS.Typography.Role.headline())

Text("23.4")
    .font(DS.Typography.Role.numericMetric())

Text("°C")
    .font(DS.Typography.Role.numericLabel())
```

### React Native

```typescript
import { tokens } from '@sibach/tokens';

const styles = StyleSheet.create({
  metricValue: {
    ...tokens.typography.role.numericMetric,
    color: tokens.color.text.primary
  },
  metricUnit: {
    ...tokens.typography.role.numericLabel,
    color: tokens.color.text.secondary
  }
});
```

## Common mistakes

**Arbitrary font sizes** — always use a role:
```swift
// Wrong
Text("Value").font(.system(size: 18))

// Correct
Text("Value").font(DS.Typography.Role.body())
```

**Using body for dashboard numbers** — use monospace:
```swift
// Wrong — layout shifts when value updates
Text(sensorValue).font(DS.Typography.Role.body())

// Correct — tabular figures, stable layout
Text(sensorValue).font(DS.Typography.Role.numericMetric())
```

**Mixing font properties manually:**
```swift
// Wrong
Text("Label").font(.system(size: 13)).fontWeight(.medium)

// Correct
Text("Label").font(DS.Typography.Role.label())
```

## Dynamic Type

Roles are designed to work with iOS Dynamic Type. Font sizes scale proportionally based on the user's accessibility settings.

```swift
Text("Content")
    .font(DS.Typography.Role.body())
    // Automatically scales with user preference
```
