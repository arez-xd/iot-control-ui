# Spacing

4pt grid system for consistent spatial relationships in iOS interfaces.

## The 4pt grid

All spacing values are multiples of 4px. This aligns with iOS point system (1pt = 1px at 1x) and provides sufficient granularity without micro-adjustments.

### Core scale

| Token | Value | Token | Value | Token | Value |
|-------|-------|-------|-------|-------|-------|
| `0` | 0px | `1` | 4px | `2` | 8px |
| `3` | 12px | `4` | 16px | `5` | 20px |
| `6` | 24px | `7` | 32px | `8` | 40px |
| `9` | 48px | `10` | 64px | `11` | 80px |

**These are design-system internal.** Components use semantic spacing roles instead.

### Why 4pt, not 8pt?

We tested 8pt grid initially. Too coarse — couldn't express subtle differences between "tight" and "comfortable" padding.

**8pt problems:**
* Card padding: 16px felt cramped, 24px too spacious
* Button to field gap: needed 12px, forced to choose 8px or 16px
* Icon to label: wanted 8px, compromised readability

**4pt solution:**
* Enough granularity: 8, 12, 16, 20, 24 all available
* iOS-native: aligns with Apple's point system
* Clean ratios: 8:16, 12:24, 16:32 = 1:2

### Natural ratios

The 4pt scale produces intuitive proportions:

```
8px : 16px = 1:2    (compact → comfortable)
12px : 24px = 1:2   (card → screen margin)
16px : 32px = 1:2   (cell → section gap)
20px : 40px = 1:2   (card → full bleed)
```

These ratios feel harmonious without calculation.

## Semantic spacing roles

Components reference these, not core tokens.

### Insets (container padding)

| Role | Value | Usage |
|------|-------|-------|
| `screen` | 24px | Full-screen horizontal margins |
| `sheet` | 24px | Modal/sheet edge padding |
| `card` | 20px | Card interior padding |
| `cell` | 16px | List row padding |

**When to use:**

`screen`: Top-level container, respects safe area  
`sheet`: Bottom sheets, modals, floating panels  
`card`: Content cards, grouped containers  
`cell`: List items, table rows

### Stack (vertical rhythm)

| Role | Value | Usage |
|------|-------|-------|
| `xs` | 8px | Tightly related elements |
| `sm` | 12px | Related groups |
| `md` | 16px | Distinct sections |
| `lg` | 20px | Major boundaries |

**Real usage:**

`xs`: Label → value, icon → text  
`sm`: Form fields in a group  
`md`: Card sections, list groups  
`lg`: Major content boundaries

### List

| Role | Value | Usage |
|------|-------|-------|
| `rowGap` | 12px | Between list items |
| `sectionGap` | 24px | Between list sections |

### Control

| Role | Value | Usage |
|------|-------|-------|
| `paddingX` | 16px | Button/field horizontal padding |
| `paddingY` | 12px | Button/field vertical padding |
| `gap` | 8px | Icon to label spacing |

### Chip

| Role | Value | Usage |
|------|-------|-------|
| `paddingX` | 16px | Chip horizontal padding |
| `paddingY` | 8px | Chip vertical padding |
| `gap` | 8px | Icon to label in chip |

### Icon

| Role | Value | Usage |
|------|-------|-------|
| `sm` | 16px | Small icon frame |
| `md` | 20px | Standard icon frame |
| `lg` | 24px | Large icon frame |

Icon frames provide consistent tap targets even when icon glyph is smaller.

## Layout patterns

### Screen layout

