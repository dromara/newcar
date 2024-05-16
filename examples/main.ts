import { CarEngine, Color, Shader, Text } from 'newcar'
import { Angle, Brace } from '@newcar/mod-geometry'
import { BarChart, BubbleChart, ChartDataUnit, ChartUtil, LineChart, MixedChart, ScatterChart } from '@newcar/mod-chart'
import { Markdown } from '@newcar/mod-markdown'
// import { Tex } from '@newcar/mod-math'

import * as nc from 'newcar'
import { DateTime, Duration } from 'luxon'

await nc.useFont(
  'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
)

const engine = await new CarEngine().init(
  './node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)

export const scene1 = new nc.Scene(
  new nc.Widget({
    style: {
      margin: 100,
      layout: 'row',
    },
  })
    .add(
      new nc.Circle(100, {
        style: {
          margin: 100,
        },
      }),
    ),
)

export const scene2 = new nc.Scene(
  new nc.Line([0, 0], [400, 400]).animate(nc.create, 0, 30),
)

export const scene3 = new nc.Scene(
  new nc.Arrow([50, 350], [350, 50]).animate(nc.create, 0, 30),
)

export const scene4 = new nc.Scene(
  new nc.Path({
    x: 100,
    y: 150,
    style: {
      border: true,
      fill: false,
    },
  })
    .add(
      new nc.Path({
        style: {
          border: true,
          fill: false,
        },
      }),
    )
    .addPathFromSVGString(
      'M94.6523 121.4L94.6522 121.399L60.434 59.1844L60.4046 59.1311C59.6994 57.8487 59.1307 56.8148 58.6494 56.0404C58.1876 55.2975 57.6607 54.543 56.9771 54.0372C54.3862 52.1199 50.7433 52.5922 48.727 55.1068C48.195 55.7703 47.878 56.6341 47.6209 57.4702C47.353 58.3418 47.0667 59.4868 46.7118 60.9068L46.6971 60.9655L32.12 119.274C31.575 121.454 31.3729 122.205 31.0657 122.79C30.2645 124.315 28.8463 125.423 27.1721 125.83C26.5301 125.986 25.7522 126 23.5052 126H13.9348C12.2438 126 11.0545 125.999 10.1296 125.95C9.21044 125.901 8.69117 125.808 8.31991 125.682L7.6778 127.576L8.3199 125.682C6.05466 124.914 4.46189 122.874 4.2663 120.491C4.23425 120.1 4.27038 119.574 4.44566 118.67C4.62205 117.761 4.90985 116.607 5.31998 114.966L31.88 8.72628C32.425 6.54633 32.6271 5.79504 32.9343 5.21005C33.7355 3.68468 35.1537 2.57734 36.8279 2.17005C37.4699 2.01385 38.2478 2 40.4948 2H57.7509C59.4347 2 60.0137 2.00834 60.5246 2.10537C61.8481 2.35675 63.0486 3.04624 63.9326 4.06283C64.2693 4.45001 64.5647 4.93784 65.3874 6.34772C65.3986 6.36682 65.4098 6.3861 65.4212 6.40554L65.4212 6.40563L115.124 91.6099L115.219 91.774C115.936 93.0024 116.429 93.8493 117.049 94.5619C118.522 96.2563 120.523 97.4054 122.729 97.8244C123.657 98.0006 124.637 98.0004 126.059 98L126.249 98H186.065C187.756 98 188.945 98.0007 189.87 98.0501C190.79 98.0992 191.309 98.1918 191.68 98.3176C193.945 99.0855 195.538 101.126 195.734 103.509C195.766 103.9 195.73 104.426 195.554 105.33C195.381 106.225 195.099 107.358 194.699 108.959L194.699 108.959L94.6523 121.4ZM94.6523 121.4L94.6711 121.434L94.6712 121.434C95.4909 122.924 95.7836 123.437 96.1221 123.843C97.0062 124.903 98.2289 125.626 99.5839 125.889C100.107 125.991 100.702 126 102.433 126H183.505C185.752 126 186.53 125.986 187.172 125.83C188.846 125.423 190.265 124.315 191.066 122.79C191.373 122.205 191.575 121.454 192.12 119.274L194.68 109.034L194.68 109.034L94.6523 121.4Z',
    )
    .animate(nc.stroke, 0, 90)
    .addPathFromSVGString(
      'M216.12 23.2737L216.12 23.2738C216.12 23.2749 216.119 23.276 216.119 23.2772L216.117 23.2872L216.117 23.2874C215.574 25.4568 215.372 26.2062 215.066 26.7899C214.265 28.3153 212.846 29.4227 211.172 29.83C210.53 29.9862 209.752 30 207.505 30H160.495C160.407 30 160.321 30 160.235 29.9999C158.348 29.9994 157.051 29.999 155.882 30.2834C153.092 30.9622 150.728 32.8078 149.393 35.3501C148.834 36.4153 148.52 37.6728 148.062 39.5044C148.042 39.5872 148.021 39.671 147.999 39.7561L140.422 70.0644C140.049 71.557 139.788 72.5973 139.556 73.3544C139.441 73.727 139.347 73.9857 139.267 74.167C139.193 74.335 139.151 74.3922 139.151 74.3923C139.151 74.3923 139.152 74.3918 139.152 74.3909C138.481 75.2286 137.267 75.3864 136.404 74.7485C136.404 74.7484 136.348 74.7038 136.234 74.5602C136.111 74.4053 135.954 74.1791 135.748 73.848C135.33 73.1754 134.812 72.236 134.071 70.8879L120.81 46.7767C120.248 45.7547 120.059 45.403 119.925 45.0549C119.578 44.1575 119.453 43.1901 119.559 42.2342C119.6 41.8633 119.693 41.4751 119.976 40.3435L127.88 8.72628C128.425 6.54632 128.627 5.79504 128.934 5.21005C129.735 3.68468 131.154 2.57734 132.828 2.17005C133.47 2.01385 134.248 2 136.495 2H210.065C211.756 2 212.945 2.00067 213.87 2.05009C214.79 2.0992 215.309 2.19177 215.68 2.31763C217.945 3.08554 219.538 5.12553 219.734 7.50938C219.766 7.90008 219.73 8.42629 219.554 9.32988C219.378 10.2392 219.09 11.3931 218.68 13.0336L218.68 13.0337L216.12 23.2737Z',
    )
    .animate(nc.stroke, 0, 90),
)

// const scene5 = new nc.Scene(
//   new Tex(`dy/dx, \\mathrm{d}y/\\mathrm{d}x, \\frac{dy}{dx}, \\frac{\mathrm{d}y}{\\mathrm{d}x}, \\frac{\\partial^2}{\\partial x_1\\partial x_2}y`, {
//     style: {
//       scaleX: 0.1,
//       scaleY: 0.1,
//     },
//   }),
// )

const sceneX = new nc.Scene(
  new Text(['Hello'], {
    style: {
      width: 400,
      border: true,
      borderWidth: 1,
      borderColor: Color.parse('red'),
      fill: false,
    },
  }).animate(nc.stroke, 0, 60, {
    origin: 100,
  }),
)

const scene6 = new nc.Scene(
  new Angle(new nc.Line([100, 100], [200, 100]), 45, 100),
)

const scene7 = new nc.Scene(new Brace([0, 0], [200, 200]))

const sceneChart1 = new nc.Scene(
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
            backgroundShader: Shader.createLinearGradientShader([0, 0], [0, 10], [Color.parse('#66CCFF'), Color.parse('#FFCC00')], null, 'mirror'),
            borderColor: Color.parse('#66CCFF'),
            borderShader: Shader.createLinearGradientShader([0, 0], [0, 10], [Color.parse('#66CCFF'), Color.parse('#FFCC00')], null, 'mirror'),
            borderWidth: 1,
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
    {
      x: 50,
      y: 50,
      size: {
        width: 300,
        height: 300,
      },
      indexAxis: 'x',
    },
  ).animate(nc.create, 0, 100),
)

