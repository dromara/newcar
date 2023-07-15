# newcar
<img src="logo.png" referrerpolicy="no-referrer" alt="logo"> <center><img src="https://img.shields.io/github/stars/Bug-Duck/newcar?color=yellowgreen&amp;logo=github&amp;style=flat-square" referrerpolicy="no-referrer" alt="stars">  <img src="https://img.shields.io/github/forks/Bug-Duck/newcar?logo=github&amp;style=flat-square" referrerpolicy="no-referrer" alt="forks">  <img src="https://img.shields.io/github/license/Bug-Duck/newcar?color=skyblue&amp;logo=github&amp;style=flat-square" referrerpolicy="no-referrer" alt="license">  <img src="https://shields.io/badge/Community-Starpoints-orange?style=flat-square" referrerpolicy="no-referrer" alt="community">  <a href='https://twitter.com/bugduckteam'><img src="https://shields.io/badge/team-BugDuck_Team-blue?logo=twitter&amp;style=flat-square" referrerpolicy="no-referrer" alt="team"></a>  <a href='https://t.me/newcarjs'><img src="https://shields.io/badge/telegram-newcarjs-skyblue?logo=telegram&amp;style=flat-square" referrerpolicy="no-referrer" alt="team"></a>  &nbsp;


## Introduction
Newcar is a modern animation engine. This repository basically contains a renderer using HTML Canvas API to render.  **This repository cannot deal with the newcar filetype.**

</center>

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
The document is served on [newcar.js.org](https://newcar.js.org).

## Contribution
If you want to join the development or make a contribution, **please read the [Contribution Guide](./doc/README.md)**


*Copyright (c) 2022-present, BugDuck Team*
