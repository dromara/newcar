import {Circle, Color, createScene, move, Rect, Widget, useFont} from 'newcar'
import {Column, Row} from "@newcar/mod-layout";
import {Skottie, useAnimationJson} from "@newcar/mod-skottie";

await useFont('./default.ttf')
const skt = await useAnimationJson('./skottie-test.json')

export default createScene(
  new Skottie(skt, 400, 400, {}).play()
	// new Widget()
)