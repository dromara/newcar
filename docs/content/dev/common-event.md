---
title: Common Event
---

# Common Event

In the previous sections, we have learned how to use the built-in events of Newcar to achieve rich interactive effects. In fact, the event system of Newcar is very flexible; you can customize any event to achieve the effect you want.

In general, the events in Newcar can be divided into two categories: one is common events (such as `click`, `drag`, etc.), which usually need to be imported separately and are applicable to all components;
The other is component events, which are specific to a component, registered and triggered in the component, and listened to through passing the event name as a string, without the need to import the event object separately.

Can't quite understand? No problem, let's start with common events first.

## `defineEvent`

First, we need to import a function for defining common events:

```typescript
import { defineEvent } from '@newcar/core'
```

Similar to `defineAnimation`, Newcar provides a `defineEvent` function for defining common events.
This function takes a parameter that implements the `Event` interface and returns an `Event` object, which can be passed as a parameter to `Widget.on` to define the behavior of the event.

```typescript
export function defineEvent<T extends Widget>(event: Event<T>): Event<T> {
  return event
}
```

## `Event` Interface

The `Event` interface is defined as follows:

```typescript
/**
 * The event interface.
 */
export interface Event<T> {
  /**
   * The operation when set event.
   * @param widget The widget's self.
   * @param effect The effect function of this widget.
   * @param element The canvas element of this app.
   * @returns
   */
  operation: (
    widget: T,
    effect: (widget: Widget, ...arg: any[]) => any,
    element: HTMLCanvasElement,
  ) => void

  /**
   * The effect function of this event. Only used in the widget-based event.
   * @param widget The widget's self.
   * @param args The external arguments.
   * @returns
   */
  effects?: ((widget: Widget, ...arg: any[]) => any)[]
}
```

The `Event` interface defines a method `operation` and an optional property `effects`, in this case, we only need to focus on the `operation` method.

The `operation` method is used to register event listeners and takes three parameters:

- `widget`: The component to which the event is bound.
- `effect`: The effect function of the event, which is the user-defined event handling function.
- `element`: The canvas element of the application.

## Defining an Event Using `defineEvent`

Let's take a look at an example of defining a simple click event:

```typescript
import { Widget, defineEvent } from '@newcar/core'

export const click = defineEvent({
  operation(
    widget,
    effect: (widget: Widget, x: number, y: number) => any,
    element,
  ) {
    element.addEventListener('click', (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const absoluteX = event.clientX - rect.left
      const absoluteY = event.clientY - rect.top
      const { x, y } = Widget.absoluteToRelative(widget, absoluteX, absoluteY)
      const { x: pX, y: pY } = widget.coordinateChildToParent(x, y)
      const isIn = widget.isIn(pX, pY)
      if (isIn)
        effect(widget, x, y)
    })
  },
})
```

In this example, we define a `click` event that triggers the effect function `effect` when the component is clicked, and passes the coordinates of the click.

:::tip
There is one thing to note: since the event listener is bound to the canvas element, we sometimes need to convert absolute coordinates to relative coordinates and relative coordinates to the parent component's coordinates.

In this example, we use the `Widget.absoluteToRelative` method to convert absolute coordinates to relative coordinates, and the `Widget.coordinateChildToParent` method to convert relative coordinates to the parent component's coordinates.
:::

We can also define other events, such as `drag`, `mouseEnter`, `mouseLeave`, etc., by modifying the example above.

In addition, you can also define events in different ways, just call the `effect` function when you want to trigger the event.
