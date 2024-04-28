---
title: 资源预加载
---

资源预加载是一个非常关键的概念，它主要用于提前加载动画需要用到的静态资源。预加载的资源都可以在全局变量 `$source` 中找到

## 字体预加载

```javascript
await useFont(url);
```

其中， `url` 代表字体文件的位置，并返回一个 `ArrayBuffer` 对象，然后你就可以在 `Text` 中使用它了：

```javascript
root.add(new Text(["Hello Newcar"]));
```

因为 CanvasKit-WASM 不支持 CSS 的字体，所以字体文件需要自己准备。

## 图片预加载

```javascript
const image = await useImage(url);
```

然后你可以在 `ImageWidget` 使用它：

```javascript
root.add(new ImageWidget(image));
```
