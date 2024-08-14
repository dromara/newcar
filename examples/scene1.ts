import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor"
import { Table } from "@newcar/mod-table";
import {importScene} from "newcar";
import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'

await useFont('./default.ttf')

export default importScene(

  `{
  "root": {
    "type": "MathFunction",
    "arguments": ["fn((x) => Math.sin(x))", [-2, 2]],
    "options": {
      "x": "calc(200)",
      "y": 100
    }
  }
}
`,
  {...(nc as any), ...mt},
  nc as any,
  nc as any,
)
//
// export default createScene(
//   new Circle(100, {
//     style: {
//       color: Color.rgba(144, 144, 144, 1)
//     }
//   })
// )
