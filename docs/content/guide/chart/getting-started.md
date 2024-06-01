---
title: Getting Started
---

# Getting Started

## Import

The chart module can be imported through the `@newcar/mod-chart` package.

## Usage

The `BarChart`, `LineChart`, `ScatterChart`, `BubbleChart`, and other components exported by the `@newcar/mod-chart` package are standard Newcar components and can be used like other Newcar components.

## Example

Here is a simple bar chart example:

```typescript
import { Color } from 'newcar'
import * as nc from 'newcar'
import { BarChart, ChartDataUnit, ChartUtil } from '@newcar/mod-chart'

// Omitted code

const scene = new nc.Scene(
  new BarChart(
    {
      labels: ChartUtil.dateSequence(
        DateTime.fromISO('2021-01-01').setLocale('en-US'),
        Duration.fromObject({ months: 4 }),
        'month',
        1,
      ),
      datasets: [
        {
          label: 'Bar 1',
          data: ChartUtil.dataUnits([2, 5, -15, 14]),
          style: {
            backgroundColor: Color.parse('#66CCFF').withAlpha(0.2),
            borderColor: Color.parse('#66CCFF'),
            borderWidth: 1,
          },
        },
      ],
      style: {
        borderRadius: 5,
      },
    },
    {
      x: 50,
      y: 50,
      size: {
        width: 300,
        height: 300,
      },
      indexAxis: 'x',
    },
  ).animate(nc.create, 0, 5),
)

// Omitted code
```
