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

Newcar is a highly configurable and advanced universal engine designed for rapid animation creation. It is suitable for a wide range of applications, including video clips, dynamic charts (planned for the future), and even 2D game development (also planned for the future).

## 🌟 Features

- **Rich API Interfaces** 🛠️: Offers powerful and diverse APIs, providing you with greater flexibility in animation creation.
- **Based on CanvasKit-WASM** 🧬: Utilizes CanvasKit-WASM to minimize communication and data exchange between the CPU and GPU, ensuring robust animation performance.
- **High Degree of Customization** ⚙️: Features strong customizability, allowing you to create unique animation styles.
- **Chain Syntax** ⛓️: Enables the use of chain syntax for a more efficient development process, eliminating the need to save objects into variables.

## ⌨️ Getting Started

### Creating a Project

Although Newcar can be used in various ways, we recommend using Vite for project creation and PNPM for package management.

```shell
$ pnpm create vite project-name
$ cd project-name
$ pnpm install
```

Next, select your preferred framework.

### Installation

``` shell
$ pnpm add newcar
```

You will also need to install CanvasKit-WASM. For quick setup, we recommend using the CDN version.

### Initialization

```typescript
import * as nc from 'newcar'

await new nc.Engine()
  .init()
  .then(engine => {
    const defaultScene = new nc.Scene(new Widget())
    engine.createApp().checkout(defaultScene).play()
  })
```

1. Await `init()` until CanvasKit is fully loaded.
2. Create a `Scene` with a root widget as its first parameter.
3. Check out to the `defaultScene` and play the animation.

Simple, right? Let's dive deeper.

### Adding Widgets as Root's Children

Now, let's add some excitement.

```typescript
await new nc.Engine()
  .init()
  .then(engine => {
    const defaultScene = new nc.Scene(new Widget()
      .add(
        new nc.Circle(100)
      )
    )
    engine.createApp().checkout(defaultScene).play()
  })
```

## Animating It

```typescript
await new nc.Engine()
  .init()
  .then(engine => {
    const defaultScene = new nc.Scene(new Widget()
      .add(
        new nc.Circle(100)
          .animate(nc.create, 0, 30)
      )
    )
    engine.createApp().checkout(defaultScene).play()
  })
```

These codes will add a `create` animation to the `Circle` object.

If everything is set up correctly, you will see a circle drawn on the canvas.

## 📖 Documentation

The documentation is available at [newcar.js.org](https://newcar.js.org).

*Copyright (c) 2022-present, BugDuck Team*
