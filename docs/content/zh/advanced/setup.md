---
title: Setup语法
---

# Setup 语法

当你在使用Newcar进行插帧的时候，你有没有想过这样未免有些太麻烦了呢？在1.0.0-beta版本后，我们添加了setup语法可供用户自由选择。

## 生成器函数

首先我们需要调用`Widget.setup()`方法并传入一个[生成器函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions)，这个生成器函数将是你逻辑代码的入口，第一个参数是`Widget`实例。

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  console.log(widget.x, widget.y)
  // 输出: 100 100
})
```

## 等待

当我们想让动画等待几秒，几毫秒或几帧时，我们可以使用`yield`关键字，返回一个数字。

```ts
import * as nc from 'newcar'
new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1 // 等待1秒
  widget.x = 100
  yield 3 // 等待3秒
  widget.x = 200
})
```

## 动画

如何插入动画？我们提供了一个API叫做 `animate` , 他是一个函数，区别于 `Widget.animate`, 他只能在setup里使用，且不需要传入动画开始的时间

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1
  yield animate(nc.create, 10)
})
```

此代码将在1秒后执行 `create` 动画

默认的动画是同步进行的，你也可以使用一种“伪异步”将多个动画同时间段执行，比如下面这段代码就是同时执行两个动画。

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield animate(nc.create, 10).setAsync()
  yield animate(nc.move, 10, {
    from: [0, 0],
    to: [200, 200]
  }).setAsync()
})
```