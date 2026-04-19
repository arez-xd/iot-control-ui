# Sibach Design System

![Platform](https://img.shields.io/badge/platform-iOS-black)
![Architecture](https://img.shields.io/badge/architecture-token--driven-blue)
![Density](https://img.shields.io/badge/density-data--heavy-5E60CE)
![Theme](https://img.shields.io/badge/theme-dark--first-111111)
![Layering](https://img.shields.io/badge/layering-core→semantic-success)
![Version](https://img.shields.io/badge/version-1.0.0-informational)

This repository defines the visual foundations of a production iOS application and web-based analytics dashboard: color, typography, spacing, elevation, interactive states, and data visualization treatment. The system is structured around two layers: core primitives and semantic tokens. This separation keeps the system predictable and easier to evolve.

## Purpose

This system exists to support real product constraints:

* **iOS-native interaction patterns** — touch-first interfaces with pressed states, 44pt minimum tap targets, and tint-based affordances
* **dark-first UI** — designed for readability and hierarchy in low-light contexts
* **data-heavy dashboards** — high information density with clear visual hierarchy
* **long-lived products** — stable foundations that can evolve without breaking implementations

It defines a shared contract between design and engineering and provides a stable base for implementation decisions.

## Key ideas

### Semantic tokens as the public API

Components reference semantic tokens rather than raw values such as hex colors or pixel sizes.

Examples:
* `color.text.primary`
* `color.status.error.fg`
* `space.inset.card`
* `typography.role.headline`

This allows visual adjustments without affecting component logic or layout structure.

### Clear separation of layers

| Layer | Responsibility |
|-------|----------------|
| Core tokens | Raw primitives (colors, scales, dimensions) |
| Semantic tokens | Meaning and usage in the UI |
| Components | Layout, behavior, composition |

Core tokens provide available values. Semantic tokens map those values to interface roles.

### iOS-native thinking

The system embraces platform-specific interaction patterns rather than translating from web conventions:

* **Touch states over hover** — pressed states provide tactile feedback
* **44pt minimum tap targets** — accessibility constraint drives sizing system
* **Semantic text roles** — aligned with Apple's Dynamic Type
* **Tint-based interactions** — primary color used for all interactive affordances

### Dark-first, contrast-aware

The interface is designed for dark environments by default. Elevation is communicated through layered contrast, highlights, and subtle shadows.

Light mode remains outside the current scope.

### Validated against a real product

All tokens and abstractions are based on actual production applications, including:

* transactional interfaces
* operational dashboards
* status indicators and alerts
* data visualization and metrics
* navigation and information architecture

The system reflects patterns that have been used and refined in production.

## Repository structure

```
sibach-design-system/
├── README.md
│
├── tokens/
│   ├── core/
│   │   ├── color.json
│   │   ├── space.json
│   │   ├── typography.json
│   │   ├── size.json
│   │   ├── radius.json
│   │   ├── border.json
│   │   ├── stroke.json
│   │   └── elevation.json
│   │
│   ├── semantic/
│   │   ├── color.json
│   │   ├── space.json
│   │   ├── typography.json
│   │   ├── size.json
│   │   ├── radius.json
│   │   ├── border.json
│   │   ├── stroke.json
│   │   └── elevation.json
│   │
│   └── build/                    ← Auto-generated artifacts
│       ├── ios/
│       │   └── tokens.swift
│       └── ts/
│           └── tokens.ts
│       
│           
│
├── docs/
│   ├── principles.md
│   ├── architecture.md
│   ├── tokens.md
│   ├── color-system.md
│   ├── typography.md
│   ├── spacing.md
│   ├── elevation.md
│   ├── data-visualization.md
│   ├── governance.md
│   └── components.md
│
└── figma/
    └── README.md
```

## How tokens work

### Core tokens

Core tokens define the available spectrum of values without encoding usage intent. Core tokens define available values without assigning interface meaning."

Examples:

```json
{
  "core": {
    "color": {
      "base": {
        "neutral": {
          "100": "#F2F4F7",
          "500": "#64748B",
          "900": "#0A0B0D"
        },
        "blue": {
          "500": "#007AFF",
          "600": "#0068D9"
        }
      }
    },
    "space": {
      "4": "16px",
      "5": "20px",
      "6": "24px"
    }
  }
}
```

Core tokens are **never consumed directly** by components. They exist as building blocks for semantic tokens.

### Semantic tokens

Semantic tokens map core values to specific UI roles. Semantic tokens map core values to interface roles..

Examples:

```json
{
  "semantic": {
    "color": {
      "text": {
        "primary": "{core.color.base.neutral.100}",
        "secondary": "{core.color.base.neutral.300}",
        "tertiary": "{core.color.base.neutral.500}"
      },
      "control": {
        "primary": {
          "bg": "{core.color.base.blue.500}",
          "pressed": "{core.color.base.blue.600}"
        }
      }
    },
    "space": {
      "inset": {
        "card": "{core.space.5}"
      }
    }
  }
}
```

Semantic tokens are **the only tokens** components should reference.

### Why this separation matters

A layered architecture enables:

**Systematic remapping** — Accessibility modes or themes can remap semantic tokens without touching component code:

```json
// Default
"control.primary.bg": "{core.blue.500}"

// High-contrast mode
"control.primary.bg": "{core.blue.600}"
```

**Semantic independence** — The same core value can serve different purposes:

```json
"control.primary.bg": "{core.blue.500}",
"text.tint": "{core.blue.500}",
"data.series.1": "{core.blue.500}"
```

**Safe evolution** — Core palette adjustments propagate automatically through semantic references:

```json
// Change blue.500 once
"core.blue.500": "#007AFF" → "#0066CC"

// All semantic references update
"control.primary.bg" → automatically updates
"text.tint" → automatically updates
```

## Platform implementation

Tokens are stored as JSON and auto-generated into platform-specific formats. Tokens are stored as JSON and transformed into platform-specific outputs from a single source of truth.

**iOS** → Swift enums with UIKit/SwiftUI compatibility  
**Web** → CSS custom properties + TypeScript types  
**Build** → Style Dictionary transformation pipeline

Generated code is committed to the repository for transparency and debugging, but should never be edited manually.

See [architecture documentation](docs/architecture.md) for build system details.

## Documentation

### Foundation
* **[Principles](docs/principles.md)** — design philosophy, reasoning, and decision framework
* **[Architecture](docs/architecture.md)** — technical structure, build system, platform outputs
* **[Tokens](docs/tokens.md)** — complete reference for core and semantic tokens

### Token systems
* **[Color](docs/color-system.md)** — palettes, semantic roles, status treatment, data visualization
* **[Typography](docs/typography.md)** — text roles, font scale, iOS alignment
* **[Spacing](docs/spacing.md)** — 4pt grid, layout patterns, composition
* **[Elevation](docs/elevation.md)** — dark UI depth, layered contrast, floating elements
* **[Data Visualization](docs/data-visualization.md)** — chart colors, grid treatment, metric display

### Guides
* **[Governance](docs/governance.md)** — contribution process, deprecation, versioning
* **[Components](docs/components.md)** — implementation patterns, common mistakes, decision trees

## Design principles

**Foundation first** — Core tokens define physical properties without semantic meaning. A color palette doesn't "know" it will be used for status indicators.

**Semantic over visual** — Components reach for intention (`text.tertiary`) not appearance (`neutral-500`). This shifts the question from "what should this look like?" to "what is this element's role?"

**iOS-native patterns** — The system is built around touch-first interaction, not web conventions. Tap targets, pressed states, and text roles are first-class constraints.

**Dark-first contrast** — Elevation is communicated through highlights and subtle shadows, not heavy drop shadows that fail in dark interfaces.

**Validated against production** — Every token exists because a real product needed it. Patterns are extracted from actual usage, not speculated.

See [principles documentation](docs/principles.md) for detailed rationale and case studies.

## Core concepts

### Text hierarchy

Three levels of typographic emphasis, used consistently throughout the interface:

```json
"text.primary": "#F2F4F7"    // Headlines, primary content, key information
"text.secondary": "#CBD5E1"  // Body copy, descriptions, supporting text
"text.tertiary": "#64748B"   // Metadata, timestamps, de-emphasized content
```

### Status system

Status indicators use a three-part treatment for consistency:

```json
"status.success.fg": "#00F5A0",      // Foreground — text and icons
"status.success.surface": "#006644",  // Surface — tinted background
"status.success.border": "#00AA6F"    // Border — outline treatment
```

This ensures status banners, badges, and alerts follow the same visual logic.

### Interactive states

iOS interaction uses pressed states rather than hover:

```json
"control.primary.bg": "#007AFF",      // Default state
"control.primary.pressed": "#0068D9"  // Touch feedback
```

### Data visualization independence

Data colors are separate from status colors to avoid semantic encoding:

```json
// Status colors (carry meaning)
"status.error.fg": "#FF453A"

// Data colors (no meaning assigned)
"data.series.1": "#007AFF",
"data.series.8": "#FF453A"  // Same hue, different purpose
```

Charts use series colors without implying value judgments. A line color doesn't indicate "good" or "bad" — the axis and values communicate that.

## Implementation rules

### Use semantic tokens

```swift
.foregroundColor(DS.Color.Text.secondary)
```

### Avoid hardcoded values

```swift
.padding(DS.Space.Inset.card)
```

### Reference intent

```swift
let subtitleColor = DS.Color.Text.tertiary
```

See [components documentation](docs/components.md) for implementation patterns and common mistakes.

## Contributing

Token additions must meet these criteria:

* **Used in multiple places** — patterns should exist in 3+ locations
* **Has semantic meaning** — encodes a UI role, not an arbitrary value
* **Cannot be composed** — existing tokens don't already solve the problem
* **Likely to evolve** — represents a systematic concern

## License

The source code in this repository is licensed under the MIT License.

Brand names, logos, product names, visual identity elements, screenshots, and case-study content are provided for demonstration purposes only and are not included in the MIT License.

