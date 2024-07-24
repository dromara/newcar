import {Circle, Color, createScene, move, Rect, Widget} from 'newcar'
// import TextEditor from "@newcar/mod-text-editor";
import * as nc from "newcar";
import {Column, Row} from "@newcar/mod-layout";

await nc.useFont('./default.ttf')

export default createScene(
  new Row(Infinity)
    .add(
      new Rect(100, 100, {
        style: {
          fillColor: Color.parse('skyblue')
        }
      })
    )
    .add(
      new Column(Infinity)
        .add(
          new Rect(200, 200)
        )
        .add(
          new Rect(250, 600, {
            style: {
              fillColor: Color.parse('red')
            }
          })
        )
    )
    
)