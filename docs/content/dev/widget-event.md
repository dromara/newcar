---
title: Widget Event
---

# Widget Event

After understanding the definition of common events, we seem able to define any event.
However, if you have some experience with frameworks like `Vue`, you may notice that these frameworks often have some component(widget)-specific events, such as the following example:

```vue
<button @click="$emit('someEvent')">Click Me</button>
```

Component(widget) events are essentially encapsulations and abstractions of some common events in child components(widgets).
In this way, we can provide more flexible event handling methods and better encapsulate the logic of components(widgets).

To implement widget events, Newcar provides `registerEvent` and `emitEvent` methods for `Widget`, which are used to register and trigger widget events respectively.

## A Simple Example

First, let's look at a simple example:

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

In this example, we define a `MyWidget` component, which registers an event named `someEvent`,
and listens for the `click` event on the internal `BasicWidget` component. When the `click` event is triggered, the `someEvent` event is triggered.

The `registerEvent` method is used to register a widget event, which takes an event name as a parameter. Only registered events can be triggered.

The `emitEvent` method is used to trigger a widget event, which takes an event name as a parameter. Additional parameters can be passed in, which will be passed to the user-defined event handling function.

:::tip
Similar to Vue, widget events in Newcar do not support bubbling and can only be triggered and listened to in the component where the event is registered.
:::
