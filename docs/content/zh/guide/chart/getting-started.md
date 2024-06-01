---
title: 快速开始
---

# 快速开始

## 引入

Newcar 的图表模块可以通过 `@newcar/mod-chart` 包引入。

## 使用

`@newcar/mod-chart` 包导出的 `BarChart`、`LineChart`、`ScatterChart`、`BubbleChart` 等组件都是标准的 Newcar 组件，可以像使用其他 Newcar 组件一样使用。

## 示例

下面是一个简单的条形图示例：

```typescript
import { Color } from 'newcar'
import * as nc from 'newcar'
import { BarChart, ChartDataUnit, ChartUtil } from '@newcar/mod-chart'

// 省略部分代码

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

// 省略部分代码
```
