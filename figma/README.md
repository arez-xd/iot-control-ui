# Figma Integration

The token system is mirrored in Figma using Variables for design-code parity.

## Structure

**Primitive variables (core tokens):**  
Physical values without semantic meaning. Design-system internal.

Examples: `color/base/neutral/100`, `space/5`, `typography/fontSize/md`

**Semantic variables (semantic tokens):**  
UI roles consumed by components.

Examples: `color/text/primary`, `space/inset/card`, `typography/role/headline`

**Components reference semantic variables only,** never primitive variables.

## Naming convention

Variable names match token paths for parity between design and code:

**Token path:**  
`color.text.primary` → `#F2F4F7`

**Figma variable:**  
`color/text/primary` → `#F2F4F7`

Forward slashes in Figma match dots in code. Values are identical.

## Mapping

| Token Layer | Figma Variable | Usage |
|-------------|----------------|-------|
| Core | Primitive collection | Design-system internal |
| Semantic | Semantic collection | Applied to components |

**Workflow:**

1. Tokens defined in this repository (JSON)
2. Generated code for iOS/React Native
3. Mirrored as Figma variables
4. Applied to Figma components

## Source of truth

**This repository is the single source of truth.** Figma files mirror and derive from it.

Changes flow: JSON → Generated code → Figma variables

Never edit Figma variables directly. Propose changes via GitHub issues, update JSON, regenerate.

## Synchronization

Figma variables are manually synced from JSON tokens. No automated pipeline currently exists.

**Process:**

1. JSON tokens updated in repository
2. Design system team syncs to Figma
3. Figma components updated to use new variables

**Frequency:** Synced with each token release (every 2-4 weeks).

## Using variables in Figma

**Text color:**  
Select text → Apply `color/text/primary` variable

**Background fill:**  
Select layer → Apply `color/bg/surface` variable

**Spacing (Auto Layout):**  
Set gap to `space/inset/card` variable

**Corner radius:**  
Set radius to `radius/card` variable

**Components should only reference semantic variables.** If a primitive variable is needed, propose a new semantic mapping.

## Limitations

**What's mirrored:**  
Colors, spacing values, border radius, typography sizes

**What's not mirrored:**  
Elevation (shadows/highlights), complex gradients, platform-specific implementations

These are documented in [Elevation](../docs/elevation.md) and implemented in code.

## Questions

For token changes, see [Governance](../docs/governance.md).
