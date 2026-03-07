# Governance

How to propose tokens, contribute changes, and maintain the system over time.

## Proposing new tokens

### Before proposing

Ask yourself:

**Can I compose existing tokens?**

```swift
// Don't need new token if this works
VStack(spacing: DS.Space.Stack.sm + DS.Space.Stack.xs)
```

**Is this used in multiple places?**  
One-off values don't belong. Pattern should exist in 3+ places.

**Does it have semantic meaning?**  
"Card padding" ✅ (semantic role)  
"Exactly 19px" ❌ (arbitrary value)

**Will it likely evolve?**  
If yes → systematize it  
If no → hardcode it with comment

### Proposal process

**1. Open GitHub issue**

Use template at `.github/ISSUE_TEMPLATE/token-proposal.md`:

```markdown
## Proposed Token

Name: `space.inset.modal`
Value: `32px`
Category: Spacing

## Use Cases

1. Modal sheet interior padding
2. Bottom sheet content padding
3. Full-screen overlay insets

## Rationale

Current `space.inset.card` (20px) feels cramped in modal context.
Modals need more breathing room. 24px (screen inset) is too tight.
32px hits the sweet spot.

## Impact

- 3 existing components would adopt this
- Reduces hardcoded 32px values in codebase
- Sets standard for future modal patterns
```

**2. Discussion in #design-system**

Tag @design-systems team. Expect clarifying questions, alternative solutions, and timeline estimate.

**3. Submit PR**

Once approved:
* JSON changes (core or semantic)
* Documentation updates
* Migration guide (if breaking change)
* Examples/screenshots

**4. Review & merge**

* Design system team reviews within 2 business days
* Requires: 1 engineer + 1 designer approval
* Merge triggers CI build
* New tokens available in next release

## Token addition criteria

**Add token when:**
* Pattern appears 3+ times
* Has clear semantic meaning
* Cannot be composed from existing tokens
* Represents systematic concern

**Don't add token for:**
* One-off values
* Experimental patterns (not proven yet)
* Can be composed from existing tokens
* Arbitrary aesthetic preference

### Examples

**Should this be a token?**

**Scenario 1: Status pill needs 14px radius**

✅ **ADD TOKEN**

Why:
* Used in 3 places (status pills, badges, tags)
* Semantic role: "small emphasis elements"
* Falls between control (12px) and card (16px) — fills gap
* Will be reused in future badge-like components

Proposal: `radius.badge: 14px`

**Scenario 2: One button needs 18px padding**

❌ **DON'T ADD TOKEN**

Why:
* Only used once
* No semantic meaning
* Composition works: 16px + 2px custom for this edge case
* Doesn't represent systematic pattern

Solution: Hardcode with comment explaining why

## Token modifications

### Non-breaking changes

Value adjustments within semantic constraints:

```json
// Safe to change
"text.secondary": "#CBD5E1" → "#C0C7D1"
```

No component code changes required. Visual refinement only.

Process:
1. PR with JSON change
2. Visual regression tests run automatically
3. Review screenshots in PR
4. Merge

### Breaking changes

Removals or structural reorganization:

```json
// Breaking
"control.primaryBg" → "control.primary.bg"  // Renamed
"space.cardInset" → deleted                  // Removed
```

Required:
1. Deprecation notice (1 version before removal)
2. Migration guide with find-and-replace patterns
3. Codemods if possible (automated migration)
4. Communication in #design-system + email

Timeline:
* Mark deprecated in v2.1
* Allow 2 sprint cycles for migration
* Remove in v2.2 (minor bump, not patch)

## Deprecation process

### Step 1: Mark as deprecated

Add comment in JSON:

```json
{
  "space": {
    "cardPadding": "20px",  // DEPRECATED: Use space.inset.card (remove in v2.2)
    "inset": {
      "card": "20px"
    }
  }
}
```

Update documentation with deprecation notice.

### Step 2: Migration guide

Create guide in `/docs/migrations/`:

```markdown
# Migrating from v2.0 to v2.1

## Deprecated Tokens

### space.cardPadding → space.inset.card

iOS:
.padding(DS.Space.cardPadding) → .padding(DS.Space.Inset.card)

React Native:
padding: tokens.space.cardPadding → padding: tokens.space.inset.card

Timeline:
- v2.1 (current): Both work, deprecation warnings
- v2.2 (Feb 2024): cardPadding removed
```

### Step 3: Communication

Slack announcement:

```
📢 Token Deprecation Notice

`space.cardPadding` deprecated in favor of `space.inset.card`

Migration: See docs/migrations/v2.0-to-v2.1.md
Timeline: Removal in v2.2 (2 sprints)
Questions: #design-system or office hours Thu 2pm
```

Email same message to wider audience.

### Step 4: Removal

After 2 sprint cycles:
1. Remove from JSON
2. Rebuild tokens
3. Bump version to v2.2
4. Update changelog

## Versioning

Semantic versioning: `MAJOR.MINOR.PATCH`

**MAJOR (breaking changes):**
* Token removal
* Structural reorganization
* Changed token names

Example: `2.1.0` → `3.0.0`

**MINOR (non-breaking additions):**
* New tokens
* New token categories
* New semantic roles

Example: `2.0.0` → `2.1.0`

**PATCH (refinements):**
* Color adjustments
* Spacing tweaks
* Bug fixes

Example: `2.0.1` → `2.0.2`

Current version: **2.1.0**

## Release process

**1. Prepare release:**

```bash
npm version minor  # or major/patch
npm run changelog
npm run build:tokens
npm run test
```

**2. Review changes:**

```bash
git diff tokens/build/
```

Check generated code looks correct.

**3. Tag & push:**

```bash
git tag v2.1.0
git push origin main --tags
```

**4. Publish:**

```bash
npm publish
# or
gh release create v2.1.0
```

**5. Communicate:**

Slack:

```
🎉 Design Tokens v2.1.0 Released

What's new:
- New semantic spacing roles for modals
- Refined status color contrast
- Added data visualization grid tokens

Update: npm update @sibach/tokens
Docs: [link]
Changelog: [link]
```

Email same announcement to wider audience.

## Decision authority

**Token additions:**  
Design System Team has final say on whether token should be added, naming, and categorization.

Rationale: Maintains systematic consistency.

**Token values:**  
Product Design owns core color palettes, spacing scale, typography scale.

Engineering can propose but not unilaterally change.

Rationale: Visual consistency is design responsibility.

**Platform implementation:**  
Platform engineers decide generated code structure, platform-specific optimizations, build tooling.

Rationale: Technical implementation decisions.

## When to deviate from system

Deviations are acceptable when:

**Third-party SDK constraints:**

```swift
// Stripe SDK requires 40px, can't use our 44px
.frame(height: 40)  // Document exception
```

**Micro-interactions:**

```swift
// Animation timing is feel-based, not systematic
