---
title: 颜色系统
---

# 颜色系统

Newcar 中的 Widget 对象可以设置为你喜欢的任何颜色，这些颜色由 `Color` 对象管理。目前，有三种设置颜色的方法，并且在未来的版本中，我们将引入渐变和其他颜色特性。

## 直接引用

这种方法只能支持两种颜色 - 黑色和白色。

```javascript
const rect = new Rect([0, 0], [100, 100], {
  style: {
    fillColor: Color.WHITE,
    border: true,
    borderColor: Color.BLACK
  }
})
```

## 使用颜色名称字符串

```javascript
const RED = Color.parse('red')
```

颜色名称字符串解析支持所有 CSS 支持的颜色名称。

## RGBA

```javascript
Color.rgba(255, 255, 255, 0.5)
```

## 转换

你可以将 `Color` 对象转换为各种形式。

### `toString()`

你可以使用这个函数将 `Color` 转换为 CSS 颜色字符串。

### `toFloat4()`

你可以使用这个函数将 `Color` 转换为 Skia 颜色。

## 更多

你可以访问 [https://apis.newcarjs.org/classes/newcar.color](https://apis.newcarjs.org/classes/newcar.color) 获取更多 API 信息。