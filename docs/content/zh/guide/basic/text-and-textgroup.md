---
title: Text与TextGroup
---

# `Text` 与 `TextGroup`

## `Text`

Text 组件用于在图表上添加文本，支持文本的样式设置，以及文本的布局设置。

我们需要先预加载一个字体，关于预加载，请参考[这里](/zh/basic/preload)，然后我们就可以使用 `Text` 组件来添加文本了。

然后便是宽度，我们需要自行估计字体所占的宽度，默认是 `100`, 然后我们设置`width`的值

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

效果:

![效果](/basic/text-and-textgroup-01.png)

关于更多的API，请参考API文档：[https://apis.newcarjs.org/classes/newcar.text](https://apis.newcarjs.org/classes/newcar.text)

## `TextGroup`

`TextGroup`是一个文本集合，它包含多个`Text`组件，并且可以对它们进行布局设置。

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

效果：

![效果](/basic/text-and-textgroup-02.png)

完整API：[https://apis.newcarjs.org/classes/newcar.textgroup](https://apis.newcarjs.org/classes/newcar.textgroup)
