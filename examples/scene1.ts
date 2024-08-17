import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor"
import { Table } from "@newcar/mod-table";
import {importScene} from "newcar";
import * as nc from 'newcar'
import * as mt from '@newcar/mod-math'

await useFont('./default.ttf')

const scene = importScene(

  `
 {
  "root": {
    "type": "Widget",
    "arguments": [],
    "children": [
      {
        "type": "Rect",
        "arguments": [400, 400],
        "options": {
          "style": {
            "border": true,
            "fill": false,
            "borderColor": [255, 255, 255, 1]
          },
          "x": 300,
          "y": 150
        }
      },
      {
        "type": "Circle",
        "arguments": [10],
        "options": {
          "style": {
            "fill": true,
            "fillColor": [255, 255, 255, 1]
          },
          "x": 300,
          "y": 150
        },
        "animations": [
          {
            "type": "move",
            "parameters": {
              "duration": 1,
              "to": [400, 400]
            }
          }
        ]
      }
    ]
  }
}
`,
  {...(nc as any), ...mt},
  nc as any,
  nc as any,
)

console.log(scene)

export default scene
//
// export default createScene(
//   new Circle(100, {
//     style: {
//       color: Color.rgba(144, 144, 144, 1)
//     }
//   })
// )
