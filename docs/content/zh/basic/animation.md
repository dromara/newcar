---
title: 属性动画
---

<script setup lang="ts">
import { default as DemoDiscolorate } from '../../basic/demos/animation/discolorate.vue'
import { default as DemoFadeIn} from '../../basic/demos/animation/fadeIn.vue'
</script>


# 动画

newcar 动画的基本原理是在每一帧中不断改变对象的属性。在快速入门中，您已经掌握了 newcar 动画的基本用法。现在让我们深入研究更多细节。

我们都支持哪些动画？我们之前已经了解了内置动画 `create`，除此之外，newcar 还有许多其他内置动画。以下是常用动画的列表：

- create
- destroy
- rotate
- move
- scale
- zoomIn
- zoomOut
- fadeIn
- fadeOut
- ...

在接下来的内容中，我将带您深入了解动画系统。

## 步进动画

当您调用 `Widget.animate` 函数时，它会将您的动画推入一个 `等待数组`，然后逐步运行所创建的动画。

最简单的动画是 `延迟`，就像它的名字一样-在某个时间单位内什么都不做。例如，如果您想等待3秒然后运行 `创建` 动画，您可以编写如下代码：

```ts
new Circle(100)
  .animate(delay(3))
  .animate(create().withAttr({ duration: 1 }))
```

## 同步动画

如果您想在同一时间轴上同时运行两个以上动画，您可以使用 `parallel()` 来实现。该函数允许您输入两个以上动画，并同时运行它们。

例如，如果您想让一个圆形运行 `创建` 动画并且变色，您可以：

```ts
new Circle(100)
  .animate(
    parallel(
      create().withAttr({ duration: 1 }),
      discolorate().withAttr({ duration: 1, to: Color.parse('skyblue') })
    )
  )
```
<DemoDiscolorate/>

如果您想插入逐步动画，可以使用 `sequence` 来制作。

```ts
new Circle(100)
  .animate(
    parallel(
      sequence(
        create().withAttr({ duration: 0.5 }),
        fadeIn().withAttr({ duration: 0.5 })
      ),
      discolorate().withAttr({ duration: 1, to: Color.parse('skyblue') })
    )
  )
```
<DemoFadeIn/>

## 更改属性

尽管newcar提供了各种可以使用的动画，但它仍旧无法涵盖所有属性，因此 `changeProperty` API是您的最佳选择。

用法:

```ts
circle.animate(
  changeProperty((w) => w.radius).withAttr({
    duration: 1,
    from: 100,
    to: 300
  })
)
```

## 缓动函数

在Newcar中，一些功能以 `ease` 开头拼写，可以控制您的动画速度，我们称之为 `缓动`。

请使用 `by` 参数来接收一个缓动函数。

```ts
circle.animate(
  create.withAttr({
    duration: 1,
    by: easeBounce
  })
)
```

缓动函数的曲线图地址: [https://www.desmos.com/calculator/yasltaa9um](https://www.desmos.com/calculator/yasltaa9um)
