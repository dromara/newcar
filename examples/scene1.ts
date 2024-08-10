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
        "fill": false
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