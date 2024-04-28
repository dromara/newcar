---
title: 色彩系统
---

# 色彩系统

Newcar 的 Widget 对象可以设置任何你喜爱的颜色，它们由 `Color` 对象进行色彩管理。目前有三种方式来设置颜色，在未来的版本中，我们将会推出渐变色等色彩模式。

## 直接引用

这种方法只能支持两种颜色 —— 黑色与白色。

```javascript
const rect = new Rect([0, 0], [100, 100], {
  style: {
    fillColor: Color.WHITE,
    border: true,
    borderColor: Color.BLACK
  }
});
```

## 使用颜色名称字符串解析

```javascript
const RED = Color.parse("red");
```

颜色名称字符串解析支持 CSS 所支持的所有颜色名称。

## RGBA

```javascript
Color.rgba(255, 255, 255, 0.5);
```
