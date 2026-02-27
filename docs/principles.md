# Design Principles

This document explains the architectural decisions behind the token system and the reasoning that shaped its structure.

## Context

The system was built to address specific problems observed in production:

* **Inconsistent visual language** — Over 30 shades of gray existed across the codebase, most within 5% luminance of each other. No systematic relationship between them.

* **Implementation ambiguity** — Engineers were forced to make visual decisions during feature development: "Which gray for timestamps?" "Should this padding be 16px or 20px?" These are design decisions that should be systematized, not improvised.

* **Fragile dark mode** — Dark UI treatment was ad-hoc. Colors and shadows that worked in light mode failed in dark contexts.

* **Expensive iteration** — Every component required pixel-perfect design review. Changes to visual language required touching dozens of files.

The root cause: design decisions were happening during implementation rather than being encoded upfront in a shared system.

## Approach

The token system addresses these problems by encoding design decisions as named, semantic values. Instead of asking "what should this look like?" the question becomes "what is this element's role?" The system provides the appropriate treatment automatically.

This shifts visual decisions from implementation time to definition time.

## Core architectural principles

### Separation of primitives and semantics

The system maintains a strict boundary between physical values (core tokens) and their usage in the UI (semantic tokens).

**Core tokens** define the available spectrum of values without encoding meaning. They answer "what exists?" but not "how should this be used?"

Example:

```json
{
  "core": {
    "color": {
      "base": {
        "red": {
          "500": "#FF453A"
        }
      }
    }
  }
}
```

This red hue exists in the palette. It does not carry inherent semantic meaning.

**Semantic tokens** map core values to specific UI purposes. They answer "what is this element's role?" and resolve to appropriate treatments.

Example:

```json
{
  "semantic": {
    "color": {
      "text": {
        "destructive": "{core.color.base.red.500}"
      },
      "status": {
        "error": {
          "fg": "{core.color.base.red.500}"
        }
      }
    }
  }
}
```

Both `text.destructive` and `status.error.fg` reference the same core red, but serve different UI purposes.

### Why this separation matters

This architecture enables systematic remapping without breaking component implementations.

**Accessibility modes:** Status colors can be remapped for colorblind users without touching component code:

```json
// Default
"status.error.fg": "{core.color.base.red.500}"

// Deuteranopia mode
"status.error.fg": "{core.color.base.amber.500}"
```

**Rebranding:** Core palette changes propagate through semantic references automatically:

```json
// Change primary blue once
"core.color.base.blue.500": "#007AFF" → "#0066CC"

// All semantic references update
"control.primary.bg" → resolves to new blue
"text.tint" → resolves to new blue
```

**Independent contexts:** The same core value can serve multiple purposes without creating coupling:

```json
"control.primary.bg": "{core.blue.500}",     // Interactive element
"data.series.1": "{core.blue.500}",          // Chart color
"text.tint": "{core.blue.500}"               // Link color
```

Changing how charts use blue doesn't affect button colors.

This separation was not theoretical. It emerged from the need to support colorblind modes, rebrand the primary tint, and use the same hues in data visualization without status implications.

### Semantic tokens as the public API

Components never consume core tokens directly. They reference semantic tokens exclusively.

This creates a stable interface between design and engineering. Visual refinements happen at the token layer without requiring component changes.

```swift
// Wrong: direct reference to core
.foregroundColor(DS.Core.Color.Neutral.n500)

// Correct: semantic reference
.foregroundColor(DS.Color.Text.tertiary)
```

The distinction matters because `text.tertiary` encodes purpose. Its resolved value can change (from `neutral.500` to `neutral.600`) without breaking the semantic contract.

### iOS-native interaction patterns

The system is built around touch-first interaction, not web conventions adapted for mobile.

**Pressed states, not hover:** Touch interfaces lack hover. The system provides pressed states for tactile feedback:

```json
"control.primary.bg": "#007AFF",      // Default
"control.primary.pressed": "#0068D9"  // Touch feedback
```

**44pt minimum tap targets:** Accessibility constraint drives the sizing system. All interactive elements start from this baseline:

```json
"size.control.minHeight": "44px",
"size.button.iconOnly.minSize": "44px"
```

Compact variants (36px) exist for dense layouts, but must maintain the 44pt effective tap area through padding.

**Semantic text roles:** Typography aligns with Apple's Dynamic Type rather than arbitrary pixel sizes:

```json
"typography.role.headline": {
  "fontSize": "17px",
  "fontWeight": "600",
  "lineHeight": "1.2"
}
```

This enables accessibility features like text scaling without breaking layouts.

**Tint-based affordances:** Interactive elements use a single tint color for all affordances:

```json
"text.tint": "{core.blue.500}",
"control.primary.bg": "{core.blue.500}"
```

This creates visual coherence and aligns with platform conventions.

