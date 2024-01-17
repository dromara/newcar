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

## 📔 Introduction

Newcar is a Highly configurable universal advanced engine, 2Born for creating animation rapidly. You can use it in a lot of jobs, such as the **video clips**, **dynamic chart** (In the future) and even **2D game development** (Also in the future).

## 🌟 Feature

- Rich API interfaces 🛠️: Powerful and diverse APIs that provide greater freedom in creating animations.
- Based on the native Canvas API 🧬: Based on HTML Canvas, it facilitates the development of graphic functionalities. In the future, we will use some ways to improve the performance of Newcar.
- High degree of customization ⚙️: Strong customizability, allowing for the creation of one's own animation style.

## 🔖 Example

### Install

Use your favorite manager to install newcar.

```shell
# NPM
npm install newcar

# YARN
yarn add newcar

# PNPM
pnpm add newcar
```

### Create

To create a animation by Newcar, we firstly need a animation object --- `Car`.

Via `newcar` to create a animation.

```javascript
import * as $ from "newcar";

const animation = $.newcar("#canvas");
```

And then, we need to create a scene for the animation and check out to it.

```javascript
const scene = new $.Scene();
animation.scene = scene;
```

The last step is playing it!

```javascript
animation.play();
```

Now, the animation has been ran, in the following docs, we'll let it do something absorbing.

### Add a Object

Newcar offers many objects so that you have more choice (We have basic lib and some offical mods, please refer to API Docs.) In this instance, we use `Text` as a example.

```javascript
scene.add(
  new $.Text("Hello world!", {
    x: 100,
    y: 100,
    size: 50,
  }),
);
```

If everything is okay, you will see a text object with "Hello world" appears on the canvas.

### Set Up

We use async function to control objects, the first paramter is itself, you can control its act.

The codes below these texts can wait 100 frames and change the text to "Hi world".

```javascript
const scene = new $.Scene().add(
  new $.Text("Hello world", {
    x: 100,
    y: 100,
    size: 50,
  }).setup(async (obj) => {
    await $.sleep(100);
    obj.text = "Hi world";
  }),
);
```

### Animate

We need to use `animate()` to animate the object. The first parameter is the function of animations, the second is the holding frame of animation, and the finally is more parameters.

```javascript
const scene = new $.Scene().add(
  new $.Text("Hello world", {
    x: 100,
    y: 100,
    size: 50,
  }).setup(async (obj) => {
    await $.sleep(100);
    obj.animate($.move, 100, {
      toX: 300,
      toY: 300,
    });
  }),
);
```

These codes will let the text move to (300, 300) during 100 frame.

### Emit Signals

Signals system is a powerful tools to build animations as better as possible. A object emit signals and another objects gain signals and act.

```javascript
const scene = new $.Scene()
  .add(
    new $.Text("Hello world", {
      x: 100,
      y: 100,
      size: 50,
    }).setup(async (obj) => {
      obj.emit("test");
    }),
  )
  .add(
    new $.Arc(100).respond("test", async (obj) => {
      obj.radius = 200;
    })
  );
```

First and foremost, create two objects.

Secondly, the text emit a signal "test" to global surroundings.

Finally, the arc get the signal and make a response.

## 🧭 Future Plans

- Add plugin system for the project, and make it has more flexibility.
- Add charts module, to make the dynamic data animation.
- Add geometry module.
- Add skeleton module, let's make some animation!
- Add event system to be a interactive animation engine.
- Add UI.
- Add physical engine for objects.
- Use WebGL instead of Canvas2D.

## 📖 Documentation

The document is served on [newcar.js.org](https://newcar.js.org).

_Copyright (c) 2022-present, BugDuck Team_
