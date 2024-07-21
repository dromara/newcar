import {Circle, createScene, Rect, Widget} from 'newcar'

export default createScene(
	new Rect(100, 100, {
		dragable: true,
		scalable: true,
    isControllerVisible: true
	})
)