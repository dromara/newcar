## Achieve
- objects: Text stroke.

# v0.5.0-alpha.1 (2023.9.9)
## Bug Fixes
- newcar: fix the undefined value of `options.backgroundColor`, this bug is fatal.

# v0.5.0-alpha.0 (2023.9.9)
## Achieve
- objects: Add rotation center for objects.
- objects: Implement rotation center.
- objects: number display on `CoordinateSystem`.
- objects: number display on `NumberAxis`.
- objects: new object `Svg`.
- objects: new object `Tex`.
- objects: Add utils function `getAbsoluteCoordinate`.
- objects: Change the default value of `Point.size`.
- objects: Change the default value of `Text.size`.
- objects: Add new function `beforeTranslate` for `Carobj`.
- animation-builder: Add animation `Division`, `FontSize` and `Radius`.
- animation-builder: Add animation `FadeIn`, `FadeOut`, `Grow`.
- animation-builder: Add animation `RotateIn`, `RotateOut`.
- utils: Add `Color`.

## Breaking Change
- objects: Rename `AngleCircle` to `CircleAngle`.
- objects: Rename `HTMLPlugin` to `WebView`.
- objects: Rename `ImagePlugin` to `Image`.
- objects: Deprecated `Pen` and `Polygon`.
- objects: Delete parameters `x_width` and `y_width` of `CoordinateSystem`.
- objects: Change the color input method(use `Color`).
- objects: Change the API of `CoordinateSystem` and `NumberAxis`.
- objects: Change the setting way of `Rectangle`.
- objects: Change the default value of `Text.align`.
- objects: Change the center of `Rectangle`.
- objects: Change the center of `Image`.
- objects: Change the center of `Svg`.

## Bug Fixes
- core: `onSet` isn't be run on children.
- objects: `Circle` cannot be displayed properly.
- objects: Two Point objects cannot connect to city lines at different levels.