# Token Reference

Complete reference for all design tokens. Source of truth: `tokens/core/` and `tokens/semantic/`.

For architecture concepts see [Architecture](architecture.md). For usage patterns see [Components](components.md).

---

## Core tokens

Physical values without semantic meaning. Never consumed directly by components.

### Color

Full palette documentation in [color-system.md](color-system.md).

**Neutral scale:**

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `color.base.neutral.0` | #FFFFFF | `color.base.neutral.50` | #F5F7FA |
| `color.base.neutral.100` | #E8ECF2 | `color.base.neutral.200` | #D0D7E2 |
| `color.base.neutral.300` | #AAB4C3 | `color.base.neutral.400` | #7C8798 |
| `color.base.neutral.500` | #5C6675 | `color.base.neutral.600` | #434C59 |
| `color.base.neutral.700` | #2E3640 | `color.base.neutral.800` | #1C222A |
| `color.base.neutral.900` | #0F1318 | | |

**Alpha:**

| Token | Value |
|-------|-------|
| `color.alpha.white.5` | #FFFFFF0D |
| `color.alpha.white.10` | #FFFFFF1A |
| `color.alpha.white.20` | #FFFFFF33 |
| `color.alpha.white.40` | #FFFFFF66 |
| `color.alpha.white.60` | #FFFFFF99 |
| `color.alpha.black.40` | #00000066 |
| `color.alpha.black.60` | #00000099 |

**Special:** `color.special.white` #FFFFFF · `color.special.black` #000000

**Data series:** `color.data.series.1` #007AFF · `.2` #00F2FF · `.3` #00F5A0 · `.4` #FF9F0A

### Space

4pt grid scale:

| Token | Value | Token | Value | Token | Value |
|-------|-------|-------|-------|-------|-------|
| `space.0` | 0px | `space.4` | 4px | `space.8` | 8px |
| `space.12` | 12px | `space.16` | 16px | `space.20` | 20px |
| `space.24` | 24px | `space.32` | 32px | `space.40` | 40px |
| `space.48` | 48px | `space.64` | 64px | `space.80` | 80px |
| `space.96` | 96px | | | | |

### Typography

**Font families:** `typography.fontFamily.text` SF Pro Text · `typography.fontFamily.mono` SF Mono

**Font sizes:** `11` `12` `13` `15` `17` `20` `22` `28` `34` (px)

**Line heights:** `typography.lineHeight.120` 1.2 · `.130` 1.3 · `.140` 1.4

**Font weights:** `typography.fontWeight.400` · `.500` · `.600` · `.700`

**Letter spacing:** `typography.letterSpacing.0` 0em · `.1` 0.01em · `.2` 0.02em

### Size

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `size.12` | 12px | `size.16` | 16px |
| `size.20` | 20px | `size.24` | 24px |
| `size.28` | 28px | `size.32` | 32px |
| `size.36` | 36px | `size.40` | 40px |
| `size.44` | 44px | `size.48` | 48px |
| `size.56` | 56px | | |

### Radius

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `radius.0` | 0px | `radius.4` | 4px |
| `radius.6` | 6px | `radius.8` | 8px |
| `radius.10` | 10px | `radius.12` | 12px |
| `radius.14` | 14px | `radius.16` | 16px |
| `radius.18` | 18px | `radius.24` | 24px |
| `radius.32` | 32px | `radius.full` | 9999px |

### Stroke

`stroke.0` 0px · `stroke.1` 1px · `stroke.2` 2px · `stroke.3` 3px

### Border styles

`borderStyle.solid` · `borderStyle.dashed`

### Elevation (effects)

**Shadow:** `effects.shadow.1` — color #0000003D, offsetX 0, offsetY 2px, blur 6px, spread 0

**Highlight:** `effects.highlight.1` — color #FFFFFF14, offsetX 0, offsetY 1px, blur 0, spread 0

**Scrim:** `effects.scrim.modal` — #00000099

---

## Semantic tokens

Semantic tokens map core values to UI roles. These are what components consume.

### Color

#### Background

