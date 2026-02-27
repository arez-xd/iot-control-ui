# Architecture

How the token system is structured, built, and consumed across platforms.

## System structure

```
sibach-design-system/
├── tokens/
│   ├── core/                 ← Source of truth (JSON)
│   │   ├── color.json
│   │   ├── space.json
│   │   ├── typography.json
│   │   ├── size.json
│   │   ├── radius.json
│   │   ├── border.json
│   │   ├── stroke.json
│   │   └── elevation.json
│   │
│   ├── semantic/             ← Semantic mappings (JSON)
│   │   ├── color.json
│   │   ├── typography.json
│   │   ├── space.json
│   │   ├── size.json
│   │   ├── radius.json
│   │   ├── stroke.json
│   │   ├── border.json
│   │   └── elevation.json
│   │
│   └── build/                ← Auto-generated (never edit)
│       ├── css/
│       │   └── tokens.css
│       ├── ts/
│       │   └── tokens.ts
│       └── ios/
│           └── Tokens.swift
│
├── docs/                     ← Documentation
└── figma/                    ← Source tooling
```

## Two-layer architecture

### Core layer

Core tokens define physical values without semantic meaning. A core token doesn't "know" it will be used for errors, success, or anything else. It simply exists as a value in the spectrum.

```json
{
  "core": {
    "color": {
      "base": {
        "red": {
          "500": "#FF453A"
        },
        "blue": {
          "500": "#007AFF"
        }
      }
    },
    "space": {
      "5": "20px"
    }
  }
}
```

**Never consumed directly** — Components should never reference `core.color.red.500`.

### Semantic layer

Semantic tokens map intention to values by referencing core tokens. They answer "what is this element's role?" not "what color should this be?"

```json
{
  "semantic": {
    "color": {
      "text": {
        "primary": "{core.color.base.neutral.100}",
        "destructive": "{core.color.base.red.500}"
      },
      "control": {
        "primary": {
          "bg": "{core.color.base.blue.500}"
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

**Always consumed** — Components reference `semantic.color.text.primary`, never core tokens.

### Why this separation matters

**Single source of truth:** Changing a core value updates all semantic references automatically:

```json
// Change once
"core.color.base.blue.500": "#007AFF" → "#0066CC"

// All references update
"control.primary.bg" → new blue
"text.tint" → new blue
```

**Flexible remapping:** Semantic tokens can be remapped without touching components:

```json
// Default
"text.destructive": "{core.red.500}"

// Accessibility mode
"text.destructive": "{core.amber.500}"
```

All destructive text updates automatically. No component changes required.

**Independent contexts:** The same core value serves different purposes:

```json
"control.primary.bg": "{core.blue.500}",
"data.series.1": "{core.blue.500}"
```

Changing button colors doesn't affect chart colors.

## Build system

Tokens are stored as JSON and auto-generated into platform-specific formats using [Style Dictionary](https://amzn.github.io/style-dictionary/).

### Build process

```bash
# Generate all platforms
npm run build:tokens

# Platform-specific
npm run build:tokens:ios
npm run build:tokens:css
npm run build:tokens:ts

# Watch mode for development
npm run watch:tokens
```

**What happens during build:**

1. Read core JSON files
2. Resolve semantic token references (`{core.color.red.500}` → `#FF453A`)
3. Transform into platform-specific formats
4. Write to `/build` directory

**Important:** Never edit generated files. All changes go in source JSON, then rebuild.

## Platform outputs

### iOS (Swift)

Generated as nested enums with type-safe access:

