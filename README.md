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

Newcar is a Highly configurable universal advanced engine, to born for creating animation rapidly. You can use it in a lot of jobs, such as the **video clips**, **dynamic chart** (In the future) and even **2D game development** (Also in the future).

## 🌟 Feature

- Rich API interfaces 🛠️: Powerful and diverse APIs that provide greater freedom in creating animations.
- Based on CanvasKit-WASM 🧬: Based on CanvasKit-WASM, which reduced communication and data exchange between CPU and GPU ensures strong animation speed
- High degree of customization ⚙️: Strong customizability, allowing for the creation of one's own animation style.
- Chain syntax ⛓️: You can use chain syntax instead of saving object into variable, which makes the development efficient

## ⌨️ Getting started

### Create Project

Even though you can use any way to use Newcar, but we suggest to use Vite to create your project and use PNPM to manage you package

```shell
$ pnpm create vite project-name
$ cd project-name
$ pnpm install
```

Then, you need to select frameworks, you can use your favorite framework.

### Install

``` shell
$ pnpm add newcar
```

And then, you need to install CanvasKit-WASM's file. You can use your manager to install `canvaskit-wasm`, but there we use the file on CDN for fast.

### Initialize

```typescript
import * as nc from 'newcar'

await new nc.Engine()
  .init()
  .then(engine => {
    const defaultScene = new nc.Scene(new Widget())
    engine.createApp().checkout(defaultScene).play()
  })
```

Firstly, we need await `init()` until CanvasKit is loaded completely.

Secondly, creating a `Scene` and a root as the first parameter of `Scene`.

Finally, check out to the `defaultScene` and play the animation.

Is it easy? Let's explore more deeply.

### Add Widgets as Root's Children

Now, let's do something absorbing.

```typescript
await new nc.Engine()
  .init()
  .then(engine => {
    const defaultScene = new nc.Scene(new Widget()
      .add(
        new nc.Arc(100)
      )
    )
    engine.createApp().checkout(defaultScene).play()
  })
```

If everything is okay, you are going to see a circle were drawed on the canvas.

## 📖 Documentation

The document is served on [newcar.js.org](https://newcar.js.org).

_Copyright (c) 2022-present, BugDuck Team_
