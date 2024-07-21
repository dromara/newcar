import {Circle, createScene, Rect, Widget} from 'newcar'
import TextEditor from "@newcar/mod-text-editor";
import * as nc from "newcar";

await nc.useFont('./Roboto-Regular.ttf')

export default createScene(
	new TextEditor('Text', {
		dragable: true
	})
)