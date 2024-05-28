---
title: 动画
---

# 动画

Newcar 动画的底层逻辑就是在每一帧不断地改变一个对象的某个属性，在快速开始中，相信你已经掌握了 Newcar 动画的基本使用方法，现在我们看看一些细节。

如何定义一个动画？我们之前已经学习过了一个内置动画 `create`，除此之外，Newcar 还内置了许多种动画，以下是一些常用的动画：

- `create`
- `destroy`
- `rotate`
- `move`
- `scale`
- `zoomIn`
- `zoomOut`
- `transparency`
- `fadeIn`
- `fadeOut`
- ...

但是这些动画总不可能涵盖全部 `Widget` 的属性和样式，在 Newcar 的远古版本中，我们将每一个属性都写了一个对应的动画，这导致了打包后的体积奇大无比，这是得不偿失的。新版本的 Newcar采用 `changeProperty` API 和 `changeStyle` API 来改变对象的属性或值。`changeProperty` 与 `changeStyle` 的用法一致，区别是一个改变属性一个改变对象的样式。

```javascript
widget.animate(changeProperty('x', 0, 100), 0, 1)
// 或
widget.animate(changeProperty('x'), 0, 1, {
  from: 0,
  to: 120
})
```

`changeProperty` 和 `changeStyle` 也可以同时改变多个值：

```javascript
widget.animate(changeProperty(['x', 'y'], [0, 0], [100, 200]), 0, 1)
// 或
widget.animate(changeProperty('x'), 0, 1, {
  from: [0, 0],
  to: [100, 200]
})
```

`animate` 的第四个参数中可以定义 `by` 字段，用于设置这个动画的变速曲线。

Newcar 标准库中提供了多种变速曲线，且都以 `ease` 开头，可以通过代码补全提示或查看它们的 [函数图像](https://www.desmos.com/calculator/yasltaa9um) 来选择。