| Token | Resolves to | Value |
|-------|-------------|-------|
| `color.bg.canvas` | neutral.900 | #0F1318 |
| `color.bg.surface.base` | neutral.800 | #1C222A |
| `color.bg.surface.grouped` | neutral.700 | #2E3640 |
| `color.bg.surface.elevated` | neutral.700 | #2E3640 |
| `color.bg.surface.overlay` | neutral.600 | #434C59 |
| `color.bg.surface.modal` | neutral.800 | #1C222A |

#### Text

| Token | Resolves to | Value | Usage |
|-------|-------------|-------|-------|
| `color.text.primary` | neutral.0 | #FFFFFF | Headlines, main content |
| `color.text.secondary` | neutral.200 | #D0D7E2 | Body text, descriptions |
| `color.text.tertiary` | neutral.400 | #7C8798 | Metadata, timestamps |
| `color.text.disabled` | neutral.500 | #5C6675 | Unavailable states |
| `color.text.inverse` | special.black | #000000 | Text on light surfaces |

#### Icon

| Token | Resolves to |
|-------|-------------|
| `color.icon.primary` | → color.text.primary |
| `color.icon.secondary` | → color.text.secondary |
| `color.icon.tertiary` | → color.text.tertiary |
| `color.icon.disabled` | → color.text.disabled |
| `color.icon.inverse` | → color.text.inverse |

#### Border

| Token | Value | Usage |
|-------|-------|-------|
| `color.border.subtle` | alpha.white.5 | Hairline dividers |
| `color.border.default` | alpha.white.10 | Standard borders |
| `color.border.strong` | alpha.white.20 | Emphasized borders |
| `color.border.focus` | blue.500 #007AFF | Focus ring |
| `color.border.disabled` | alpha.white.5 | Disabled borders |

#### Interactive

| Token | Value | Usage |
|-------|-------|-------|
| `color.interactive.primary.default` | blue.500 #007AFF | Primary button bg |
| `color.interactive.primary.pressed` | blue.600 #005FCC | Primary pressed state |
| `color.interactive.primary.disabled` | neutral.600 | Disabled primary |
| `color.interactive.primary.text` | → text.inverse | Text on primary |
| `color.interactive.secondary.default` | alpha.white.5 | Secondary button bg |
| `color.interactive.secondary.pressed` | alpha.white.10 | Secondary pressed |
| `color.interactive.secondary.text` | → text.primary | Text on secondary |
| `color.interactive.destructive.default` | red.500 #FF453A | Destructive button bg |
| `color.interactive.destructive.pressed` | red.600 #D92D20 | Destructive pressed |
| `color.interactive.destructive.text` | → text.primary | Text on destructive |

#### Status

| Status | fg | bg | border |
|--------|----|----|--------|
| `success` | green.500 #34C759 | green.900 #072D12 | green.700 #1A7A32 |
| `warning` | amber.500 #FF9F0A | amber.900 #332002 | amber.700 #995F06 |
| `error` | red.500 #FF453A | red.900 #390C08 | red.700 #A32218 |

Full token paths: `color.status.{success|warning|error}.{fg|bg|border}`

#### Focus & Overlay

`color.focus.ring` → blue.500 #007AFF

`color.overlay.scrim` → alpha.black.60 #00000099

#### Data series

`color.data.series.1` #007AFF · `.2` #00F2FF · `.3` #00F5A0 · `.4` #FF9F0A

### Typography roles

Full documentation in [typography.md](typography.md).

| Role | Font | Size | Weight | LH |
|------|------|------|--------|----|
| `typography.role.largeTitle` | SF Pro Text | 34px | 600 | 1.2 |
| `typography.role.title1` | SF Pro Text | 28px | 600 | 1.2 |
| `typography.role.title2` | SF Pro Text | 22px | 600 | 1.2 |
| `typography.role.headline` | SF Pro Text | 17px | 600 | 1.2 |
| `typography.role.body` | SF Pro Text | 17px | 400 | 1.4 |
| `typography.role.bodyEmphasized` | SF Pro Text | 17px | 500 | 1.4 |
| `typography.role.callout` | SF Pro Text | 15px | 400 | 1.4 |
| `typography.role.subhead` | SF Pro Text | 13px | 400 | 1.4 |
| `typography.role.footnote` | SF Pro Text | 12px | 400 | 1.4 |
| `typography.role.caption` | SF Pro Text | 11px | 400 | 1.3 |
| `typography.role.label` | SF Pro Text | 13px | 500 | 1.2 |
| `typography.role.button` | SF Pro Text | 17px | 500 | 1.2 |
| `typography.role.buttonCompact` | SF Pro Text | 15px | 500 | 1.2 |
| `typography.role.numericMetric` | SF Mono | 20px | 600 | 1.2 |
| `typography.role.numericLabel` | SF Mono | 12px | 500 | 1.3 |

