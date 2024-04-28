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
});
```

## Using Color Name Strings

```javascript
const RED = Color.parse("red");
```

Color name string parsing supports all color names supported by CSS.

## RGBA

```javascript
Color.rgba(255, 255, 255, 0.5);
```
