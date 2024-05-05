---
title: Interaction System
---

# Interaction System

Have you ever thought about adding some more dynamic content to your Newcar animations? Like clicking a square to switch to the next scene, or having a shape enlarge when you hover the mouse over it? The interaction system can make all your fantasies about this come true.

In version 1.0.0-alpha.0, we officially released the interaction system. You can use it to make your animations feel like Flash.

We will demonstrate this with a square that prints `Clicked!` in the console when clicked:

```typescript
const root = new Rect([0, 0], [100, 100])
  .on(click, (widget, x, y) => {
    console.log('Clicked!')
  })

const scene = new Scene(root)
```

Try opening the console and clicking on it; you will see `Clicked!` printed in the console.

Additionally, Newcar has many types of events built-in for you to choose from. For more details, please refer to the event documentation.
