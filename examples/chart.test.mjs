import { Color } from 'newcar'
import * as nc from 'newcar'
import { BubbleChart, ChartUtil } from '@newcar/mod-chart'

await nc.useFont('Roboto-Regular.ttf')

const engine = await new nc.CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(400, 400)
const scene = new nc.Scene(
  new BubbleChart(
    {
      // labels: ['AB', 'BB', 'CB', 'DB'],
      datasets: [
        {
          label: 'Bubble 1',
          data: ChartUtil.dataUnits([
            { index: -12, cross: 2, weight: 25 },
            { index: -5, cross: 5, weight: 10 },
            { index: 5, cross: -15, weight: 15 },
            { index: 4, cross: 14, weight: 20 },
          ]),
          style: {
            backgroundColor: Color.parse('#66CCFF').withAlpha(0.2),
            borderColor: Color.parse('#66CCFF'),
          },
        },
      ],
    },
    {
      x: 50,
      y: 50,
      size: {
        width: 300,
        height: 300,
      },
      indexAxis: 'y',
    },
  ).animate(nc.create, 0, 100),
)
app.checkout(scene)

export default app