```swift
import UIKit
import SwiftUI

public enum DS {
    // MARK: - Color
    public enum Color {
        // MARK: Background
        public enum Background {
            public static let canvas = UIColor(hex: "#0A0B0D")
            public static let surface = UIColor(hex: "#16181D")
            public static let elevated = UIColor(hex: "#16181D")
        }
        
        // MARK: Text
        public enum Text {
            public static let primary = UIColor(hex: "#F2F4F7")
            public static let secondary = UIColor(hex: "#CBD5E1")
            public static let tertiary = UIColor(hex: "#64748B")
            public static let disabled = UIColor(hex: "#475569")
            
            public static let tint = UIColor(hex: "#007AFF")
            public static let destructive = UIColor(hex: "#FF453A")
        }
        
        // MARK: Control
        public enum Control {
            public enum Primary {
                public static let background = UIColor(hex: "#007AFF")
                public static let pressed = UIColor(hex: "#0068D9")
                public static let text = UIColor.white
            }
            
            public enum Secondary {
                public static let background = UIColor(hex: "#FFFFFF", alpha: 0.05)
                public static let pressed = UIColor(hex: "#FFFFFF", alpha: 0.1)
                public static let text = UIColor(hex: "#F2F4F7")
                public static let border = UIColor(hex: "#FFFFFF", alpha: 0.1)
            }
        }
    }
    
    // MARK: - Spacing
    public enum Space {
        public enum Inset {
            public static let screen: CGFloat = 24
            public static let sheet: CGFloat = 24
            public static let card: CGFloat = 20
            public static let cell: CGFloat = 16
        }
        
        public enum Stack {
            public static let xs: CGFloat = 8
            public static let sm: CGFloat = 12
            public static let md: CGFloat = 16
            public static let lg: CGFloat = 20
        }
    }
    
    // MARK: - Typography
    public enum Typography {
        public enum Role {
            public static func headline() -> Font {
                Font.custom("SF Pro Text", size: 17)
                    .weight(.semibold)
            }
            
            public static func body() -> Font {
                Font.custom("SF Pro Text", size: 15)
                    .weight(.regular)
            }
        }
    }
    
    // MARK: - Radius
    public enum Radius {
        public static let control: CGFloat = 12
        public static let card: CGFloat = 16
        public static let sheet: CGFloat = 24
        public static let pill: CGFloat = 9999
    }
}
```

**Usage:**

```swift
// UIKit
label.textColor = DS.Color.Text.primary
button.backgroundColor = DS.Color.Control.Primary.background
view.layer.cornerRadius = DS.Radius.card

// SwiftUI
Text("Hello")
    .foregroundColor(Color(DS.Color.Text.primary))
    .font(DS.Typography.Role.headline())
    .padding(DS.Space.Inset.card)
```

### Web (CSS variables)

Generated as CSS custom properties:

```css
:root {
  /* Background */
  --color-bg-canvas: #0A0B0D;
  --color-bg-surface: #16181D;
  --color-bg-elevated: #16181D;
  
  /* Text */
  --color-text-primary: #F2F4F7;
  --color-text-secondary: #CBD5E1;
  --color-text-tertiary: #64748B;
  --color-text-disabled: #475569;
  --color-text-tint: #007AFF;
  --color-text-destructive: #FF453A;
  
  /* Controls */
  --color-control-primary-bg: #007AFF;
  --color-control-primary-pressed: #0068D9;
  --color-control-primary-text: #FFFFFF;
  
  /* Spacing */
  --space-inset-screen: 24px;
  --space-inset-card: 20px;
  --space-stack-sm: 12px;
  --space-stack-md: 16px;
  
  /* Radius */
  --radius-control: 12px;
  --radius-card: 16px;
  --radius-sheet: 24px;
}
```

**Usage:**

```css
.card {
  background: var(--color-bg-surface);
  padding: var(--space-inset-card);
  border-radius: var(--radius-card);
}

.button-primary {
  background: var(--color-control-primary-bg);
  color: var(--color-control-primary-text);
}

.button-primary:active {
  background: var(--color-control-primary-pressed);
}
```

### TypeScript

Generated as typed object:

```typescript
export const tokens = {
  color: {
    bg: {
      canvas: '#0A0B0D',
      surface: '#16181D',
      elevated: '#16181D'
    },
    text: {
      primary: '#F2F4F7',
      secondary: '#CBD5E1',
      tertiary: '#64748B',
      disabled: '#475569',
      tint: '#007AFF',
      destructive: '#FF453A'
    },
    control: {
      primary: {
        bg: '#007AFF',
        pressed: '#0068D9',
        text: '#FFFFFF'
      },
      secondary: {
        bg: 'rgba(255, 255, 255, 0.05)',
        pressed: 'rgba(255, 255, 255, 0.1)',
        text: '#F2F4F7',
        border: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  space: {
    inset: {
      screen: '24px',
      card: '20px',
      cell: '16px'
    },
    stack: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '20px'
    }
  },
  radius: {
    control: '12px',
    card: '16px',
    sheet: '24px',
    pill: '9999px'
  }
} as const;

// Type inference
export type TokenColor = typeof tokens.color;
export type TokenSpace = typeof tokens.space;
```

