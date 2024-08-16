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
    "type": "Widget",
    "children": [
      {
        "type": "MathFunction",
        "arguments": [
          "fn((x) => Math.sin(x))",
          [-3.14, 3.14]
        ],
        "options": {
          "style": {
            "color": [255, 0, 0, 1]
          },
          "lineWidth": 2,
          "divisionY": 200,
          "divisionX": 400,
          "x": 100,
          "y": 200
        }
      }
    ]
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
