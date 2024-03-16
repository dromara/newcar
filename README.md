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

## Announcement

Newcar is being refactored and rewrited, please refer to [next](https://github.com/Bug-Duck/newcar/tree/next) to get latest process.

## 📔 Introduction

Newcar is a Highly configurable universal advanced engine, 2Born for creating animation rapidly. You can use it in a lot of jobs, such as the **video clips**, **dynamic chart** (In the future) and even **2D game development** (Also in the future).

## 🌟 Feature

- Rich API interfaces 🛠️: Powerful and diverse APIs that provide greater freedom in creating animations.
- Based on CanvasKit-WASM 🧬: Based on CanvasKit-WASM, which reduced communication and data exchange between CPU and GPU ensures strong animation speed
- High degree of customization ⚙️: Strong customizability, allowing for the creation of one's own animation style.
- Chain syntax ⛓️: You can use chain syntax instead of saving object into variable, which makes the development efficient

## Getting Started <Badge type="tip" text="^0.8.0" />

### Installation

Install the `newcar` with your preferred package manager:

#### npm

```shell
npm install newcar
```

#### yarn

```shell
yarn add newcar
```

#### pnpm

```shell
pnpm add newcar
```

### Initialization

We suggest to use Vite to build our animation, in there we use pnpm as a instance.

```shell
pnpm create vite
```

And then you can choose your favorite framework to build your program. As a demo, we use native environment.

#### Create

To create a animation by Newcar, we firstly need a animation object --- `Car`.

Via `newcar` or `createCar` to create a animation.

```javascript
import { createCar, Scene } from "newcar";

const animation = createCar("#canvas");
```

Defining a `<canvas>` tag and set the id to `canvas`:

```html
<canvas id="canvas" width="1600" height="900"></canvas>
```

Then, we need to choose CanvasKit-WASM's file, install CanvasKit-WASM and import `config` to change settings:

```shell
pnpm add canvaskit-wasm@0.39.1
```

```typescript
import { config } from "newcar";

config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";
```

And then, we are going to create a scene for the animation and check out to it.

```javascript
const scene = new Scene();
animation.scene = scene;
```

The last step is that when the canvaskit was loaded play it:

```javascript
animation.on("ready-to-play", () => {
  animation.play();
});
```

Now, the animation has been ran, but there are no anything on the canvas, let it do something absorbing.

#### Add a Object

Newcar offers many objects so that you have more choice (We have basic lib and some offical mods, please refer to API Docs.) In this instance, we use `Text` as a example.

```javascript
import { createCar, Scene, Text } from "newcar";

// Omit the existing code here.

scene.add(
  new Text("Hello world!", {
    x: 100,
    y: 100,
    size: 50,
  }),
);
```

If everything is okay, you will see a text object with "Hello world" appears on the canvas.

#### Setup

We use async function to control objects, the first paramter is itself, you can control its act.

The codes below these texts can wait 100 frames and change the text to "Hi world".

```javascript
import { createCar, Scene, Text, sleep } from "newcar";

// Omit the existing code here.

const scene = new $.Scene().add(
  new Text("Hello world", {
    x: 100,
    y: 100,
    size: 50,
  }).setup(async (obj) => {
    await sleep(100);
    obj.text = "Hi world";
  }),
);
```

#### Animate

We need to use `animate()` to animate the object. The first parameter is the function of animations, the second is the holding frame of animation, and the finally is more parameters.

```javascript
import { createCar, Scene, Text, sleep, move } from "newcar";

const scene = new $.Scene().add(
  new Text("Hello world", {
    x: 100,
    y: 100,
    size: 50,
  }).setup(async (obj) => {
    await sleep(100);
    obj.animate(move, 100, {
      toX: 300,
      toY: 300,
    });
  }),
);
```

These codes will let the text move to (300, 300) during 100 frame.

You also can use timing function to control the speed of animation, just use parameter `by`. Newcar also has some timing function built in, please refer to [https://www.desmos.com/calculator/yasltaa9um](https://www.desmos.com/calculator/yasltaa9um) to get more information.

This is all the things of entry-level docs. If you like this project, please give us a star on GitHub.

## 🧭 Future Plans

- Add reactivity system like ReactJS and VueJS.
- Add plugin system for the project, and make it has more flexibility.
- Add charts module, to make the dynamic data animation.
- Add geometry module.
- Add skeleton module, let's make some animation!
- Add event system to be a interactive animation engine.
- Add UI.
- Add physical engine for objects.

## 📖 Documentation

The document is served on [newcar.js.org](https://newcar.js.org).

_Copyright (c) 2022-present, BugDuck Team_
