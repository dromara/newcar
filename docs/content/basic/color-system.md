---
title: Color System
---

# Color System

The Widget objects in Newcar can be set to any color you like, managed by the `Color` object. Currently, there are three ways to set colors, and in future versions, we will introduce gradients and other color features.

## Direct Reference

This method can only support two colors - black and white.

```javascript
const rect = new Rect([0, 0], [100, 100], {
  style: {
    fillColor: Color.WHITE,
    border: true,
    borderColor: Color.BLACK
  }
})
```

## Using Color Name Strings

```javascript
const RED = Color.parse('red')
```

Color name string parsing supports all color names supported by CSS.

## RGBA

```javascript
Color.rgba(255, 255, 255, 0.5)
```

## Transform

You can transform the `Color` object as a variety of forms.

### `toString()`

You can use this function to transform a `Color` into css color string.

### `toFloat4()`

You can use this function to transform a `Color` into Skia color.

## More

You can visit [https://apis.newcarjs.org/classes/newcar.color](https://apis.newcarjs.org/classes/newcar.color) to get more API.