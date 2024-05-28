---
title: 交互系统
---

# 交互系统

你是否想过给你的Newcar动画添加一些更生动的内容？点击一个正方形切换到下一个场景？亦或者是将鼠标悬浮在某个图形上变大。交互系统可以实现你对这方面的一切幻想

在1.0.0-alpha.0中，我们正式发布了交互系统，你可以使用它们来让自己的动画像flash一样

我们将会以一个正方形被点击在控制台打印一个 `Clicked!` 来作为一个演示

```typescript
const root = new Rect([0, 0], [100, 100])
  .on(click, (widget, x, y) => {
    console.log('Clicked!')
  })

const scene = new Scene(root)
```

试着打开控制台并点击他，你将会看见 `Clicked!`  被打印在控制台上

除此之外，Newcar内置了许多种事件供你选择，具体请参见事件文档
