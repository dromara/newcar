import path from 'node:path'
import {
  CarEngine,
  Color,
  ImageWidget,
  Scene,
  Text,
  Widget,
  useFont,
  useImage,
} from 'newcar'

const logoLoaded = useImage('./assets/newcar.svg')
await useFont(path.resolve('./fonts/bahnschrift.ttf'))

const engine = await new CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const app = engine.createLocalApp(1600, 900)
const logo = new ImageWidget(logoLoaded, {
  x: 668,
  y: 386,
})
const text = new Text(
  [
    {
      text: 'Hello! ',
      style: {
        fontSize: 50,
        fontFamilies: ['bahnschrift'],
      },
    },
    {
      text: 'N',
      style: {
        fontSize: 40,
        color: Color.parse('red'),
      },
    },
    {
      text: 'e',
      style: {
        fontSize: 60,
        color: Color.parse('orange'),
      },
    },
    {
      text: 'w',
      style: {
        fontSize: 30,
        color: Color.parse('yellow'),
      },
    },
    {
      text: 'c',
      style: {
        fontSize: 50,
        color: Color.parse('green'),
      },
    },
    {
      text: 'a',
      style: {
        fontSize: 30,
        color: Color.parse('blue'),
      },
    },
    {
      text: 'r',
      style: {
        fontSize: 40,
        color: Color.parse('purple'),
      },
    },
  ],
  {},
)
const root = new Widget().add(logo, text)
const scene = new Scene(root)
app.checkout(scene)

export default app