```swift
VStack(spacing: 0) {
  // Navigation bar
  
  ScrollView {
    VStack(alignment: .leading, spacing: DS.Space.Stack.lg) {
      // Section 1
      VStack(alignment: .leading, spacing: DS.Space.Stack.md) {
        Text("Section Header")
          .font(DS.Typography.Role.title2())
        
        // Cards
        VStack(spacing: DS.Space.Stack.sm) {
          CardView()
          CardView()
        }
      }
      
      // Section 2
      VStack(alignment: .leading, spacing: DS.Space.Stack.md) {
        Text("Another Section")
          .font(DS.Typography.Role.title2())
        
        CardView()
      }
    }
    .padding(.horizontal, DS.Space.Inset.screen)
    .padding(.vertical, DS.Space.Stack.lg)
  }
}
```

**Hierarchy:**
* Between sections: `stack.lg` (20px)
* Within section: `stack.md` (16px)
* Between cards: `stack.sm` (12px)
* Screen edges: `inset.screen` (24px)

### Card layout

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.sm) {
  // Header
  Text("Transaction Details")
    .font(DS.Typography.Role.headline())
  
  // Content
  VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
    HStack {
      Text("Amount")
        .foregroundColor(DS.Color.Text.secondary)
      Spacer()
      Text("$123.45")
        .foregroundColor(DS.Color.Text.primary)
    }
    
    HStack {
      Text("Date")
        .foregroundColor(DS.Color.Text.secondary)
      Spacer()
      Text("Jan 15, 2024")
        .foregroundColor(DS.Color.Text.primary)
    }
  }
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Background.surface)
.cornerRadius(DS.Radius.card)
```

**Hierarchy:**
* Card edge to content: `inset.card` (20px)
* Header to content: `stack.sm` (12px)
* Between rows: `stack.xs` (8px)

### List layout

```swift
VStack(spacing: DS.Space.List.rowGap) {
  ForEach(items) { item in
    HStack(spacing: DS.Space.Control.gap) {
      Image(systemName: item.icon)
        .frame(width: DS.Space.Icon.md, height: DS.Space.Icon.md)
      
      VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
        Text(item.title)
          .font(DS.Typography.Role.callout())
        Text(item.subtitle)
          .font(DS.Typography.Role.footnote())
          .foregroundColor(DS.Color.Text.tertiary)
      }
      
      Spacer()
      
      Image(systemName: "chevron.right")
        .foregroundColor(DS.Color.Icon.tertiary)
    }
    .padding(DS.Space.Inset.cell)
    .background(DS.Color.Background.surface)
    .cornerRadius(DS.Radius.card)
  }
}
```

**Hierarchy:**
* Between rows: `list.rowGap` (12px)
* Cell edge to content: `inset.cell` (16px)
* Icon to text: `control.gap` (8px)
* Title to subtitle: `stack.xs` (8px)

### Button layout

```swift
Button {
  // action
} label: {
  HStack(spacing: DS.Space.Control.gap) {
    Image(systemName: "plus")
    Text("Add Transaction")
  }
  .padding(.horizontal, DS.Space.Control.paddingX)
  .padding(.vertical, DS.Space.Control.paddingY)
  .frame(minHeight: DS.Size.Control.minHeight)
}
.background(DS.Color.Control.Primary.background)
.cornerRadius(DS.Radius.control)
```

**Structure:**
* Icon to label: `control.gap` (8px)
* Horizontal padding: `control.paddingX` (16px)
* Vertical padding: `control.paddingY` (12px)
* Minimum height: 44px (accessibility)

## Decision tree: which spacing?

```
Container padding?
  Full-screen → inset.screen (24px)
  Modal/sheet → inset.sheet (24px)
  Card interior → inset.card (20px)
  List row → inset.cell (16px)

Vertical spacing between elements?
  Tightly related (label→value) → stack.xs (8px)
  Related group (form fields) → stack.sm (12px)
  Distinct sections → stack.md (16px)
  Major boundaries → stack.lg (20px)

List spacing?
  Between items → list.rowGap (12px)
  Between sections → list.sectionGap (24px)

Button/field?
  Horizontal padding → control.paddingX (16px)
  Vertical padding → control.paddingY (12px)
  Icon to label → control.gap (8px)

