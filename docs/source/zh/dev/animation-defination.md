# 动画定义

前面我们已经学过了如何使用一个动画，最简单的定义方式就是 `changeProperty` 和 `changeStyle`, 本篇我们来由表及里探讨动画的定义

首先，我们需要先引入一个定义动画的函数：

```typescript
import { defineAnimation } from "@newcar/core";
```

然后我们来定义一个operation,用来在每帧调用

```typescript
const myAnimation = defineAnimation({
  operation(widget, elapsed, process) {}
});
```

其中，process代表动画播放的完整度，取值为[0, 1],

widget为这个动画操作的对象

elapsed表示距离动画开始已经过了多少帧了
