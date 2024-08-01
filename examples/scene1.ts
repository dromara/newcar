import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import TextEditor from "@newcar/mod-text-editor"
import { Table } from "@newcar/mod-table";

await useFont('./default.ttf')

export default createScene(
  new Table(4, 4)
    .setItem(new Rect(100, 100), 2, 2)
	// new Widget()
)