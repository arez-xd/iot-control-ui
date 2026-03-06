# Elevation

Depth perception in dark UI through layered contrast: highlights and subtle shadows.

## The dark UI problem

Traditional elevation (heavy drop shadows) fails in dark interfaces. Dark shadows disappear against dark backgrounds. The solution: luminous edge highlights combined with subtle shadows.

**Light mode approach:**
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

Works fine — shadow creates depth against light background.

**Dark mode reality:**
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.5);
```

Barely visible. Shadow on dark = muddy, unclear separation.

**Dark-first solution:**
```css
box-shadow: 
  0 8px 24px rgba(0,0,0,0.5),           /* Subtle depth */
  0 0 0 1px rgba(255,255,255,0.08);    /* Luminous edge */
```

The white edge highlight creates crisp separation. Shadow provides subtle depth cue.

## Core elevation primitives

Design-system internal. Components use semantic elevation roles.

### Shadow

**Floating elements:**
```json
{
  "color": "rgba(0,0,0,0.5)",
  "dx": 0,
  "dy": 0,
  "blur": 24,
  "spread": -2
}
```

Soft, diffused shadow. Provides depth without harshness.

### Highlight

**Floating elements:**
```json
{
  "color": "rgba(255,255,255,0.08)",
  "dx": 0,
  "dy": 0,
  "blur": 0,
  "spread": 1
}
```

Crisp 1px white edge. Creates separation where shadows fail.

### Scrim

**Modal backdrop:**
```json
{
  "color": "rgba(0,0,0,0.6)"
}
```

60% black overlay. Dims background, focuses attention on modal.

## Semantic elevation roles

### Floating elements

Elevated UI: bottom sheets, dropdowns, popovers, floating action buttons.

**Combined treatment:**
* Shadow: rgba(0,0,0,0.5) offset 0,0 blur 24 spread -2
* Highlight: rgba(255,255,255,0.08) offset 0,0 blur 0 spread 1

**iOS implementation:**

```swift
// SwiftUI
.shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.sheet)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)

// UIKit
layer.shadowColor = UIColor.black.cgColor
layer.shadowOpacity = 0.5
layer.shadowOffset = CGSize(width: 0, height: 0)
layer.shadowRadius = 12

layer.borderWidth = 1
layer.borderColor = UIColor.white.withAlphaComponent(0.08).cgColor
```

**React Native:**

```typescript
const floatingStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  elevation: 8, // Android
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.08)'
};
```

### Modal scrim

Darkens background, focuses attention on foreground content.

**iOS implementation:**

```swift
// SwiftUI
Color.black.opacity(0.6)
  .ignoresSafeArea()
  .onTapGesture {
    dismiss()
  }

