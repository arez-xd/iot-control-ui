# Token Reference

Complete reference for all design tokens in the Sibach system.

This document lists every token available in both core and semantic layers. For architectural concepts, see [Architecture](architecture.md). For usage patterns, see [Components](components.md).

## Core tokens

Core tokens define physical values without semantic meaning. They are never consumed directly by components.

### Color

Complete color documentation including all hue palettes (neutral, blue, cyan, green, amber, red, purple) and alpha layers is in [color-system.md](color-system.md).

### Space

4pt grid scale:

| Token | Value | Token | Value | Token | Value |
|-------|-------|-------|-------|-------|-------|
| `0` | 0px | `1` | 4px | `2` | 8px |
| `3` | 12px | `4` | 16px | `5` | 20px |
| `6` | 24px | `7` | 32px | `8` | 40px |
| `9` | 48px | `10` | 64px | `11` | 80px |

All spacing is a multiple of 4px, aligning with iOS point system.

### Typography foundations

**Font families:**  
`text`: SF Pro Text, -apple-system, sans-serif  
`mono`: SF Mono, SFMono-Regular, monospace

**Font sizes:**  
`xs`: 11px · `sm`: 13px · `md`: 15px · `lg`: 17px · `xl`: 20px · `2xl`: 24px · `3xl`: 28px · `4xl`: 34px

**Line heights:**  
`ui`: 1.2 (tight for UI) · `body`: 1.4 (reading) · `relaxed`: 1.6 (long-form)

**Font weights:**  
`regular`: 400 · `medium`: 500 · `semibold`: 600 · `bold`: 700

**Letter spacing:**  
`tight`: -0.01em · `normal`: 0 · `wide`: 0.02em

### Size

**Hit areas:**  
`min`: 44px (iOS accessibility minimum)

**Control heights:**  
`default`: 44px (standard) · `compact`: 36px (dense layouts)

**Icons:**  
`xs`: 12px · `sm`: 16px · `md`: 20px · `lg`: 24px · `xl`: 32px

**Avatars:**  
`sm`: 28px · `md`: 36px · `lg`: 44px

**Other:**  
`chip.height`: 28px · `divider.hairline`: 1px

### Radius

`none`: 0px · `xs`: 6px · `sm`: 10px · `control`: 12px · `md`: 14px · `card`: 16px · `lg`: 18px · `xl`: 24px · `2xl`: 32px · `full`: 9999px

### Border & Stroke

**Border widths:**  
`none`: 0px · `thin`: 1px · `medium`: 2px · `thick`: 3px

**Stroke widths:**  
`hairline`: 1px · `default`: 1px · `strong`: 2px

**Border styles:**  
`solid` · `dashed`

### Elevation

**Shadow (floating):**  
color: rgba(0,0,0,0.5) · offset: 0, 0 · blur: 24 · spread: -2

**Highlight (floating):**  
color: rgba(255,255,255,0.08) · offset: 0, 0 · blur: 0 · spread: 1

**Scrim (modal):**  
color: rgba(0,0,0,0.6)

## Semantic tokens

Semantic tokens map core values to UI roles. These are what components consume.

### Color

**Background:**  
`canvas`: #0A0B0D (screen) · `surface`: #16181D (cards) · `grouped`: #16181D · `elevated`: #16181D (modals)

**Text:**

| Role | Hex | Usage |
|------|-----|-------|
| `primary` | #F2F4F7 | Headlines, main content |
| `secondary` | #CBD5E1 | Body text, descriptions |
| `tertiary` | #64748B | Metadata, timestamps |
| `disabled` | #475569 | Unavailable states |
| `tint` | #007AFF | Links, interactive text |
| `destructive` | #FF453A | Delete, remove actions |
| `success` | #00F5A0 | Success messaging |
| `warning` | #FF9F0A | Warning messaging |
| `info` | #00F2FF | Info messaging |
| `metric` | #F8FAFC | Large dashboard numbers |
| `metricUnit` | #007AFF | Metric labels |

**Icons:**  
`primary`: #E4E7EC · `secondary`: #94A3B8 · `tertiary`: #475569 · `tint`: #007AFF · `destructive`: #FF453A

**Separators:**  
`default`: rgba(255,255,255,0.1) · `strong`: rgba(255,255,255,0.15)

**Controls:**

