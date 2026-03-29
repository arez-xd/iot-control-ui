# Elevation

Depth perception in dark UI through layered contrast: highlights and subtle shadows.

## The dark UI problem

Traditional heavy drop shadows disappear against dark backgrounds. The solution: luminous edge highlights combined with subtle ambient shadows.

```css
/* Light mode approach — fails in dark UI */
box-shadow: 0 4px 12px rgba(0,0,0,0.15);

/* Dark-first solution */
box-shadow:
  0 2px 6px #0000003D,         /* Subtle depth */
  0 1px 0px #FFFFFF14 inset;   /* Luminous edge */
```

The white edge highlight creates crisp separation. Shadow provides a subtle depth cue.

## Core elevation primitives

Design-system internal. Components use semantic elevation roles.

### Shadow — `effects.shadow.1`

```json
{
  "color":   "#0000003D",
  "offsetX": "0px",
  "offsetY": "2px",
  "blur":    "6px",
  "spread":  "0px"
}
```

### Highlight — `effects.highlight.1`

```json
{
  "color":   "#FFFFFF14",
  "offsetX": "0px",
  "offsetY": "1px",
  "blur":    "0px",
  "spread":  "0px"
}
```

1px white edge. Creates crisp surface separation where shadows fail.

### Scrim — `effects.scrim.modal`

`#00000099` — 60% black overlay. Dims background content, focuses attention on modal.

## Elevation hierarchy

### Level 0 — Canvas

Base layer. No elevation applied.

```swift
.background(DS.Color.Bg.canvas)
```

### Level 1 — Surface

Cards, grouped lists. Separated from canvas by color alone — no shadow needed.

```swift
.background(DS.Color.Bg.Surface.base)   // neutral.800
.cornerRadius(DS.Radius.card)
```

`surface.base` (#1C222A) on `canvas` (#0F1318) gives sufficient contrast without elevation effects.

### Level 2 — Floating

Bottom sheets, dropdowns, popovers, context menus. Shadow + highlight applied.

```swift
.background(DS.Color.Bg.Surface.elevated)
.cornerRadius(DS.Radius.panel)
.shadow(color: Color(hex: "#0000003D"), radius: 3, x: 0, y: 2)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.panel)
    .stroke(Color(hex: "#FFFFFF14"), lineWidth: 1)
)
```

### Level 3 — Modal

Full overlays: sheets, dialogs. Floating treatment + scrim.

```swift
ZStack {
  // Scrim
  Color(hex: "#00000099")
    .ignoresSafeArea()
    .onTapGesture { dismiss() }

  // Modal content
  VStack { /* ... */ }
    .background(DS.Color.Bg.Surface.modal)
    .cornerRadius(DS.Radius.panel)
    .shadow(color: Color(hex: "#0000003D"), radius: 3, x: 0, y: 2)
    .overlay(
      RoundedRectangle(cornerRadius: DS.Radius.panel)
        .stroke(Color(hex: "#FFFFFF14"), lineWidth: 1)
    )
}
```

## Semantic elevation tokens

```
effects.shadow.surface.elevated    → effects.shadow.1
effects.shadow.surface.floating    → effects.shadow.1
effects.highlight.surface.elevated → effects.highlight.1
effects.highlight.surface.floating → effects.highlight.1
effects.overlay.scrim.modal        → effects.scrim.modal
```

## Implementation patterns

### Bottom sheet

```swift
ZStack(alignment: .bottom) {
  Color(hex: "#00000099")
    .ignoresSafeArea()
    .onTapGesture { dismiss() }

  VStack(spacing: DS.Space.Stack.lg) {
    // Handle indicator
    RoundedRectangle(cornerRadius: 2)
      .fill(Color(hex: "#FFFFFF33"))
      .frame(width: 36, height: 4)

    // Content
    VStack(alignment: .leading, spacing: DS.Space.Stack.lg) {
      Text("Filter")
        .font(DS.Typography.Role.title2())
      // filter controls
    }
  }
  .padding(DS.Space.Inset.panel)
  .background(DS.Color.Bg.Surface.modal)
  .cornerRadius(DS.Radius.panel)
  .shadow(color: Color(hex: "#0000003D"), radius: 3, x: 0, y: 2)
  .overlay(
    RoundedRectangle(cornerRadius: DS.Radius.panel)
      .stroke(Color(hex: "#FFFFFF14"), lineWidth: 1)
  )
}
```

### Dropdown / context menu

```swift
VStack(alignment: .leading, spacing: 0) {
  ForEach(options) { option in
    Button { select(option) } label: {
      Text(option.title)
        .foregroundColor(DS.Color.Text.primary)
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(DS.Space.Inset.md)
    }
    if option.id != options.last?.id {
      Divider().background(DS.Color.Border.subtle)
    }
  }
}
.background(DS.Color.Bg.Surface.elevated)
.cornerRadius(DS.Radius.control)
.shadow(color: Color(hex: "#0000003D"), radius: 3, x: 0, y: 2)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(Color(hex: "#FFFFFF14"), lineWidth: 1)
)
```

### React Native

```typescript
const floatingStyle = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF14'
  },
  android: {
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF14'
  }
});
```

## When to use elevation

**Use floating (level 2) for:**
- Bottom sheets
- Dropdown menus
- Tooltips, popovers
- Context menus

**Use modal (level 3) for:**
- Full-screen overlays
- Confirmation dialogs
- Critical alerts

**Don't use elevation for:**
- Static cards — use surface color
- List rows — use separator
- Navigation bars

## Common mistakes

**Missing highlight on floating surfaces:**
```swift
// Wrong — shadow alone, weak separation in dark UI
.shadow(color: Color(hex: "#0000003D"), radius: 3)

// Correct — shadow + highlight
.shadow(color: Color(hex: "#0000003D"), radius: 3, x: 0, y: 2)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.panel)
    .stroke(Color(hex: "#FFFFFF14"), lineWidth: 1)
)
```

**Over-elevating static cards:**
```swift
// Wrong — cards don't need floating elevation
CardView()
  .shadow(color: Color(hex: "#0000003D"), radius: 3)

// Correct — cards use surface color only
CardView()
  .background(DS.Color.Bg.Surface.base)
```

## Accessibility

**Reduced transparency (iOS):**

```swift
@Environment(\.accessibilityReduceTransparency) var reduceTransparency

var scrimColor: Color {
  reduceTransparency ? .black : Color(hex: "#00000099")
}
```

**High contrast:**

```swift
@Environment(\.accessibilityDifferentiateWithoutColor) var highContrast

var highlightOpacity: Double {
  highContrast ? 0.20 : 0.08
}
```
