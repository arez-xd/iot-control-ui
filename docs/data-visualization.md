# Data Visualization

Color system and treatment guidelines for charts, graphs, and metric displays in dark UI.

## Core principle

Data colors are structurally separate from status colors. Charts use series colors without semantic encoding. A line going up or down isn't "good" or "bad" — the axis and values communicate that. Color encodes series identity, not value judgment.

## Series colors

Eight colors optimized for perceptual distinction in dark UI, colorblind-safe combinations, and no inherent meaning.

| Series | Hex | Hue | Usage |
|--------|-----|-----|-------|
| `1` | `#007AFF` | `Blue` | `Primary data, default series` |
| `2` | `#00F2FF` | `Cyan` | `Secondary data` |
| `3` | `#00F5A0` | `Green` | `Third series (no "positive" meaning)` |
| `4` | `#FF9F0A` | `Amber` | `Fourth series (no "warning" meaning)` |
| `5` | `#8B5CF6` | `Purple` | `Fifth series` |
| `6` | `#5CBFD6` | `Sky` | `Sixth series` |
| `7` | `#94A3B8` | `Gray` | `Neutral data, baseline` |
| `8` | `#FF453A` | `Red` | `Eighth series (no "negative" meaning)` |

**Selection criteria:**

* **Perceptual distinction** — Colors easily distinguished in charts with multiple series
* **Dark UI optimized** — Saturated hues visible against dark backgrounds
* **Colorblind safe** — Primary pairs (1-2, 3-4) distinguishable in deuteranopia/protanopia
* **No semantic encoding** — Red doesn't mean "bad," green doesn't mean "good"

**Order matters:** Use series 1-4 for most charts. Add 5-8 as needed. Avoid using all 8 unless necessary — too many series reduce clarity.

## Chart foundations

Supporting colors for grids, axes, and backgrounds.

`grid`: rgba(255,255,255,0.1) — Subtle gridlines, visible but don't compete with data  
`axis`: #64748B (neutral.500) — Axis labels, readable but not prominent  
`background`: #0A0B0D (canvas) or #16181D (surface) — Never pure white backgrounds

## Chart types

### Line charts

```swift
Chart {
  ForEach(revenueData) { point in
    LineMark(
      x: .value("Date", point.date),
      y: .value("Revenue", point.amount)
    )
    .foregroundStyle(DS.Color.Data.Series.one)
    .lineStyle(StrokeStyle(lineWidth: 2))
  }
}
.chartXAxis {
  AxisMarks { value in
    AxisGridLine().foregroundStyle(DS.Color.Data.grid)
    AxisValueLabel().foregroundStyle(DS.Color.Data.axis)
  }
}
```

Multiple series: Use series 1 (blue) for primary, series 2 (cyan) for secondary.

### Bar charts

```swift
Chart {
  ForEach(salesData) { item in
    BarMark(
      x: .value("Category", item.category),
      y: .value("Sales", item.amount)
    )
    .foregroundStyle(DS.Color.Data.Series.one)
    .cornerRadius(4)
  }
}
```

### Pie/Donut charts

Use series colors sequentially. Limit to 5 segments max — more becomes unreadable.

```swift
func seriesColor(for index: Int) -> Color {
  switch index {
  case 0: return DS.Color.Data.Series.one
  case 1: return DS.Color.Data.Series.two
  case 2: return DS.Color.Data.Series.three
  case 3: return DS.Color.Data.Series.four
  default: return DS.Color.Data.Series.five
  }
}
```

### Area charts

```swift
AreaMark(...)
  .foregroundStyle(
    LinearGradient(
      colors: [
        DS.Color.Data.Series.one.opacity(0.3),
        DS.Color.Data.Series.one.opacity(0.1)
      ],
      startPoint: .top,
      endPoint: .bottom
    )
  )
```

Use gradient fill (30% → 10% opacity) to avoid overwhelming the chart.

## Metric displays

Large numbers in dashboards use specialized treatment.

### Dashboard KPI

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  Text("$12.4M")
    .font(DS.Typography.Role.numericMetric())
    .foregroundColor(DS.Color.Text.metric)
  
  Text("REVENUE")
    .font(DS.Typography.Role.caption1())
    .foregroundColor(DS.Color.Text.metricUnit)
  
  HStack(spacing: 4) {
    Image(systemName: "arrow.up")
    Text("+12.3%")
  }
  .foregroundColor(DS.Color.Data.Series.one)
}
.padding(DS.Space.Inset.card)
.background(DS.Color.Background.surface)
.cornerRadius(DS.Radius.card)
```

**Typography:** `numericMetric` (SF Mono 34px) prevents layout shift with tabular figures  
**Color:** `text.metric` (brightest) for emphasis, series color for change indicator (not status color)

### Inline metric

```swift
HStack(spacing: DS.Space.Stack.xs) {
  Text("Total:")
    .font(DS.Typography.Role.body())
    .foregroundColor(DS.Color.Text.secondary)
  
  Text("$1,234.56")
    .font(DS.Typography.Role.numericValue())
    .foregroundColor(DS.Color.Text.primary)
}
```

### Sparkline

Minimal chart in constrained space. No axes, no labels. Just trend indication.

```swift
Chart {
  ForEach(data) { point in
    LineMark(...)
      .foregroundStyle(DS.Color.Data.Series.one)
      .lineStyle(StrokeStyle(lineWidth: 1.5))
  }
}
.chartXAxis(.hidden)
.chartYAxis(.hidden)
.frame(width: 60, height: 24)
```

## Color usage guidelines

### Don't encode "good" vs "bad"

```swift
// Wrong
let profitColor = profit > 0 ? DS.Color.Status.Success : DS.Color.Status.Error

