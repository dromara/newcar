---
title: Setup 语法
---

# Setup 语法

你有没有觉得使用Newcar来创建动画太麻烦了?在1.0.0-beta版本之后,我们添加了Setup语法,为用户提供了更大的灵活性。 

## 生成器函数

首先, 我们需要调用 `Widget.setup()` 方法并传入一个 [生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions), 这将是逻辑代码的入口点。第一个参数是 `Widget` 实例.

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  console.log(widget.x, widget.y)
  // Output: 100 100
})
```

## 暂停

当我们想要将动画暂停几秒，几毫秒或几帧时，我们可以使用 `yield` 关键字来返回一个数字。

```ts
import * as nc from 'newcar'
new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1 // Wait for 1 second
  widget.x = 100
  yield 3 // Wait for 3 seconds
  widget.x = 200
})
```

## 动画

我们如何插入动画？只需产出你想要动画化的内容。

```ts
import * as nc from 'newcar'

new Widget({
  x: 100,
  y: 100
}).setup(function* (widget) {
  yield 1
  yield nc.create().withAttr({ duration: 1 })
})
```

这段代码将在1秒后执行 `create` 动画。