**Usage:**

```typescript
import { tokens } from '@sibach/tokens';

const buttonStyle = {
  backgroundColor: tokens.color.control.primary.bg,
  color: tokens.color.control.primary.text,
  padding: `${tokens.space.stack.sm} ${tokens.space.inset.card}`,
  borderRadius: tokens.radius.control
};

// Type-safe access
const textColor: string = tokens.color.text.primary;
```

## Token reference resolution

Semantic tokens reference core via `{}` syntax:

```json
{
  "semantic": {
    "color": {
      "text": {
        "primary": "{core.color.base.neutral.100}"
      }
    }
  }
}
```

**Build system resolves this to:**

```json
{
  "color": {
    "text": {
      "primary": "#F2F4F7"
    }
  }
}
```

**Benefits:**

* Change `neutral.100` once, all references update
* Semantic layer stays clean and intentional
* Easy to see dependencies

## File organization

### Core tokens (`/tokens/core`)

Each file defines a category of physical values:

```
core/
├── color.json        ← Hue palettes, alpha layers
├── space.json        ← 4pt grid scale
├── typography.json   ← Font families, sizes, weights
├── size.json         ← Control heights, icon sizes
├── radius.json       ← Base corner radii
├── border.json       ← Border widths and styles
├── stroke.json       ← Stroke widths
└── elevation.json    ← Shadow and highlight definitions
```

Core files define "what exists" without opinion on usage.

### Semantic tokens (`/tokens/semantic`)

Each file maps roles to core values:

```
semantic/
├── color.json        ← Text, BG, controls, status
├── typography.json   ← iOS text roles
├── space.json        ← Inset, stack, list spacing
├── size.json         ← Button heights, icon sizes
├── radius.json       ← Control, card, sheet radii
├── stroke.json       ← Separators, borders, selection
├── border.json       ← Border semantic roles
└── elevation.json    ← Floating, modal elevation
```

Semantic files answer "how is this used?"

## Naming conventions

### Core layer

Pattern: `{category}.{subcategory}.{value}`

```json
"color.base.neutral.100"
"space.5"
"typography.fontSize.md"
"radius.card"
```

No semantic meaning. Just spectrum definition.

### Semantic layer

Pattern: `{category}.{role}.{property}`

```json
"color.text.primary"
"color.control.primary.bg"
"space.inset.card"
"typography.role.headline"
```

Encodes purpose, not appearance.

## CI/CD integration

Tokens auto-generate on every commit via GitHub Actions:

```yaml
name: Build Tokens
on:
  push:
    paths:
      - 'tokens/core/**'
      - 'tokens/semantic/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build:tokens
      - run: npm run test:tokens
      - uses: actions/upload-artifact@v3
        with:
          name: built-tokens
          path: tokens/build/
```

**Process:**

1. Change JSON in `/tokens/core` or `/tokens/semantic`
2. Commit to repo
3. CI runs build
4. Generated files committed back (or uploaded as artifacts)
5. Platform teams pull latest

## Versioning

**Semantic versioning:** `MAJOR.MINOR.PATCH`

**MAJOR:** Breaking changes
* Token removal
* Structural reorganization
* Changed token names

**MINOR:** Non-breaking additions
* New tokens
* New token categories

**PATCH:** Value adjustments
* Color tweaks
* Spacing refinements
* Bug fixes

**Current version:** `2.1.0`

## Performance

### Build time

Typical token build: ~500ms

* JSON parsing: 50ms
* Reference resolution: 150ms
* Platform transformation: 200ms
* File writing: 100ms

Fast enough for watch mode, CI, and local development.

### Runtime performance

**iOS:** Zero runtime cost. Tokens are constants compiled into binary.

**Web:** CSS variables have negligible lookup cost (~0.1ms per access). Cached by browser.

**TypeScript:** Tree-shakeable. Unused tokens eliminated in production bundle.

## Testing

### Token validation

```bash
npm run test:tokens
```

Checks:

* Valid JSON syntax
* All references resolve
* No circular dependencies
* Semantic tokens only reference core
* Color contrast ratios meet WCAG AA
* No duplicate values (potential consolidation opportunity)

### Visual regression

```bash
npm run test:visual
```

Renders components with tokens, compares to baseline screenshots. Catches unintended visual changes from token updates.