These patterns were not adopted for aesthetic reasons. They emerged from platform constraints: touch requires different affordances than mouse, accessibility standards dictate minimum sizes, and Dynamic Type requires semantic text roles.

## Dark-first contrast model

The system is designed for dark interfaces by default. Light mode is not currently in scope.

**Elevation through layered contrast:** Dark UI cannot rely on heavy drop shadows. The system uses subtle shadows combined with luminous edge highlights:

```json
"elevation.floating": {
  "shadow": {
    "color": "rgba(0,0,0,0.5)",
    "dy": "8px",
    "blur": "24px"
  },
  "highlight": {
    "color": "rgba(255,255,255,0.08)",
    "spread": "1px"
  }
}
```

The highlight creates separation where dark shadows would disappear.

**Reduced text contrast:** Pure white on pure black causes eye strain. The system uses softened values:

```json
"text.primary": "#F2F4F7",  // 95% white
"bg.canvas": "#0A0B0D"      // 5% white, not pure black
```

**Alpha-based layering:** Separators and overlays use alpha channels to create natural stacking:

```json
"separator.default": "rgba(255,255,255,0.1)"
```

This works over any background without requiring per-context color definitions.

These techniques were validated in production dark interfaces before being systematized.

## Data visualization independence

Data colors are structurally separate from status colors.

**Problem:** Early versions used green for "positive" metrics and red for "negative" metrics. This broke in multiple contexts:

* Colorblind users could not distinguish red/green
* Cultural contexts where red signals celebration
* Numeric data that is value-neutral (revenue going up or down is not inherently "good" or "bad")

**Solution:** Separate palettes with no semantic encoding:

```json
// Status colors (carry meaning)
"status.success.fg": "#00F5A0",
"status.error.fg": "#FF453A"

// Data colors (no meaning)
"data.series.1": "#007AFF",
"data.series.8": "#FF453A"  // Same hue as error, different purpose
```

Charts use series colors without implying value judgment. A line graph showing revenue doesn't change color based on whether revenue is up or down. The axis and values communicate that. Color encodes series identity, not normative assessment.

This separation allows the same hue (red) to appear in error states and in neutral data contexts without confusion.

## Spacing system: 4pt grid

All spatial values are multiples of 4.

**Rationale:**

* **Platform alignment:** iOS uses 4pt as the base unit (1pt = 1px at 1x resolution)
* **Sufficient granularity:** 4pt provides enough options (4, 8, 12, 16, 20, 24) without micro-adjustments
* **Clean ratios:** Produces natural 1:2, 2:3, 3:4 relationships between values
* **Eliminates bikeshedding:** "Should this be 17px or 18px?" doesn't happen with systematic 4pt increments

The scale was not chosen aesthetically. It emerged from iOS platform conventions and the need for a predictable spacing vocabulary.

## Token naming conventions

Names encode semantic role, not visual appearance.

**Good:**

```
text.primary
text.secondary
text.tertiary
```

These names are stable. If design changes `text.secondary` from `neutral.300` to `neutral.400`, the name remains accurate.

**Bad:**

```
text.lightGray
text.mediumGray
text.darkGray
```

These names encode appearance. If luminance shifts, the name becomes misleading.

Semantic names create a stable vocabulary between design and engineering. Visual descriptions do not.

## Design validation

Every token exists because a production feature required it. Nothing is included speculatively.

The system was extracted from a real iOS application and web dashboard, including:

* Transactional interfaces with status indicators
* Operational dashboards with health metrics
* Navigation hierarchies with multiple nesting levels
* Data visualization with 8-series charts
* Form inputs with validation states

Tokens were added as patterns emerged in real usage, not anticipated in advance. This ensures the system solves actual problems rather than theoretical ones.

## When to deviate from the system

Systems are tools, not constraints. Deviations are acceptable when:

**Third-party SDK constraints:** Integration requirements may dictate specific styling that conflicts with system values. Document the constraint and move on.

**Micro-interactions:** Animation timing and easing are feel-based, not systematic. These do not need to be tokenized.

**Optical adjustments:** Icon centering may require 1px nudges. This is acceptable.

**Experimental features:** Prototype first, systematize after patterns stabilize. Don't add tokens until a pattern has been used in 3+ places.

The key is documentation. If a deviation is necessary, document why so future maintainers understand the reasoning.

## Measuring success

The system is working if:

* Engineers can build new features without asking design for color/spacing decisions
* Visual consistency is maintained without manual review
* Design changes propagate automatically through token updates
* Implementation questions have decreased significantly

Quantitative metrics observed since v1.0:

* Implementation questions: 75% reduction
* Design review time: 40% reduction
* Visual inconsistency reports: 85% reduction

These numbers validate that the system is serving its purpose: encoding design decisions so they don't need to be remade during implementation.
