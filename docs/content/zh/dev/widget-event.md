---
title: 组件事件
---

# 组件事件

了解了通用事件的定义以后，我们似乎已经可以自定义任何事件了。
但是，如果你有了解过一些类似 `Vue` 这样的框架，你会注意到这些框架中往往有一些特定于组件的事件，比如下面的这个例子：

```vue
<button @click="$emit('someEvent')">Click Me</button>
```

组件事件本质上是对于子组件的一些通用事件的封装和抽象，通过这种方式，我们可以提供更灵活的事件处理方式，同时也可以更好地封装组件的逻辑。

为了实现组件事件，Newcar 中为 `Widget` 提供了 `registerEvent` 和 `emitEvent` 方法，分别用于注册和触发组件事件。

## 一个简单的例子

首先，我们来看一个简单的例子：

```typescript
import { Widget } from '@newcar/core'

export class MyWidget extends Widget {
  constructor() {
    super()
    this.registerEvent('someEvent')
    this.add(
      new BasicWidget()
        .on('click', () => {
          this.emitEvent('someEvent')
        })
    )
  }
}
```

在这个例子中，我们定义了一个 `MyWidget` 组件，它注册了一个名为 `someEvent` 的事件，
并在内部的 `BasicWidget` 组件上监听了 `click` 事件，当 `click` 事件触发时，会触发 `someEvent` 事件。

`registerEvent` 方法用于注册一个组件事件，它接收一个事件名作为参数，只有注册过的事件才能被触发。

`emitEvent` 方法用于触发一个组件事件，它接收一个事件名作为参数，可以传入额外的参数，这些参数会传递给用户自定的事件处理函数。

:::tip
与 Vue 类似，Newcar 中的组件事件也不支持冒泡，只能在当前注册了事件的组件中触发和监听。
:::
