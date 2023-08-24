# 0.4.0 ()

## Bug Fixes
- newcar: Incorrect console log in Chrome.
- animation-builder: Confusing the concepts of lastsFor and lastsAt.
- objects: The incorrect animation effect of `CoordinateSystem`.

## Achieve
- objects: Add parameters(axis width, number point, grid and so on)
- objects: Add a new object `NumberAxis`
- animation-builder: Add `AxisLimit2d` and `AxisLimit`

## Breaking Change
- Change the API for all the animation-builder-items,for instace:
### Past
```javascript
new Translation({
  startAt: 0,
  lastsFor: 100,
  to: [100, 100],
  bindTo: text
});
```
### Now
```javascript
new Translation(text, {
  startAt: 0,
  lastsFor: 100,
  to: [100, 100]
});
```
