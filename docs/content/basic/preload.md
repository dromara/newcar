---
title: Resource Preloading
---

# Resource Preloading

Resource preloading is a very crucial concept, mainly used for loading static resources that the animation will need in advance. The preloaded resources can all be found in the global variable `$source`.

## Font Preloading

```javascript
await useFont(url)
```

Here, `url` represents the location of the font file and returns an `ArrayBuffer` object. After that, you can use it in `Text`:

```javascript
root.add(new Text(['Hello Newcar']))
```

Since CanvasKit-WASM does not support CSS fonts, you need to prepare the font files yourself.

## Image Preloading

```javascript
const image = await useImage(url)
```

Then you can use it in `ImageWidget`:

```javascript
root.add(new ImageWidget(image))
```
