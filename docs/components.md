# Components

Implementation patterns, code examples, and common mistakes when building with design tokens.

## Core rules

**Never use core tokens directly:**

```swift
// Wrong
.foregroundColor(DS.Core.Color.Neutral.n300)

// Correct
.foregroundColor(DS.Color.Text.secondary)
```

**Reach for intention, not appearance:**

```swift
// Wrong
let subtextColor = DS.Color.lightGray

// Correct
let subtextColor = DS.Color.Text.secondary
```

**Always use token spacing:**

```swift
// Wrong
.padding(18)

// Correct
.padding(DS.Space.Inset.card)
```

## Common patterns

### Text hierarchy

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  Text("$1,234.56")
    .font(DS.Typography.Role.callout())
    .foregroundColor(DS.Color.Text.primary)
  
  Text("Coffee Shop")
    .font(DS.Typography.Role.body())
    .foregroundColor(DS.Color.Text.secondary)
  
  Text("2 hours ago")
    .font(DS.Typography.Role.footnote())
    .foregroundColor(DS.Color.Text.tertiary)
}
```

### Buttons

**Primary:**

```swift
Button("Continue") { }
  .foregroundColor(DS.Color.Control.Primary.text)
  .padding(.horizontal, DS.Space.Control.paddingX)
  .padding(.vertical, DS.Space.Control.paddingY)
  .frame(minHeight: DS.Size.Control.minHeight)
  .background(DS.Color.Control.Primary.background)
  .cornerRadius(DS.Radius.control)
```

**Secondary:**

```swift
Button("Cancel") { }
  .foregroundColor(DS.Color.Control.Secondary.text)
  .padding(.horizontal, DS.Space.Control.paddingX)
  .padding(.vertical, DS.Space.Control.paddingY)
  .frame(minHeight: DS.Size.Control.minHeight)
  .background(DS.Color.Control.Secondary.background)
  .overlay(
    RoundedRectangle(cornerRadius: DS.Radius.control)
      .stroke(DS.Color.Control.Secondary.border, lineWidth: 1)
  )
```

**Destructive:**

```swift
Button("Delete") { }
  .foregroundColor(DS.Color.Control.Destructive.text)
  .padding(.horizontal, DS.Space.Control.paddingX)
  .padding(.vertical, DS.Space.Control.paddingY)
  .frame(minHeight: DS.Size.Control.minHeight)
  .background(DS.Color.Control.Destructive.background)
  .cornerRadius(DS.Radius.control)
```

### Cards

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.md) {
  Text("Account Balance")
    .font(DS.Typography.Role.headline())
    .foregroundColor(DS.Color.Text.primary)
  
  Text("$12,345.67")
    .font(DS.Typography.Role.numericMetric())
    .foregroundColor(DS.Color.Text.metric)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Background.surface)
.cornerRadius(DS.Radius.card)
```

### Form fields

```swift
@State private var text = ""
@FocusState private var isFocused: Bool

TextField("Email", text: $text)
  .font(DS.Typography.Role.body())
  .foregroundColor(DS.Color.Field.text)
  .padding(.horizontal, DS.Space.Control.paddingX)
  .frame(height: DS.Size.Control.minHeight)
  .background(DS.Color.Field.background)
  .overlay(
    RoundedRectangle(cornerRadius: DS.Radius.control)
      .stroke(
        isFocused ? DS.Color.Field.borderFocused : DS.Color.Field.border,
        lineWidth: 1
      )
  )
  .focused($isFocused)
```

### Status banners

```swift
HStack(spacing: DS.Space.Control.gap) {
  Image(systemName: "checkmark.circle.fill")
    .foregroundColor(DS.Color.Status.Success.foreground)
  
  Text("Payment successful")
    .font(DS.Typography.Role.callout())
    .foregroundColor(DS.Color.Status.Success.foreground)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Status.Success.surface)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(DS.Color.Status.Success.border, lineWidth: 1)
)
```

### Lists

```swift
VStack(spacing: DS.Space.List.rowGap) {
  ForEach(items) { item in
    HStack {
      VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
        Text(item.title)
          .font(DS.Typography.Role.callout())
          .foregroundColor(DS.Color.Text.primary)
        
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

### Modal/Bottom sheet

```swift
VStack(spacing: DS.Space.Stack.lg) {
  HStack {
    Text("Settings")
      .font(DS.Typography.Role.title2())
      .foregroundColor(DS.Color.Text.primary)
    
    Spacer()
    
    Button { dismiss() } label: {
      Image(systemName: "xmark")
        .foregroundColor(DS.Color.Icon.secondary)
    }
    .frame(width: 44, height: 44)
  }
  
  ScrollView {
    // content
  }
}
.padding(DS.Space.Inset.sheet)
.background(DS.Color.Background.elevated)
.cornerRadius(DS.Radius.sheet, corners: [.topLeft, .topRight])
```

## Decision trees

### Which text color?

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

### Which spacing?

```
Container padding?
  Full-screen → inset.screen (24px)
  Modal/sheet → inset.sheet (24px)
  Card interior → inset.card (20px)
  List row → inset.cell (16px)

