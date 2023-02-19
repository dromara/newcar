# `packages/core/src/dataSaver`

This file is save every `Carobj` 's data and draw them on canvas according this data.

## class `dataSaver`

### `constructor(ele: HTMLElement, fps: number)`
There set the canvas element and frame per second.

## How to work?
At first, when you add a `Carobj` in the dataSaver, the dataSaver will push it into `this.#objects`, and when the animation start to play, `this.#frameImmediately` will add 1 per frame. And `AnimationBuilder` use it to compute each object's each param based on `this.#frameImmediately`, and use `dataSaver`.
