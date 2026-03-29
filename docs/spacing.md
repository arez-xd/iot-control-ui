# Spacing

4pt grid system for consistent spatial relationships in iOS interfaces.

## The 4pt grid

All spacing values are multiples of 4px, aligning with iOS point system.

### Core scale

| Token | Value | Token | Value | Token | Value |
|-------|-------|-------|-------|-------|-------|
| `space.0` | 0px | `space.4` | 4px | `space.8` | 8px |
| `space.12` | 12px | `space.16` | 16px | `space.20` | 20px |
| `space.24` | 24px | `space.32` | 32px | `space.40` | 40px |
| `space.48` | 48px | `space.64` | 64px | `space.80` | 80px |
| `space.96` | 96px | | | | |

Core tokens are design-system internal. Components use semantic roles.

## Semantic spacing roles

### Insets — container padding

| Token | Value | Usage |
|-------|-------|-------|
| `space.inset.xs` | 8px | Compact elements, chips |
| `space.inset.sm` | 12px | Tight containers |
| `space.inset.md` | 16px | Standard cells, list rows |
| `space.inset.lg` | 24px | Screen margins, panels |
| `space.inset.xl` | 32px | Large containers |
| `space.inset.control` | 12px | Button / control padding |
| `space.inset.card` | 16px | Card interior padding |
| `space.inset.panel` | 24px | Panel / sheet interior |

### Stack — vertical rhythm

| Token | Value | Usage |
|-------|-------|-------|
| `space.stack.xs` | 4px | Hairline gap, icon + badge |
| `space.stack.sm` | 8px | Tightly related elements |
| `space.stack.md` | 12px | Related groups |
| `space.stack.lg` | 16px | Distinct sections |
| `space.stack.xl` | 24px | Major content boundaries |
| `space.stack.2xl` | 32px | Screen-level sections |

### Cluster — horizontal gap

| Token | Value | Usage |
|-------|-------|-------|
| `space.cluster.xs` | 4px | Icon + label (compact) |
| `space.cluster.sm` | 8px | Icon + label (standard) |
| `space.cluster.md` | 12px | Tag groups |
| `space.cluster.lg` | 16px | Button groups |

### Section — between content blocks

| Token | Value | Usage |
|-------|-------|-------|
| `space.section.sm` | 24px | Between related sections |
| `space.section.md` | 32px | Between main sections |
| `space.section.lg` | 40px | Between major screen areas |

### Control — button and input internals

| Token | Value | Usage |
|-------|-------|-------|
| `space.control.padding.x` | 16px | Horizontal button padding |
| `space.control.padding.y` | 8px | Vertical button padding |
| `space.control.gap.sm` | 8px | Icon to label (compact) |
| `space.control.gap.md` | 12px | Icon to label (standard) |

### Field — form input internals

| Token | Value | Usage |
|-------|-------|-------|
| `space.field.padding.x` | 12px | Horizontal field padding |
| `space.field.padding.y` | 8px | Vertical field padding |

### List — list item spacing

| Token | Value | Usage |
|-------|-------|-------|
| `space.list.item.gap` | 12px | Between list items |
| `space.list.item.padding.x` | 16px | List item horizontal padding |
| `space.list.item.padding.y` | 12px | List item vertical padding |
| `space.list.section.gap` | 24px | Between list sections |

## Layout patterns

### Screen layout

```swift
VStack(spacing: 0) {
  ScrollView {
    VStack(alignment: .leading, spacing: DS.Space.Section.md) {
      // Section 1
      VStack(alignment: .leading, spacing: DS.Space.Stack.lg) {
        Text("Section Header")
          .font(DS.Typography.Role.title2())

        VStack(spacing: DS.Space.Stack.md) {
          CardView()
          CardView()
        }
      }
    }
    .padding(.horizontal, DS.Space.Inset.lg)
    .padding(.vertical, DS.Space.Stack.xl)
  }
}
```

**Hierarchy:** between sections `section.md` (32px) · within section `stack.lg` (16px) · between cards `stack.md` (12px) · screen edges `inset.lg` (24px)

