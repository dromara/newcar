---
title: 资源预加载
---

# 资源预加载

资源预加载是一个非常关键的概念，主要用于提前加载动画所需要的静态资源。预加载的资源均可以在全局变量 `$source` 中找到.

## 字体预加载

```javascript
await useFont(url)
```

在这，`url` 表示字体文件的位置，并将返回一个 `ArrayBuffer` 对象。之后，您可以在 `Text` 中使用它：

```javascript
root.add(new Text('Hello Newcar'))
```

但是由于 CanvasKit-WASM 不支持 CSS 字体，因此您需要自己准备字体文件。

## 图片预加载

```javascript
const image = await useImage(url)
```

然后，您可以在 `ImageWidget`中使用它：

```javascript
root.add(new ImageWidget(image))
```
