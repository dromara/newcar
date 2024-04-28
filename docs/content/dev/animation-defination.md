# Animation Definition

In the previous section, we learned how to use an animation. The simplest way to define an animation is to use `changeProperty` and `changeStyle`. In this section, we will explore the definition of animations in more detail.

First, we need to import a function for defining animations:

```typescript
import { defineAnimation } from "@newcar/core";
```

Then, we can define an animation operation that will be called on each frame:

```typescript
const myAnimation = defineAnimation({
  operation(widget, elapsed, process) {}
});
```

In the above code, `process` represents the progress of the animation, ranging from 0 to 1.

`widget` is the object on which the animation operates.

`elapsed` represents the number of frames that have passed since the start of the animation.
