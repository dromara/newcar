import {
  CarEngine,
  Path,
  Recorder,
  Scene,
  Text,
  Widget,
  create,
  fadeIn,
  stroke,
} from 'newcar'

const e = await new CarEngine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)

const app = e.createApp(document.querySelector('#canvas'))

const root = new Widget()
  .add(
    new Text(
      'I AM A FOOLISH MAN',
      'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
      {
        x: 200,
        y: 450,
        style: {
          fill: false,
          border: true,
          size: 130,
        },
      },
    )
      .animate(stroke, 0, 200)
      .animate(create, 0, 100),
  )
  .add(
    new Text(
      'I AM A FOOLISH MAN',
      'https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf',
      {
        style: {
          fill: true,
          size: 130,
        },
        x: 200,
        y: 450,
      },
    )
      .animate(fadeIn, 20, 150)
      .animate(create, 0, 100),
  )
  .add(
    new Path({
      style: {
        border: true,
        fill: false
      }
    }).setUpdate((e, w: Path) => {
      if (e === 0) {
        w.addPathFromSVGString(`
        M 10,30
        A 20,20 0,0,1 50,30
        A 20,20 0,0,1 90,30
        Q 90,60 50,90
        Q 10,60 10,30 z  
      `)
      w.path.arc(100, 100, 100, 0, 360)
      }
    }),
  )
const scene = new Scene(root)

app.checkout(scene)

const rcd = new Recorder(document.querySelector('#canvas'), 'mp4')

rcd.start(3000, (url) => console.log(url))

app.play()