### Space

Full documentation in [spacing.md](spacing.md).

**Insets:** `space.inset.{xs 8 · sm 12 · md 16 · lg 24 · xl 32 · control 12 · card 16 · panel 24}`

**Stack:** `space.stack.{xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32}`

**Cluster:** `space.cluster.{xs 4 · sm 8 · md 12 · lg 16}`

**Section:** `space.section.{sm 24 · md 32 · lg 40}`

**Control:** `space.control.padding.x` 16px · `.y` 8px · `space.control.gap.sm` 8px · `.md` 12px

**Field:** `space.field.padding.x` 12px · `.y` 8px

**List:** `space.list.item.gap` 12px · `.item.padding.x` 16px · `.item.padding.y` 12px · `.section.gap` 24px

### Size

| Token | Value | Usage |
|-------|-------|-------|
| `size.hitArea.min` | 44px | iOS minimum tap target |
| `size.control.height.default` | 44px | Standard control height |
| `size.control.height.compact` | 36px | Dense layout control height |
| `size.control.height.lg` | 48px | Large control height |
| `size.field.height.default` | 44px | Standard input height |
| `size.field.height.lg` | 48px | Large input height |
| `size.icon.xs` | 12px | Tiny icons |
| `size.icon.sm` | 16px | Small icons |
| `size.icon.md` | 20px | Standard icons |
| `size.icon.lg` | 24px | Large icons |
| `size.icon.xl` | 32px | Extra large icons |
| `size.avatar.sm` | 28px | Small avatar |
| `size.avatar.md` | 36px | Medium avatar |
| `size.avatar.lg` | 44px | Large avatar |
| `size.divider.default` | 1px | Hairline divider |
| `size.divider.strong` | 2px | Strong divider |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.none` | 0px | Square corners |
| `radius.control` | 12px | Buttons, chips, inputs |
| `radius.field` | 12px | Form inputs |
| `radius.card` | 16px | Cards, containers |
| `radius.panel` | 24px | Sheets, floating panels |
| `radius.pill` | 9999px | Fully rounded |

### Stroke

| Token | Value | Usage |
|-------|-------|-------|
| `stroke.width.none` | 0px | No border |
| `stroke.width.hairline` | 1px | Separator lines |
| `stroke.width.default` | 1px | Standard borders |
| `stroke.width.strong` | 2px | Emphasis, focus ring |

### Border (semantic)

| Token | Width | Color |
|-------|-------|-------|
| `border.separator.default` | 1px | color.border.subtle |
| `border.separator.strong` | 1px | color.border.strong |
| `border.control.default` | 1px | color.border.default |
| `border.control.focused` | 1px | color.border.focus |
| `border.control.disabled` | 1px | color.border.disabled |
| `border.status.success` | 1px | color.status.success.border |
| `border.status.warning` | 1px | color.status.warning.border |
| `border.status.error` | 1px | color.status.error.border |
| `border.selection` | 2px | color.interactive.primary.default |
| `border.focus.ring` | 2px | color.focus.ring |

### Elevation (semantic)

Full documentation in [elevation.md](elevation.md).

`effects.shadow.surface.elevated` → effects.shadow.1

`effects.shadow.surface.floating` → effects.shadow.1

`effects.highlight.surface.elevated` → effects.highlight.1

`effects.highlight.surface.floating` → effects.highlight.1

`effects.overlay.scrim.modal` → effects.scrim.modal (#00000099)
