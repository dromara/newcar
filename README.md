# newcar
![logo](logo.png)
![stars](https://img.shields.io/github/stars/Bug-Duck/newcar?color=yellowgreen&logo=github&style=flat-square)
![forks](https://img.shields.io/github/forks/Bug-Duck/newcar?logo=github&style=flat-square)
![license](https://img.shields.io/github/license/Bug-Duck/newcar?color=skyblue&logo=github&style=flat-square)
![community](https://shields.io/badge/Community-Starpoints-orange?style=flat-square)
[![team](https://shields.io/badge/team-BugDuck-blue?logo=twitter&style=flat-square)](https://twitter.com/bugduckteam)

## Introduction
Newcar is a modern animation engine. This repository basically contains a renderer using HTML Canvas API to render.  **This repository cannot deal with the newcar filetype.**

## For example

### Install
You can use npm to install it.
```shell
$ npm install newcar # the package of user API
```
### Create a animation

Firstly, you need to define a `<canvas>` tag in document, and then you need create a object `Car`.
```javascript
import { newcar } from "./node_modules/newcar/dist/newcar.js"

const animation = new newcar.Car(
  document.getElementById("canvas_element_id"), // The DOM of `<canvas>`.
  60 // The frame per second.
)
```
Secondly, you need to add a object on it!
```javascript
const text = new newcar.object.Text({
  x: 100,
  y: 200,
  text: "Hello world!"
});
animation.addObject(text);
```
Finally, you just need to play it.
```javascript
animation.startPlay();
```
And then, you can see a text object with "Hello world!" on the canvas.

## Document
The document is served on [newcar.js.org](https://newcar.js.org). <!-- Currently 404. (You know too much) -->

## Contribution
If you want to join the development or make a contribution, **please read the [Contribution Guide](./doc/README.md)**


*Copyright (c) 2022-present, BugDuck Team*
