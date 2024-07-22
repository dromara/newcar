import {Circle, createScene, Rect, Widget} from 'newcar'

export default createScene(
	new Circle(100,  {
		dragable: true,
		scalable: true,
    rotatable: true,
    resizable: true,
    isControllerVisible: true,
    x: 200,
    y: 200
	})
)