---
title: Getting Started
---

# Getting Started

Welcome to the beginner's guide for the Newcar animation engine! With this guide, you can learn some of the fundamental concepts and knowledge about Newcar, including:

- `CarEngine`
- `App`
- `Scene`
- `Widget`
- `Animation`

These concepts will be explained in detail in future documents. This guide will help you to learn the basic usage of the Newcar animation engine.

## Creating a Newcar Project

"To do a good job, an artisan needs the best tools."

First, make sure you have the following tools installed:

- Node.js
- A package manager, such as NPM, Yarn, or PNPM
- A modern code editor, such as VSCode, Webstorm
- A browser that supports WebAssembly compilation, here we recommend the latest versions of Firefox, Chrome, Edge

### Newcar CLI

We provide a [CLI tool](https://www.npmjs.com/package/@newcar/cli) to help you create a Newcar project quickly.

If you're using it for the first time, you need to install it globally.

:::code-group

```shell [npm]
$ npm install -g @newcar/cli
```

```shell [yarn]
$ yarn global add @newcar/cli
```

```shell [pnpm]
$ pnpm add -g @newcar/cli
```

:::

Then, you can create a Newcar project by running the following command:

```shell
$ ncli create my-newcar-project
$ cd my-newcar-project
$ npm install
```

### Vite CLI

We recommend using [PNPM + Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to create our project.

```shell
$ pnpm create vite my-newcar-project
$ cd my-newcar-project
$ pnpm install
```

Next, install Newcar and CanvasKit-WASM packages.

```shell
$ pnpm add newcar
$ pnpm add canvaskit-wasm
```

## Basic Initialization

Add a `<canvas>` element to your HTML file for rendering.

```html
<canvas width="1600" height="900" id="canvas"></canvas>
```

Then, import Newcar and initialize the `CarEngine` object.

```typescript
import * as nc from "newcar";

const engine = await new nc.CarEngine().init("../node_modules/canvaskit-wasm/bin/canvaskit.wasm");
```

In the code above, we imported `newcar` and named it `nc`. Then we created a `CarEngine` object and passed in the CanvasKit-WASM file we just installed.

## Creating an Animation App

```typescript
import * as nc from "newcar";

const engine = await new nc.CarEngine().init("../node_modules/canvaskit-wasm/bin/canvaskit.wasm");

const app = engine.createApp(document.querySelector("#canvas"));
```

We used `CarEngine.createApp` to create an animation instance and passed in the DOM object of `<canvas>`.

## Creating a Scene and Adding Objects

```typescript
import * as nc from "newcar";

const engine = await new nc.CarEngine().init("../node_modules/canvaskit-wasm/bin/canvaskit.wasm");
const app = engine.createApp(document.querySelector("#canvas"));
const root = new nc.Circle(100);
const scene = new nc.Scene(root);
app.checkout(scene);
app.play();
```

First, we created a circle widget, which is a [offical extension of basic widget](/dev/basic-widget). The constructor's first parameter of this subclass is the radius of the circle, which we set to `100`.

Then, we created a `Scene` object and set the circle widget as the root widget of this scene. A scene can only have one root widget, but a root widget can have multiple child widgets, and these child widgets can have their own children, thus forming a tree structure for a scene.

Finally, we used the `App.checkout` method to switch to this scene and the `App.play` method to play the animation.

If you setup the project correctly, you will see a white circle on the screen.

## Adding Animation

```typescript
root.animate(nc.create, 0, 30);
```

This method will add an animation named `create` to this root widget and set the animation start at the first time unit.

Congratulations! You have learned the basic usage of the Newcar animation engine. We will explain more deeply later. If you like our project, feel free to join us and contribute or give us a free Star on our [Repository](https://github.com/dromara/newcar).
