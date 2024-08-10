import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor"
import { Table } from "@newcar/mod-table";
import {importScene} from "newcar";
import * as nc from 'newcar'

await useFont('./default.ttf')

export default importScene(

  `{
  "root": {
    "type": "Circle",
    "arguments": [150],
    "options": {
      "style": {
        "border": true,
        "fill": false,
        "borderColor": [144, 144, 144, 1]
      },
      "x": 800,
      "y": 450
    },
    "animations": [
      {
        "type": "stroke",
        "parameters": {
          "duration": 4
        }
      },
      {
        "type": "destroy",
        "parameters": {
          "duration": 2
        }
      }
    ]
  }
}
`,
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
