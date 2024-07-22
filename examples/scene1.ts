import {Circle, createScene, Rect, Widget} from 'newcar'

export default createScene(
	new Rect(100, 100, {
		dragable: true,
		scalable: true,
    rotatable: true,
    resizable: true,
    isControllerVisible: true,
	})
)