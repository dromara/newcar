import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor"
import { Table } from "@newcar/mod-table";
import {importScene} from "newcar";
import * as nc from 'newcar'

await useFont('./default.ttf')

export default importScene(
  
  `{
  "$schema": "../schema.json",
  "root": {
    "type": "Circle",
    "arguments": [100],
    "options": {
      "style": {
        "fill": false,
        "border": true
      },
      "x": 100,
      "y": 100
    },
    "animations": [
      {
        "type": "create",
        "parameters": {
          "duration": 1
        }
      }
    ]
  }
}`,
  nc as any,
  nc as any,
)