Vertical spacing?
  Tightly related → stack.xs (8px)
  Related groups → stack.sm (12px)
  Distinct sections → stack.md (16px)
  Major boundaries → stack.lg (20px)

List spacing?
  Between items → list.rowGap (12px)
  Between sections → list.sectionGap (24px)

Button/field?
  Horizontal → control.paddingX (16px)
  Vertical → control.paddingY (12px)
  Icon to label → control.gap (8px)
```

### Which button style?

```
Primary action?
  → control.primary

Secondary action?
  → control.secondary

Destructive / irreversible?
  → control.destructive

Unavailable?
  → control.disabled
```

## iOS-specific patterns

### Minimum hit targets

Always respect 44pt minimum:

```swift
Button { } label: {
  Image(systemName: "plus")
    .foregroundColor(DS.Color.Icon.tint)
}
.frame(minWidth: 44, minHeight: 44)
```

### Pressed states (not hover)

```swift
@State private var isPressed = false

Button { } label: {
  Text("Button")
    .foregroundColor(DS.Color.Control.Primary.text)
    .padding(.horizontal, DS.Space.Control.paddingX)
    .padding(.vertical, DS.Space.Control.paddingY)
    .background(
      isPressed 
        ? DS.Color.Control.Primary.pressed 
        : DS.Color.Control.Primary.background
    )
}
.buttonStyle(PlainButtonStyle())
```

Or use SwiftUI's built-in `.buttonStyle()` which handles this automatically.

## React Native patterns

```typescript
import { tokens } from '@sibach/tokens';

const styles = StyleSheet.create({
  card: {
    padding: tokens.space.inset.card,
    backgroundColor: tokens.color.bg.surface,
    borderRadius: tokens.radius.card
  },
  buttonPrimary: {
    backgroundColor: tokens.color.control.primary.bg,
    paddingVertical: tokens.space.control.paddingY,
    paddingHorizontal: tokens.space.control.paddingX,
    borderRadius: tokens.radius.control,
    minHeight: tokens.size.control.minHeight
  },
  primaryText: {
    ...tokens.typography.role.headline,
    color: tokens.color.text.primary
  }
});
```

## Common mistakes

### Using core tokens

```swift
// Wrong
.foregroundColor(Color(hex: "#CBD5E1"))

// Correct
.foregroundColor(DS.Color.Text.secondary)
```

### Magic numbers

```swift
// Wrong
VStack(spacing: 14)
.padding(18)

// Correct
VStack(spacing: DS.Space.Stack.sm)
.padding(DS.Space.Inset.card)
```

### Visual descriptions

```swift
// Wrong
let subtleGray = DS.Color.neutral400

// Correct
let secondaryText = DS.Color.Text.secondary
```

### Hardcoding pressed states

```swift
// Wrong
.background(isPressed ? Color(hex: "#0068D9") : Color(hex: "#007AFF"))

// Correct
.background(isPressed ? DS.Color.Control.Primary.pressed : DS.Color.Control.Primary.background)
```

### Component-specific colors

```swift
// Wrong
enum Colors {
  static let cardBg = UIColor(hex: "#16181D")
}

// Correct
let cardBg = DS.Color.Background.surface
```

### Inconsistent spacing

```swift
// Wrong
VStack(spacing: 12) {
  CardView().padding(18)
  CardView().padding(20)
}

// Correct
VStack(spacing: DS.Space.Stack.sm) {
  CardView().padding(DS.Space.Inset.card)
  CardView().padding(DS.Space.Inset.card)
}
```

## When you can't find a token

**1. Check composition:**

```swift
let spacing = DS.Space.Stack.sm + DS.Space.Stack.xs
```

**2. Verify it's systematic:**
* Used 3+ times?
* Has semantic meaning?

**3. Ask #design-system:**
Might already be planned.

**4. If one-off, document it:**

```swift
// Optical centering for this icon
.offset(y: 6)
```

## Performance

**iOS:** Zero runtime cost. Tokens are constants.

**React Native:** Object lookup negligible, values cached.

**Avoid runtime calculations:**

```swift
// Avoid
let pressed = primary.withAlphaComponent(0.8)

// Prefer
let pressed = DS.Color.Control.Primary.pressed
```

## Testing

**Visual regression:**

```bash
npm run test:visual
```

**Accessibility:**

```bash
npm run test:contrast
```

Validates WCAG AA:
* Text: 4.5:1 minimum
* Large text: 3:1
* Controls: 3:1

See [Color System](color-system.md), [Typography](typography.md), [Spacing](spacing.md), and [Architecture](architecture.md) for details.
