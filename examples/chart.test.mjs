import { DateTime, Duration } from 'luxon'
import { Color } from 'newcar'
import * as nc from 'newcar'
import { BarChart, BubbleChart, ChartDataUnit, ChartUtil, LineChart, MixedChart } from '@newcar/mod-chart'

await nc.useFont('default.ttf')

const engine = await new nc.CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(600, 600)
const scene = new nc.Scene(
  new MixedChart(
    [
      {
        Chart: LineChart,
        data: {
          labels: ChartUtil.dateSequence(
            DateTime.fromISO('2021-02-01').setLocale('en-US'),
            Duration.fromObject({ months: 3.5 }),
            'month',
            0.5,
          ),
          datasets: [
            {
              label: 'Line 1',
              data: ChartUtil.dataUnits([2, 5, -15, 14, 2, 5, 3]),
              style: {
                backgroundColor: Color.parse('#66CCFF').withAlpha(0.2),
                borderColor: Color.parse('#66CCFF'),
              },
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      {
        Chart: BarChart,
        data: {
          labels: ChartUtil.dateSequence(
            DateTime.fromISO('2021-02-01').setLocale('en-US'),
            Duration.fromObject({ months: 4 }),
            'month',
            1,
          ),
          datasets: [
            {
              label: 'Bar 1',
              data: ChartUtil.dataUnits([-14, 5, -4, 18]),
              style: {
                backgroundColor: Color.parse('#FFFF00').withAlpha(0.2),
                borderColor: Color.parse('#FFFF00'),
              },
            },
            {
              label: 'Bar 2',
              data: [
                new ChartDataUnit(12, {
                  style: {
                    backgroundColor: Color.rgba(255, 99, 132, 0.2),
                    borderColor: Color.rgba(255, 99, 132),
                  },
                }),
                new ChartDataUnit(19, {
                  style: {
                    backgroundColor: Color.rgba(255, 159, 64, 0.2),
                    borderColor: Color.rgba(255, 159, 64),
                  },
                }),
                new ChartDataUnit(3, {
                  style: {
                    backgroundColor: Color.rgba(255, 205, 86, 0.2),
                    borderColor: Color.rgba(255, 205, 86),
                  },
                }),
                new ChartDataUnit(5, {
                  style: {
                    backgroundColor: Color.rgba(75, 192, 192, 0.2),
                    borderColor: Color.rgba(75, 192, 192),
                  },
                }),
              ],
              style: {
                backgroundColor: Color.rgba(255, 99, 132, 0.2),
                borderColor: Color.rgba(255, 99, 132),
              },
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      },
      {
        Chart: BubbleChart,
        data: {
          datasets: [
            {
              label: 'Bubble 1',
              data: ChartUtil.dataUnits([
                { index: DateTime.fromISO('2021-02-08'), cross: 2, weight: 25 },
                { index: DateTime.fromISO('2021-02-14'), cross: 5, weight: 10 },
                { index: DateTime.fromISO('2021-03-08'), cross: -15, weight: 15 },
                { index: DateTime.fromISO('2021-04-29'), cross: 14, weight: 20 },
                { index: DateTime.fromISO('2021-02-28'), cross: 12, weight: 8 },
                { index: DateTime.fromISO('2021-03-29'), cross: 10, weight: 5 },
                { index: DateTime.fromISO('2021-03-17'), cross: 0, weight: 15 },
              ]),
              style: {
                backgroundColor: Color.parse('#FF00FF').withAlpha(0.2),
                borderColor: Color.parse('#FF00FF'),
              },
            },
          ],
        },
        options: {
        },
      },
    ],
    {
      x: 100,
      y: 100,
      size: {
        width: 400,
        height: 400,
      },
      indexAxis: 'x',
      gridAlign: false,
    },
  )
    .animate(nc.create, 0, 200),
)
app.checkout(scene)

export default app