| Type | Background | Pressed | Text | Border |
|------|------------|---------|------|--------|
| Primary | #007AFF | #0068D9 | #FFFFFF | — |
| Secondary | rgba(255,255,255,0.05) | rgba(255,255,255,0.1) | #F2F4F7 | rgba(255,255,255,0.1) |
| Destructive | #FF453A | #D93A31 | #FFFFFF | — |
| Disabled | rgba(255,255,255,0.05) | — | #475569 | — |

**Fields:**  
`bg`: rgba(255,255,255,0.05) · `border`: rgba(255,255,255,0.1) · `borderFocused`: #007AFF · `text`: #F2F4F7 · `placeholder`: #64748B

**Status (3-part system):**

| Status | Foreground | Surface | Border |
|--------|------------|---------|--------|
| Success | #00F5A0 | #006644 | #00AA6F |
| Warning | #FF9F0A | #664004 | #B26F07 |
| Error | #FF453A | #661C17 | #B23029 |
| Info | #00F2FF | #00858C | #00A9B2 |

**Data visualization:**  
Series (no semantic meaning): `1`: #007AFF · `2`: #00F2FF · `3`: #00F5A0 · `4`: #FF9F0A · `5`: #8B5CF6 · `6`: #5CBFD6 · `7`: #94A3B8 · `8`: #FF453A  
Chart foundations: `grid`: rgba(255,255,255,0.1) · `axis`: #64748B

**Overlay:**  
`scrim`: rgba(0,0,0,0.6)

### Typography roles

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| `largeTitle` | 34px | Bold (700) | 1.2 | Screen titles |
| `title1` | 28px | Semibold (600) | 1.2 | Section headers |
| `title2` | 24px | Semibold (600) | 1.2 | Subsection headers |
| `title3` | 20px | Semibold (600) | 1.2 | Card headers |
| `headline` | 17px | Semibold (600) | 1.2 | List headers |
| `body` | 15px | Regular (400) | 1.4 | Primary reading |
| `callout` | 15px | Medium (500) | 1.2 | Emphasized body |
| `subheadline` | 13px | Regular (400) | 1.2 | Supporting text |
| `footnote` | 13px | Medium (500) | 1.2 | Captions |
| `caption1` | 11px | Medium (500) | 1.2 | Tiny labels |
| `caption2` | 11px | Regular (400) | 1.2 | Metadata |
| `labelPrimary` | 13px | Medium (500) | 1.2 | Button labels |
| `labelSecondary` | 11px | Medium (500) | 1.2 | Small labels |
| `numericMetric` | 34px | Semibold (600) | 1.2 | Dashboard KPIs (SF Mono) |
| `numericValue` | 20px | Medium (500) | 1.2 | Inline data (SF Mono) |

All roles use SF Pro Text except numeric roles which use SF Mono for tabular figures.

### Space

**Insets (container padding):**  
`screen`: 24px (full-screen) · `sheet`: 24px (modals) · `card`: 20px (cards) · `cell`: 16px (list rows)

**Stack (vertical rhythm):**  
`xs`: 8px (tight) · `sm`: 12px (related) · `md`: 16px (sections) · `lg`: 20px (boundaries)

**List:**  
`rowGap`: 12px · `sectionGap`: 24px

**Control:**  
`paddingX`: 16px · `paddingY`: 12px · `gap`: 8px (icon-to-label)

**Chip:**  
`paddingX`: 16px · `paddingY`: 8px · `gap`: 8px

**Icon:**  
`sm`: 16px · `md`: 20px · `lg`: 24px

### Size

**Hit area:** `min`: 44px

**Control:** `minHeight`: 44px · `compactHeight`: 36px

**Button:** `minHeight`: 44px · `compactHeight`: 36px · `iconOnly.minSize`: 44px

**Field:** `minHeight`: 44px · `compactHeight`: 36px

**Chip:** `height`: 28px · `minHeight`: 28px

**Icon:** `xs`: 12px · `sm`: 16px · `md`: 20px · `lg`: 24px · `xl`: 32px

**Avatar:** `sm`: 28px · `md`: 36px · `lg`: 44px

**Divider:** `hairline`: 1px

### Radius

`control`: 12px (buttons, chips) · `card`: 16px (containers) · `panel`: 18px (floating panels) · `sheet`: 24px (modals) · `pill`: 9999px (fully rounded)

### Stroke

**Width:**  
`hairline`: 1px · `default`: 1px · `strong`: 2px

**Separator:**  
`default`: 1px / rgba(255,255,255,0.1) · `strong`: 1px / rgba(255,255,255,0.15)

**Control:**
