---
title: 逐帧调用
---

# 逐帧调用

Newcar 的每一个 `Widget` 对象都有一个 `setUpdate` 方法，通过这个方法设置的函数会在每一帧被调用，并且传入两个参数 —— 目前已经过去的帧数和这个对象它本身，这也体现了链式语法的优势。

用法：

```javascript
widget.setUpdate((elapsed, widget) => {
  if (elapsed === 100)
    widget.radius += 100
})
```

以上代码将会在第 100 帧时将圆的半径增加 100。
