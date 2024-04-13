# @newcar/recorder

## 0.12.1

### Patch Changes

- Fixed some import bug.

## 0.12.0

### Minor Changes

- This version add some widgets in basic lib and fix some known bugs.

  #### Bugs Fixed

  - tip of arrows' direction is wrong
  - getting double vector when widgets scaled.

  #### Features

  - LineJoin and LineCap
  - the offset and interval of paths
  - stroke animation
  - Update Text to Skia(CanvasKit-WASM)'s Paragraph
  - perfect diff algorithm

  #### Breaking Changes

  - the first parameters of constructor of `Text` has been changed to `(text | InputItem)[]`

## 0.11.1

### Patch Changes

- Fixed incorrect coordinate of `Text` and its children

## 0.11.0

### Minor Changes

- This version basically move the old version(v0.7.0) into newcar next.

  ## Features

  - Add `Svg` widget
  - Add `EasingFunction` and change-speed animation.

## 0.10.4

### Patch Changes

- Fix some known bugs

  - fix: Failed to let rotation system invalid in some status.
  - fix: Incorrect parameters getting makes some animations invalid.

## 0.10.3

### Patch Changes

- fix: Browser freezes when adding same composite component

## 0.10.2

### Patch Changes

- Fix some known bugs

## 0.10.1

### Patch Changes

- fix: Failed to load chain syntax after `Widget.setUpdate`

## 0.10.0

### Minor Changes

- This version add Recorder package and fix known bug.
