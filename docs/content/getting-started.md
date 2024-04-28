---
title: Getting Started Guide
---

# Getting Started Guide

Welcome to the beginner's guide for the Newcar animation engine! Here, you will learn some of the fundamental concepts and knowledge about Newcar, including:

- `CarEngine`
- `App`
- `Scene`
- `Widget`
- `Animation`

These concepts will be explained in detail in future documents. This guide will briefly introduce the basic usage of the Newcar animation engine, allowing you to quickly grasp the development philosophy of Newcar. Without further ado, let's get started!

## Creating a Newcar Project

"To do a good job, an artisan needs the best tools."

First, you need to prepare the following:

- Node.js
- NPM/PNPM/YARN
- A modern code editor, such as VSCode, Webstorm, etc.
- A browser that supports WebAssembly compilation, here we recommend the latest versions of Firefox, Chrome, Edge

We recommend using PNPM and Vite to create our project. For the sake of demonstration, we will use a Vanilla environment, but you can also choose your preferred framework.

```shell
$ pnpm create vite my-newcar-project
$ cd my-newcar-project
$ pnpm install
```

Next, we need to install two things: Newcar itself and CanvasKit-WASM.

```shell
$ pnpm add newcar
$ pnpm add canvaskit-wasm
```

We can see that Vite has automatically included `main.ts` in `index.html`. Let's clear everything in `main.ts` and add a `<canvas>` tag in the `<body>` section of `index.html`.

```html
<canvas width="1600" height="900" id="canvas"></canvas>
```

Then, add the following code in `main.ts`.

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

First, we created a root, which is a `Widget` subclass `Circle`. The constructor's first parameter of this subclass is the radius of the circle, which we set to `100`.

Next, we created a `Scene` object and set root as the root widget of this scene. A scene can only have one root widget, but a root widget can have multiple child widgets, and those child widgets can have their own children, thus forming a tree structure for a scene.
Finally, we used the `App.checkout` method to switch to this scene and the `App.play` method to play the animation.

If everything is correct, you should see a white circle with a radius of `100` on the canvas.

## Adding Animation

```typescript
root.animate(nc.create, 0, 30);
```

This method will add an animation named `create` to this root widget and set the animation start at the 0th time unit.

Congratulations! You have now understood the basic usage of the Newcar animation engine. We will explain each concept in detail next. If you like our project, feel free to join us and contribute or give us a free Star on GitHub.