### Card layout

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.md) {
  Text("Sensor Group A")
    .font(DS.Typography.Role.headline())

  VStack(alignment: .leading, spacing: DS.Space.Stack.sm) {
    HStack {
      Text("Temperature")
        .foregroundColor(DS.Color.Text.secondary)
      Spacer()
      Text("23.4 °C")
        .font(DS.Typography.Role.numericMetric())
    }
    HStack {
      Text("Humidity")
        .foregroundColor(DS.Color.Text.secondary)
      Spacer()
      Text("61%")
        .font(DS.Typography.Role.numericMetric())
    }
  }
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Bg.Surface.base)
.cornerRadius(DS.Radius.card)
```

**Hierarchy:** card edge `inset.card` (16px) · header to rows `stack.md` (12px) · between rows `stack.sm` (8px)

### List layout

```swift
VStack(spacing: DS.Space.List.Item.gap) {
  ForEach(devices) { device in
    HStack(spacing: DS.Space.Cluster.sm) {
      StatusDot(color: device.statusColor)
        .frame(width: DS.Size.Icon.sm, height: DS.Size.Icon.sm)

      VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
        Text(device.name)
          .font(DS.Typography.Role.callout())
        Text(device.location)
          .font(DS.Typography.Role.subhead())
          .foregroundColor(DS.Color.Text.tertiary)
      }

      Spacer()

      Text(device.lastSeen)
        .font(DS.Typography.Role.caption())
        .foregroundColor(DS.Color.Text.tertiary)
    }
    .padding(.horizontal, DS.Space.List.Item.Padding.x)
    .padding(.vertical, DS.Space.List.Item.Padding.y)
  }
}
```

### Control (button) layout

```swift
Button {
  // action
} label: {
  HStack(spacing: DS.Space.Control.Gap.sm) {
    Image(systemName: "plus")
    Text("Add Device")
  }
  .padding(.horizontal, DS.Space.Control.Padding.x)
  .padding(.vertical, DS.Space.Control.Padding.y)
  .frame(minHeight: DS.Size.Control.Height.default)
}
```

## Decision tree

```
Container padding?
  Screen edges              → inset.lg (24px)
  Card interior             → inset.card (16px)
  Panel / sheet             → inset.panel (24px)
  Button / control          → inset.control (12px)
  Compact element / chip    → inset.xs (8px)

Vertical spacing?
  Hairline / icon+badge     → stack.xs (4px)
  Icon to label             → stack.sm (8px)
  Form fields in group      → stack.md (12px)
  Distinct sections         → stack.lg (16px)
  Major boundaries          → stack.xl (24px)
  Screen-level sections     → stack.2xl (32px)

Horizontal gap?
  Icon + label (compact)    → cluster.xs (4px)
  Icon + label (standard)   → cluster.sm (8px)
  Tag groups                → cluster.md (12px)
  Button groups             → cluster.lg (16px)

Between content blocks?
  Related sections          → section.sm (24px)
  Main sections             → section.md (32px)
  Major screen areas        → section.lg (40px)

Button / input internals?
  Padding X                 → control.padding.x (16px)
  Padding Y                 → control.padding.y (8px)
  Icon to label             → control.gap.sm (8px) or control.gap.md (12px)

List?
  Between items             → list.item.gap (12px)
  Item padding X            → list.item.padding.x (16px)
  Item padding Y            → list.item.padding.y (12px)
  Between sections          → list.section.gap (24px)
```

## Common mistakes

**Arbitrary values:**
```swift
// Wrong
VStack(spacing: 14)
.padding(18)

// Correct
VStack(spacing: DS.Space.Stack.md)
.padding(DS.Space.Inset.card)
```

**Using core tokens directly:**
```swift
// Wrong
.padding(DS.Core.Space.s16)

// Correct
.padding(DS.Space.Inset.card)
```

**Mixing patterns:**
```swift
// Wrong
VStack(spacing: 12) {
  CardView().padding(18)
  CardView().padding(16)
}

// Correct
VStack(spacing: DS.Space.Stack.md) {
  CardView().padding(DS.Space.Inset.card)
  CardView().padding(DS.Space.Inset.card)
}
```

## Composing spacing

For one-off values between semantic tokens:

```swift
// Need something between stack.sm (8) and stack.md (12)
let customSpacing = DS.Space.Stack.sm + DS.Space.Stack.xs
```

**When to add a new token:** pattern used 3+ times and has clear semantic meaning.

## React Native

```typescript
import { tokens } from '@sibach/tokens';

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: tokens.space.inset.lg,
  },
  card: {
    padding: tokens.space.inset.card,
  },
  row: {
    gap: tokens.space.cluster.sm,
    paddingHorizontal: tokens.space.list.item.padding.x,
    paddingVertical: tokens.space.list.item.padding.y
  }
});
```
