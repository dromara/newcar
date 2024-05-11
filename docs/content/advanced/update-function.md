---
title: Frame-by-Frame Invocation
---

# Frame-by-Frame Invocation

Every `Widget` object in Newcar has a `setUpdate` method. The function set by this method is called in each frame and is passed two parameters - the number of frames that have already passed and the object itself. This also reflects the advantages of chain syntax.

Usage:

```javascript
widget.setUpdate((elapsed, widget) => {
  if (elapsed === 100)
    widget.radius += 100
})
```

The above code will increase the radius of the circle by 100 at the 100th frame.
