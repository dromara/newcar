# `index`

## class `Car`
This class was the access of Newcar animation Object.

### `constructor(ele: HTMLElement, fps: number)`
The `ele` was the element object of `<canvas>`, and the `fps` is the frame per second of animation. And we create a  [`dataSaver`](../dataSaver/README.md) for it.

### `addObject(obj: Carobj)`
There we create a `AnimationBuilder` and add the `Carobj` in the object to let the object can sport.

### `addAnimationItem(animationItem: AnimationBuilderItem)`
There let user create `AnimationBuilderItem` and add it in this.#animationBuilder
