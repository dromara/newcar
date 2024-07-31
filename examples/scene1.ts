import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor";

await useFont('./default.ttf')

export default createScene(
  new TextEditor('Hello', {
    x: 100,
    y: 100,
  })
	// new Widget()
)