// UIKit
let scrimView = UIView()
scrimView.backgroundColor = UIColor.black.withAlphaComponent(0.6)
```

**React Native:**

```typescript
<View style={{
  backgroundColor: 'rgba(0,0,0,0.6)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}}>
```

## Elevation hierarchy

Not all elements need elevation. Reserve it for functional separation.

### Level 0: Canvas

**Background surface.** No elevation.

```swift
.background(DS.Color.Background.canvas)
```

Everything rests on this base layer.

### Level 1: Surface

**Cards, grouped lists.** Flat on canvas, no shadow or highlight.

```swift
.background(DS.Color.Background.surface)
.cornerRadius(DS.Radius.card)
```

Separation through color (neutral.800 vs neutral.900), not elevation.

### Level 2: Floating

**Bottom sheets, dropdowns, popovers.** Shadow + highlight.

```swift
.background(DS.Color.Background.elevated)
.cornerRadius(DS.Radius.sheet)
.shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.sheet)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

Clear visual separation from surface layer.

### Level 3: Modal

**Full-screen overlays.** Floating + scrim.

```swift
ZStack {
  // Scrim
  Color.black.opacity(0.6)
    .ignoresSafeArea()
  
  // Modal content
  VStack {
    // ...
  }
  .background(DS.Color.Background.elevated)
  .cornerRadius(DS.Radius.sheet, corners: [.topLeft, .topRight])
  .shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
  .overlay(
    RoundedRectangle(cornerRadius: DS.Radius.sheet)
      .stroke(Color.white.opacity(0.08), lineWidth: 1)
  )
}
```

Maximum focus: dimmed background, elevated content.

## Usage patterns

### Bottom sheet

```swift
ZStack(alignment: .bottom) {
  // Scrim
  Color.black.opacity(0.6)
    .ignoresSafeArea()
    .onTapGesture { dismiss() }
  
  // Sheet
  VStack(spacing: DS.Space.Stack.lg) {
    // Handle
    RoundedRectangle(cornerRadius: 2)
      .fill(Color.white.opacity(0.3))
      .frame(width: 36, height: 4)
    
    // Content
    VStack(alignment: .leading, spacing: DS.Space.Stack.md) {
      Text("Filter Options")
        .font(DS.Typography.Role.title2())
      
      // Filter controls
    }
  }
  .padding(DS.Space.Inset.sheet)
  .background(DS.Color.Background.elevated)
  .cornerRadius(DS.Radius.sheet, corners: [.topLeft, .topRight])
  .shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
  .overlay(
    RoundedRectangle(cornerRadius: DS.Radius.sheet)
      .stroke(Color.white.opacity(0.08), lineWidth: 1)
  )
}
```

### Dropdown menu

```swift
VStack(alignment: .leading, spacing: 0) {
  ForEach(options) { option in
    Button(action: { select(option) }) {
      Text(option.title)
        .foregroundColor(DS.Color.Text.primary)
        .padding(DS.Space.Inset.cell)
    }
    
    if option != options.last {
      Divider()
        .background(DS.Color.Separator.default)
    }
  }
}
.background(DS.Color.Background.elevated)
.cornerRadius(DS.Radius.control)
.shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

### Popover tooltip

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  Text("Pro Feature")
    .font(DS.Typography.Role.callout())
    .foregroundColor(DS.Color.Text.primary)
  
  Text("Upgrade to unlock advanced analytics")
    .font(DS.Typography.Role.footnote())
    .foregroundColor(DS.Color.Text.secondary)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Background.elevated)
.cornerRadius(DS.Radius.control)
.shadow(color: Color.black.opacity(0.5), radius: 8, x: 0, y: 0)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

### Floating action button

```swift
Button(action: { addTransaction() }) {
  Image(systemName: "plus")
    .font(.system(size: 20, weight: .semibold))
    .foregroundColor(DS.Color.Control.Primary.text)
    .frame(width: 56, height: 56)
}
.background(DS.Color.Control.Primary.background)
.cornerRadius(28)
.shadow(color: Color.black.opacity(0.5), radius: 16, x: 0, y: 4)
.overlay(
  Circle()
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

## When to use elevation

**Use floating elevation for:**
* Bottom sheets
* Dropdown menus
* Popovers and tooltips
* Floating action buttons
* Context menus

**Don't use elevation for:**
* Static cards (use surface color)
* List items (use separator)
* Inline content
* Navigation bars

Elevation is for functional hierarchy, not decoration.

## Common mistakes

### Over-elevating

```swift
// Wrong - everything floats
CardView()
  .shadow(color: Color.black.opacity(0.5), radius: 12)

// Correct - cards are flat
CardView()
  .background(DS.Color.Background.surface)
```

Reserve elevation for interactive overlays.

### Missing highlight

```swift
// Wrong - shadow only, poor separation
.shadow(color: Color.black.opacity(0.5), radius: 12)

// Correct - shadow + highlight
.shadow(color: Color.black.opacity(0.5), radius: 12)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.sheet)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

Highlight is critical for dark UI depth.

### Wrong shadow offset

```swift
// Wrong - directional shadow (light mode thinking)
.shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 8)

// Correct - centered shadow (dark mode)
.shadow(color: Color.black.opacity(0.5), radius: 12, x: 0, y: 0)
```

Dark UI uses ambient shadow, not directional light source.

### Heavy shadows

```swift
// Wrong - too heavy
.shadow(color: Color.black.opacity(0.8), radius: 24)

// Correct - subtle
.shadow(color: Color.black.opacity(0.5), radius: 12)
```

Subtlety is key in dark interfaces.

## Accessibility considerations

**Reduced transparency mode:**

When user enables "Reduce Transparency" in iOS accessibility settings:

```swift
@Environment(\.accessibilityReduceTransparency) var reduceTransparency

var scrimColor: Color {
  reduceTransparency ? Color.black : Color.black.opacity(0.6)
}
```

Use solid colors instead of alpha when transparency is reduced.

**High contrast mode:**

Increase highlight visibility:

```swift
@Environment(\.accessibilityDifferentiateWithoutColor) var highContrast

var highlightOpacity: Double {
  highContrast ? 0.15 : 0.08
}
```

## Platform differences

### iOS

Native shadow support in SwiftUI and UIKit. Highlights require overlay pattern.

### React Native

**iOS:** Native shadow rendering  
**Android:** `elevation` prop (material design shadow)

```typescript
// Cross-platform floating style
const floatingStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  android: {
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  }
});
```

Android's elevation automatically includes shadow. iOS requires manual shadow definition.

## Performance notes

**Shadow rendering cost:**

Shadows are expensive. Limit to:
* Currently visible floating elements
* Active modals and sheets

Don't apply to:
* Off-screen items
* Scrolling list cells
* Static cards

**Optimization:**

```swift
// Cache shadow layer
layer.shouldRasterize = true
layer.rasterizationScale = UIScreen.main.scale
```

Only for static shadows. Don't rasterize animating elements.

## Why this approach

**Traditional elevation (light mode):**  
Depth through shadow darkness. Works because light backgrounds provide contrast.

**Dark UI reality:**  
Dark shadows disappear. Need alternate depth cues.

**Our solution:**  
Highlights create crisp edges. Subtle shadows add depth. Scrim provides context.

**Result:**  
Clear visual hierarchy without relying on shadows alone.

See [Principles](principles.md) for dark-first design rationale and [Components](components.md) for implementation patterns.
