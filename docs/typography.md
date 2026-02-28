# Typography

iOS-native text system with semantic roles aligned to Apple's Dynamic Type.

## Font families

**SF Pro Text** — Primary interface font  
Used for all UI text below 20pt. Optimized for legibility at small sizes with adjusted letter spacing and x-height.

**SF Mono** — Monospace font  
Used for numeric data, code, and tabular figures. Prevents layout shift when numbers update.

**System fallbacks:**  
`SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif`  
`SF Mono, SFMono-Regular, ui-monospace, monospace`

**Why SF Pro Text, not Display?**  
SF Pro Display is optimized for 20pt+. At interface sizes (11-17px), Text provides better legibility.

## Core typography primitives

These are design-system internal. Components use semantic roles instead.

### Font sizes

`xs`: 11px · `sm`: 13px · `md`: 15px · `lg`: 17px · `xl`: 20px · `2xl`: 24px · `3xl`: 28px · `4xl`: 34px

### Line heights

`ui`: 1.2 (tight for UI elements)  
`body`: 1.4 (comfortable for reading)  
`relaxed`: 1.6 (spacious for long-form)

### Font weights

`regular`: 400 · `medium`: 500 · `semibold`: 600 · `bold`: 700

### Letter spacing

`tight`: -0.01em (large display text)  
`normal`: 0 (most UI text)  
`wide`: 0.02em (small caps, labels)

## Semantic text roles

iOS-aligned semantic roles. Components reference these, not raw font properties.

| Role | Size | Weight | Line Height | Spacing | Usage |
|------|------|--------|-------------|---------|-------|
| `largeTitle` | 34px | Bold (700) | 1.2 | -0.01em | Screen titles, hero text |
| `title1` | 28px | Semibold (600) | 1.2 | -0.01em | Section headers |
| `title2` | 24px | Semibold (600) | 1.2 | -0.01em | Subsection headers |
| `title3` | 20px | Semibold (600) | 1.2 | -0.01em | Card headers |
| `headline` | 17px | Semibold (600) | 1.2 | 0 | List headers, emphasis |
| `body` | 15px | Regular (400) | 1.4 | 0 | Primary reading content |
| `callout` | 15px | Medium (500) | 1.2 | 0 | Emphasized body text |
| `subheadline` | 13px | Regular (400) | 1.2 | 0 | Supporting text |
| `footnote` | 13px | Medium (500) | 1.2 | 0 | Captions, secondary info |
| `caption1` | 11px | Medium (500) | 1.2 | 0.02em | Tiny labels, overlines |
| `caption2` | 11px | Regular (400) | 1.2 | 0.02em | Metadata, timestamps |
| `labelPrimary` | 13px | Medium (500) | 1.2 | 0.02em | Button labels |
| `labelSecondary` | 11px | Medium (500) | 1.2 | 0.02em | Small button labels |

All roles use **SF Pro Text**.

### Data-specific roles

| Role | Font | Size | Weight | Spacing | Usage |
|------|------|------|--------|---------|-------|
| `numericMetric` | SF Mono | 34px | Semibold (600) | 0.02em | Dashboard KPIs, large numbers |
| `numericValue` | SF Mono | 20px | Medium (500) | 0.02em | Inline data values |

**Why monospace for numbers?**  
Tabular figures maintain consistent width. When values update, layout doesn't shift.

## Typography + Color

Typography roles define structure. Color tokens define hierarchy.

```swift
// Transaction amount
Text("$1,234.56")
  .font(DS.Typography.Role.callout())
  .foregroundColor(DS.Color.Text.primary)

// Transaction date
Text("Jan 15, 2024")
  .font(DS.Typography.Role.footnote())
  .foregroundColor(DS.Color.Text.tertiary)
```

This separation allows visual refinements at the token layer without touching type definitions.

## iOS implementation

Generated as typed functions:

```swift
public enum DS {
  public enum Typography {
    public enum Role {
      public static func largeTitle() -> Font {
        Font.custom("SF Pro Text", size: 34)
          .weight(.bold)
          .tracking(-0.34)
      }
      
      public static func title1() -> Font {
        Font.custom("SF Pro Text", size: 28)
          .weight(.semibold)
          .tracking(-0.28)
      }
      
      public static func headline() -> Font {
        Font.custom("SF Pro Text", size: 17)
          .weight(.semibold)
      }
      
      public static func body() -> Font {
        Font.custom("SF Pro Text", size: 15)
          .weight(.regular)
      }
      
      public static func footnote() -> Font {
        Font.custom("SF Pro Text", size: 13)
          .weight(.medium)
      }
      
      public static func numericMetric() -> Font {
        Font.custom("SF Mono", size: 34)
          .weight(.semibold)
          .tracking(0.68)
      }
    }
  }
}
```

