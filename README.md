<p align="center">
  <img src="logo.png" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Bug-Duck/newcar?color=yellowgreen&logo=github&style=flat-square" />
  <img src="https://img.shields.io/github/forks/Bug-Duck/newcar?logo=github&style=flat-square" />
  <img src="https://img.shields.io/github/license/Bug-Duck/newcar?color=skyblue&logo=github&style=flat-square" />
  <a href="https://twitter.com/bugduckteam"><img src="https://shields.io/badge/team-BugDuck_Team-blue?logo=twitter&style=flat-square" /></a>
  <a href="https://t.me/newcarjs"><img src="https://shields.io/badge/telegram-newcarjs-skyblue?logo=telegram&style=flat-square" /></a>
</p>

## Introduction

Newcar is a modern animation engine. This repository basically contains a renderer using HTML Canvas API to render. **This repository cannot deal with the newcar filetype.**

## For example

### Install

You can use npm to install it.

```shell
$ npm install newcar # the package of user API
```

### Create a animation

Firstly, you need to define a `<canvas>` tag in document, and then create a object `Car`.

```javascript
import * as newcar from "./node_modules/newcar/dist/newcar.mjs";

const animation = new newcar.Car(
  document.getElementById("canvas_element_id"), // The DOM of `<canvas>`.
  60 // The frame per second.
);
```

Secondly, you're supposed to add a object on it!

```javascript
const text = new newcar.object.Text("Hello world!", {
  x: 100,
  y: 200,
});
animation.addObject(text);
```

Finally, you just need to play it.

```javascript
animation.play();
```

And then, you can see a text object with "Hello world!" on the canvas.

## Document

The document is served on [newcar.js.org](https://newcar.js.org).

## Contribution

If you want to join the development or make a contribution, **please read the [Contribution Guide](./doc/README.md)**

_Copyright (c) 2022-present, BugDuck Team_
