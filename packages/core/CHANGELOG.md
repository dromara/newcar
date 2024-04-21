# @newcar/core

## 0.14.1

### Patch Changes

- fix: Failed to load sources under the node.
- Updated dependencies
  - @newcar/utils@0.14.1

## 0.14.0

### Minor Changes

- - Perfect types system
  - the copy function od `Widget`
  - the reverse mode of animation

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.14.0

## 0.13.1

### Patch Changes

- fix: rect progress fails loading in local mode
- Updated dependencies
  - @newcar/utils@0.13.1

## 0.13.0

### Minor Changes

- Local Mode of Newcar has been included in this version. Now you can use Newcar in Node with ncli!

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.13.0

## 0.12.2

### Patch Changes

- Add custom background color.
- Updated dependencies
  - @newcar/utils@0.12.2

## 0.12.1

### Patch Changes

- Fixed some import bug.
- Updated dependencies
  - @newcar/utils@0.12.1

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

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.12.0

## 0.11.1

### Patch Changes

- Fixed incorrect coordinate of `Text` and its children
- Updated dependencies
  - @newcar/utils@0.11.1

## 0.11.0

### Minor Changes

- This version basically move the old version(v0.7.0) into newcar next.

  ## Features

  - Add `Svg` widget
  - Add `EasingFunction` and change-speed animation.

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.11.0

## 0.10.4

### Patch Changes

- Fix some known bugs

  - fix: Failed to let rotation system invalid in some status.
  - fix: Incorrect parameters getting makes some animations invalid.

- Updated dependencies
  - @newcar/utils@0.10.4

## 0.10.3

### Patch Changes

- fix: Browser freezes when adding same composite component
- Updated dependencies
  - @newcar/utils@0.10.3

## 0.10.2

### Patch Changes

- Fix some known bugs
- Updated dependencies
  - @newcar/utils@0.10.2

## 0.10.1

### Patch Changes

- fix: Failed to load chain syntax after `Widget.setUpdate`
- Updated dependencies
  - @newcar/utils@0.10.1

## 0.10.0

### Minor Changes

- This version add Recorder package and fix known bug.

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.10.0

## 0.9.0

### Minor Changes

- The refactored and redesigned version.

### Patch Changes

- Updated dependencies
  - @newcar/utils@0.9.0