**Usage:**

```swift
// SwiftUI
Text("Balance")
  .font(DS.Typography.Role.headline())

// UIKit
label.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
```

## React Native implementation

```typescript
export const typography = {
  role: {
    largeTitle: {
      fontFamily: 'SF Pro Text',
      fontSize: 34,
      fontWeight: '700',
      lineHeight: 40.8,
      letterSpacing: -0.34
    },
    headline: {
      fontFamily: 'SF Pro Text',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 20.4,
      letterSpacing: 0
    },
    body: {
      fontFamily: 'SF Pro Text',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 21,
      letterSpacing: 0
    },
    footnote: {
      fontFamily: 'SF Pro Text',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 15.6,
      letterSpacing: 0
    }
  }
} as const;
```

**Usage:**

```typescript
import { typography } from '@sibach/tokens';

const styles = StyleSheet.create({
  title: {
    ...typography.role.headline,
    color: tokens.color.text.primary
  },
  body: {
    ...typography.role.body,
    color: tokens.color.text.secondary
  }
});
```

## Usage guidelines

### Text hierarchy in practice

**Card with metadata:**

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  // Title
  Text("Transaction Details")
    .font(DS.Typography.Role.headline())
    .foregroundColor(DS.Color.Text.primary)
  
  // Description
  Text("Purchase at Coffee Shop")
    .font(DS.Typography.Role.body())
    .foregroundColor(DS.Color.Text.secondary)
  
  // Timestamp
  Text("2 hours ago")
    .font(DS.Typography.Role.footnote())
    .foregroundColor(DS.Color.Text.tertiary)
}
```

**Dashboard metric:**

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  // Metric value
  Text("$12.4M")
    .font(DS.Typography.Role.numericMetric())
    .foregroundColor(DS.Color.Text.metric)
  
  // Metric label
  Text("REVENUE")
    .font(DS.Typography.Role.caption1())
    .foregroundColor(DS.Color.Text.metricUnit)
}
```

### Decision tree: which role?

```
Screen-level heading?
  → largeTitle

Major section header?
  → title1, title2, title3

List or card header?
  → headline

Primary reading text?
  → body

Emphasized text inline?
  → callout

Supporting / help text?
  → subheadline

Small labels, captions?
  → footnote, caption1, caption2

Button text?
  → labelPrimary, labelSecondary

Large dashboard numbers?
  → numericMetric

Inline data values?
  → numericValue
```

### Role combinations

Common patterns in the product:

**List row:**  
Title: `headline` · Subtitle: `subheadline` · Metadata: `caption2`

**Card:**  
Header: `title3` · Body: `body` · Footer: `footnote`

**Form field:**  
Label: `subheadline` · Input: `body` · Helper: `caption1`

**Status banner:**  
Message: `callout` · Detail: `footnote`

## Common mistakes

### Using arbitrary font sizes

```swift
// Wrong
Text("Title")
  .font(.system(size: 18))

// Correct
Text("Title")
  .font(DS.Typography.Role.headline())
```

### Mixing font properties manually

```swift
// Wrong
Text("Title")
  .font(.system(size: 17))
  .fontWeight(.semibold)

// Correct
Text("Title")
  .font(DS.Typography.Role.headline())
```

### Not using monospace for numbers

```swift
// Wrong - layout shifts when value updates
Text(balance)
  .font(DS.Typography.Role.largeTitle())

// Correct - stable layout with tabular figures
Text(balance)
  .font(DS.Typography.Role.numericMetric())
```

## Why semantic roles

**Before roles:**  
Engineers asked "should this be 15px or 17px?" for every text element. Typography decisions happened during implementation.

**With roles:**  
Engineers ask "what is this text's purpose?" System provides appropriate treatment automatically.

**Example: changing body text size**

Without roles:
```swift
// Change in 47 files
.font(.system(size: 15)) → .font(.system(size: 16))
```

With roles:
```json
// Change once
"body.fontSize": "15px" → "16px"
```

All body text updates automatically.

## Dynamic Type support

Roles are designed to work with iOS Dynamic Type for accessibility:

```swift
// System automatically scales with user preference
Text("Content")
  .font(DS.Typography.Role.body())
```

Font sizes scale proportionally based on user's accessibility settings. Line heights and spacing adjust accordingly.

## Line length guidelines

For optimal readability:

**Body text:** 50-75 characters per line  
**Subheadline:** 40-60 characters per line  
**Caption:** 30-50 characters per line

These are guidelines, not strict rules. Dense data tables may exceed these limits.

## Performance notes

**iOS:** Typography roles compile to constants. Zero runtime cost.

**React Native:** Style objects are static. Computed once, reused everywhere.

See [Architecture](architecture.md) for platform implementation details and [Components](components.md) for usage patterns.