Icon frame?
  Small → icon.sm (16px)
  Standard → icon.md (20px)
  Large → icon.lg (24px)
```

## Common patterns

### Form spacing

```swift
VStack(spacing: DS.Space.Stack.sm) {
  // Field 1
  VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
    Text("Email")
      .font(DS.Typography.Role.subheadline())
    TextField("email@example.com", text: $email)
  }
  
  // Field 2
  VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
    Text("Password")
      .font(DS.Typography.Role.subheadline())
    SecureField("••••••••", text: $password)
  }
}
```

* Between fields: `stack.sm` (12px)
* Label to input: `stack.xs` (8px)

### Status banner spacing

```swift
HStack(spacing: DS.Space.Control.gap) {
  Image(systemName: "checkmark.circle.fill")
  Text("Payment successful")
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Status.Success.surface)
```

* Icon to text: `control.gap` (8px)
* Banner padding: `inset.card` (20px)

### Metric card spacing

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  Text("$12.4M")
    .font(DS.Typography.Role.numericMetric())
  Text("REVENUE")
    .font(DS.Typography.Role.caption1())
}
.padding(DS.Space.Inset.card)
```

* Value to label: `stack.xs` (8px)
* Card padding: `inset.card` (20px)

## Common mistakes

### Using arbitrary values

```swift
// Wrong
VStack(spacing: 14)
.padding(18)

// Correct
VStack(spacing: DS.Space.Stack.sm)
.padding(DS.Space.Inset.card)
```

### Using core tokens

```swift
// Wrong
.padding(DS.Core.Space.s5)

// Correct
.padding(DS.Space.Inset.card)
```

### Inconsistent spacing

```swift
// Wrong - mixing patterns
VStack(spacing: 12) {
  CardView()
    .padding(18)
  CardView()
    .padding(20)
}

// Correct - systematic
VStack(spacing: DS.Space.Stack.sm) {
  CardView()
    .padding(DS.Space.Inset.card)
  CardView()
    .padding(DS.Space.Inset.card)
}
```

### Over-nesting

```swift
// Wrong - unnecessary nesting
VStack(spacing: DS.Space.Stack.md) {
  VStack(spacing: DS.Space.Stack.xs) {
    Text("Title")
  }
}

// Correct - flatten when possible
VStack(spacing: DS.Space.Stack.xs) {
  Text("Title")
}
```

## Composing spacing

Sometimes you need values between semantic tokens. Composition is acceptable:

```swift
// Need 28px (between sm:12 and md:16)
let customSpacing = DS.Space.Stack.sm + DS.Space.Stack.xs
VStack(spacing: customSpacing) {
  // content
}
```

**When to compose:**
* One-off spacing needs
* Experimental layouts
* Complex interactions

**When to add a token:**
* Pattern used 3+ times
* Has semantic meaning
* Represents systematic concern

## React Native implementation

```typescript
import { tokens } from '@sibach/tokens';

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: tokens.space.inset.screen,
    paddingVertical: tokens.space.stack.lg
  },
  card: {
    padding: tokens.space.inset.card,
    marginBottom: tokens.space.stack.sm
  },
  row: {
    flexDirection: 'row',
    gap: tokens.space.control.gap,
    padding: tokens.space.inset.cell
  }
});
```

## Why semantic spacing

**Before semantic roles:**
Engineers asked "should this be 16px or 20px?" for every padding decision.

**With semantic roles:**
Engineers ask "is this card padding or cell padding?" System provides appropriate value.

**Example: changing card padding**

Without roles:
```swift
// Change in 23 files
.padding(20) → .padding(24)
```

With roles:
```json
// Change once
"inset.card": "20px" → "24px"
```

All cards update automatically.

## Performance notes

**iOS:** Spacing constants compile to CGFloat. Zero runtime cost.

**React Native:** Numeric values, no string parsing. Direct layout engine usage.

See [Architecture](architecture.md) for implementation details and [Components](components.md) for usage patterns.
