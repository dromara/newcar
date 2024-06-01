---
title: Text 与 TextGroup
---

# `Text` 与 `TextGroup`

## `Text`

`Text` 组件用于在图表上添加文本，支持文本的样式设置，以及文本的布局设置。

我们需要先预加载一个字体，关于预加载，请参考[资源预加载](../../basic/preload)，然后我们就可以使用 `Text` 组件来添加文本了。

在使用 `Text` 组件时，我们需要估计并设置文字所占的最大宽度（容器宽度），默认是 `100`。

```ts
import * as nc from 'newcar'

// 省略一部分代码

widget.add(
  new nc.Text('Hello world!', {
    x: 100,
    y: 100,
    style: {
      color: nc.Color.parse('skyblue'),
      fontSize: 50
    },
    width: 500
  }),
)

// 省略一部分代码

```

![Text 组件的演示，天蓝色的「Hello world!」](/basic/text-and-textgroup-01.png)

## `TextGroup`

`TextGroup` 是一个文本集合，它包含多个 `Text` 组件，并支持更多的布局设置。

```ts
import * as nc from 'newcar'

// 省略一部分代码

widget.add(
  new nc.TextGroup([
    new nc.Text('Hello', {
      x: 100,
      y: 100,
      style: {
        color: nc.Color.parse('skyblue'),
        fontSize: 50
      }
    }),
    new nc.Text(' world!', {
      x: 100,
      y: 150,
      style: {
        color: nc.Color.parse('red'),
        fontSize: 30
      }
    }),
      // ...
  ], {
    width: 600,
    x: 200,
    y: 200
  })
)

// 省略一部分代码

```

![TextGroup 组件的演示，天蓝色较大的「Hello」和红色的较小的「 world!」](/basic/text-and-textgroup-02.png)

## 参见：

- [资源预加载](../../basic/preload)
- [`Text`](https://apis.newcarjs.org/classes/newcar.text)
- [`TextGroup`](https://apis.newcarjs.org/classes/newcar.textgroup)
