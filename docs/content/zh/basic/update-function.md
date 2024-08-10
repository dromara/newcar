---
title: 帧逐调用
---

# 帧逐调用

Newcar 中的每个 `Widget` 对象都有一个 `setUpdate` 方法。通过此方法设置的函数将在每一帧中被调用，并传递两个参数——已过去的帧数和对象本身。这也体现了链式语法的优势。

用法示例：

```javascript
widget.setUpdate((elapsed, widget) => {
  if (elapsed === 100)
    widget.radius.value += 100
})
```

上述代码将在第 100 帧时将圆的半径增加 100。