// Correct
let profitColor = DS.Color.Data.Series.one
```

The sign (+/-) and axis communicate direction. Color identifies the series.

### Use consistent series assignment

```swift
revenue → Series.one (blue)
expenses → Series.two (cyan)
profit → Series.three (green)
```

Don't reassign colors based on data values. Keep mapping stable across views.

### Limit simultaneous series

**2-3 series:** Optimal readability  
**4-5 series:** Acceptable with legend  
**6+ series:** Consider splitting into multiple charts

### Provide legends

```swift
HStack(spacing: DS.Space.Stack.md) {
  HStack(spacing: DS.Space.Stack.xs) {
    Circle()
      .fill(DS.Color.Data.Series.one)
      .frame(width: 8, height: 8)
    Text("Revenue")
      .font(DS.Typography.Role.caption1())
  }
  
  HStack(spacing: DS.Space.Stack.xs) {
    Circle()
      .fill(DS.Color.Data.Series.two)
      .frame(width: 8, height: 8)
    Text("Expenses")
      .font(DS.Typography.Role.caption1())
  }
}
```

Always include legend for multi-series charts.

## Interactive states

### Hover/selection

```swift
.overlay {
  if isSelected {
    RoundedRectangle(cornerRadius: 4)
      .stroke(Color.white.opacity(0.2), lineWidth: 2)
  }
}
```

Subtle white outline. Don't change data color on hover — breaks semantic consistency.

### Tooltip

```swift
VStack(alignment: .leading, spacing: DS.Space.Stack.xs) {
  Text("Jan 15, 2024")
    .font(DS.Typography.Role.caption1())
    .foregroundColor(DS.Color.Text.tertiary)
  
  HStack(spacing: DS.Space.Stack.xs) {
    Circle()
      .fill(DS.Color.Data.Series.one)
      .frame(width: 6, height: 6)
    Text("Revenue: $12,345")
      .font(DS.Typography.Role.footnote())
  }
}
.padding(DS.Space.Inset.cell)
.background(DS.Color.Background.elevated)
.cornerRadius(DS.Radius.control)
.shadow(color: Color.black.opacity(0.5), radius: 8)
.overlay(
  RoundedRectangle(cornerRadius: DS.Radius.control)
    .stroke(Color.white.opacity(0.08), lineWidth: 1)
)
```

Use floating elevation for tooltips.

## Common mistakes

### Using status colors for data

```swift
// Wrong
let lineColor = value > target ? DS.Color.Status.Success : DS.Color.Status.Error

// Correct
let lineColor = DS.Color.Data.Series.one
```

Status colors carry semantic meaning. Data colors are neutral.

### Too many series

```swift
// Wrong - 8 series, unreadable
Chart { ForEach(0..<8) { ... } }

// Correct - split into focused views
Chart { /* Revenue-related series */ }
Chart { /* Expense-related series */ }
```

### Inconsistent color assignment

```swift
// Wrong - color changes based on value
if revenue > lastMonth {
  color = DS.Color.Data.Series.three
} else {
  color = DS.Color.Data.Series.eight
}

// Correct - stable assignment
let revenueColor = DS.Color.Data.Series.one
```

### Missing gridlines

```swift
// Wrong - no reference lines
Chart { ... }

// Correct - subtle grid
.chartXAxis {
  AxisMarks {
    AxisGridLine().foregroundStyle(DS.Color.Data.grid)
  }
}
```

## Accessibility

### Colorblind considerations

Primary series pairs are distinguishable:
* Series 1 (blue) + Series 2 (cyan) = distinguishable in all CVD types
* Series 3 (green) + Series 4 (amber) = distinguishable in deuteranopia/protanopia

Avoid relying on color alone. Use labels, legends, and different line styles when possible.

### High contrast

For users with reduced vision, increase line weights:

```swift
@Environment(\.accessibilityDifferentiateWithoutColor) var highContrast

var lineWidth: CGFloat {
  highContrast ? 3 : 2
}
```

### VoiceOver

Provide accessible labels for chart data:

```swift
.accessibilityLabel("Revenue: $12,345 on January 15")
.accessibilityValue("Up 12.3% from last month")
```

## React Native implementation

```typescript
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
import { tokens } from '@sibach/tokens';

<VictoryChart>
  <VictoryAxis
    style={{
      grid: { stroke: tokens.color.data.grid },
      tickLabels: { fill: tokens.color.data.axis }
    }}
  />
  <VictoryLine
    data={revenueData}
    style={{
      data: { stroke: tokens.color.data.series[1] }
    }}
  />
</VictoryChart>
```

## Performance notes

**Chart rendering:**

* Limit data points: 100-200 for smooth interaction
* Use downsampling for larger datasets
* Render off-screen, cache when possible

**Animation:**

```swift
// Smooth chart updates
.animation(.easeInOut(duration: 0.3), value: data)
```

Keep animations subtle. Data clarity > visual effects.

## Why data ≠ status

Early versions encoded "good" (green) and "bad" (red) in charts. This broke:

**Colorblind users:** Can't distinguish red/green  
**Cultural contexts:** Red means different things globally  
**Value-neutral data:** Revenue going up/down isn't inherently good/bad

**Solution:** Separate palettes. Data colors have no meaning. Status colors have explicit meaning.

**Result:** Charts work universally, status indicators remain clear.

See [Color System](color-system.md) for series color rationale and [Components](components.md) for implementation patterns.
