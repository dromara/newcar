<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Bug-Duck/newcar/assets/73536163/0a17bf99-6ea5-483c-87f6-c9b284ad0030">
  <img alt="Newcar Banner" src="https://github.com/Bug-Duck/newcar/assets/73536163/02dc932c-b718-4f83-be2c-8e665760e2cd">
</picture>

<p align="center">
  <img src="https://img.shields.io/github/stars/Bug-Duck/newcar?color=yellowgreen&logo=github&style=flat-square" />
  <img src="https://img.shields.io/github/forks/Bug-Duck/newcar?logo=github&style=flat-square" />
  <img src="https://img.shields.io/github/license/Bug-Duck/newcar?color=skyblue&logo=github&style=flat-square" />
  <a href="https://twitter.com/bugduckteam"><img src="https://shields.io/badge/twitter-BugDuck_Team-blue?logo=twitter&style=flat-square" /></a>
  <a href="https://discord.gg/ANqgRc3C4b"><img src="https://shields.io/badge/discord-newcarjs-blue?logo=discord&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/newcar"><img src="https://img.shields.io/npm/dw/newcar.svg"/></a>
  <a href="https://www.npmjs.com/package/newcar"><img src="https://img.shields.io/npm/v/newcar.svg"/></a>
</p>

## Introduction

Newcar is a Highly configurable universal advanced engine, Born for creating animation rapidly.

## Example

### Install

You can use npm to install it.

```shell
$ npm install newcar # the package of user API
```

### Create a animation

Firstly, you need to define a `<canvas>` tag in document, and then create a object `Car`.

```javascript
import * as newcar from "./node_modules/newcar/dist/newcar.js";

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