const sceneChart2 = new nc.Scene(
  new ScatterChart(
    {
      // labels: ['AB', 'BB', 'CB', 'DB'],
      datasets: [
        {
          label: 'Scatter 1',
          data: ChartUtil.dataUnits([
            { index: -12, cross: 2 },
            { index: -5, cross: 5 },
            { index: 5, cross: -15 },
            { index: 4, cross: 14 },
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
      indexAxis: 'x',
    },
  ).animate(nc.create, 0, 100),
)

const sceneChart3 = new nc.Scene(
  new LineChart(
    {
      // labels: ['AB', 'BB', 'CB', 'DB'],
      datasets: [
        {
          label: 'Line 1',
          data: ChartUtil.dataUnits([
            { index: -12, cross: 2 },
            { index: -5, cross: 5 },
            { index: 5, cross: -15 },
            { index: 4, cross: 14 },
          ]),
          style: {
            backgroundColor: Color.parse('#66CCFF').withAlpha(0.2),
            backgroundShader: Shader.createLinearGradientShader([0, 0], [0, 20], [Color.parse('#66CCFF'), Color.parse('#FFCC00')], null, 'clamp'),
            borderColor: Color.parse('#66CCFF'),
            borderShader: Shader.createLinearGradientShader([0, 0], [0, 20], [Color.parse('#66CCFF'), Color.parse('#FFCC00')], null, 'clamp'),
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
      indexAxis: 'x',
    },
  ).animate(nc.create, 0, 60),
)

const sceneChart4 = new nc.Scene(
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
            backgroundShader: Shader.createLinearGradientShader([0, 0], [0, 20], [Color.parse('red'), Color.parse('blue')], null, 'clamp'),
            borderColor: Color.parse('#66CCFF'),
            borderShader: Shader.createLinearGradientShader([0, 0], [0, 20], [Color.parse('red'), Color.parse('blue')], null, 'clamp'),
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

const sceneChart5 = new nc.Scene(
  new MixedChart<typeof BarChart | typeof LineChart | typeof BubbleChart>(
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
            Duration.fromObject({ months: 3.5 }),
            'month',
            0.5,
          ),
          datasets: [
            {
              label: 'Bar 1',
              data: ChartUtil.dataUnits([-14, 5, -4, 18, 6, 6, 6]),
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
                new ChartDataUnit(5, {
                  style: {
                    backgroundColor: Color.rgba(75, 192, 192, 0.2),
                    borderColor: Color.rgba(75, 192, 192),
                  },
                }),
                new ChartDataUnit(5, {
                  style: {
                    backgroundColor: Color.rgba(75, 192, 192, 0.2),
                    borderColor: Color.rgba(75, 192, 192),
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
      x: 50,
      y: 50,
      indexAxis: 'x',
      gridAlign: false,
    },
  )
    .animate(nc.create, 0, 100),
)

const scene11 = new nc.Scene(new Markdown(`
# \`Hello\`

## Name

My name is **Acbox**

## Age

15

## Products

- Newcar Animation Engine
- tntjs(achieved)
`, {
  style: {
    scaleX: 1.2,
    scaleY: 1.2,
  },
}))

const app1 = engine.createApp(document.querySelector('#a1'))
app1.checkout(scene1)
app1.play()

const app2 = engine.createApp(document.querySelector('#a2'))
app2.checkout(scene2)
app2.play()

const app3 = engine.createApp(document.querySelector('#a3'))
app3.checkout(scene3)
app3.play()

const app4 = engine.createApp(document.querySelector('#a4'))
app4.checkout(scene4)
app4.play()

// const app5 = engine.createApp(document.querySelector('#a5'))
// app5.checkout(scene5)
// app5.play()

const app6 = engine.createApp(document.querySelector('#b1'))
app6.checkout(scene6)
app6.play()

const app7 = engine.createApp(document.querySelector('#b2'))
app7.checkout(scene7)
app7.play()

const appChart1 = engine.createApp(document.querySelector('#c1'))
appChart1.checkout(sceneChart1)
appChart1.play()

const appChart2 = engine.createApp(document.querySelector('#c2'))
appChart2.checkout(sceneChart2)
appChart2.play()

const appChart3 = engine.createApp(document.querySelector('#c3'))
appChart3.checkout(sceneChart3)
appChart3.play()

const appChart4 = engine.createApp(document.querySelector('#c4'))
appChart4.checkout(sceneChart4)
appChart4.play()

const appChart5 = engine.createApp(document.querySelector('#c5'))
appChart5.checkout(sceneChart5)
appChart5.play()

const app11 = engine.createApp(document.querySelector('#d1'))
app11.checkout(scene11)
app11.play()

const appX = engine.createApp(document.querySelector('#a6'))
appX.checkout(sceneX)
appX.play()
