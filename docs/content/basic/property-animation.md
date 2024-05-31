---
title: Property Animation
---

# Property Animation

The underlying principle of newcar animations is to continuously change an attribute of an object in each frame. In the quick start, you've already mastered the basic use of newcar animations. Now let's delve into more detail.

How do you define an animation? We have previously learned about the built-in animation `create`, and in addition to that, newcar has many other built-in animations. Here is a list of commonly used animations:

- create
- destroy
- rotate
- move
- scale
- zoomIn
- zoomOut
- transparency
- fadeIn
- fadeOut
- ...

However, it's not possible for these animations to cover all properties and styles of a `Widget`. In the ancient versions of newcar, we wrote a corresponding animation for each property, which resulted in an incredibly large bundle size after packaging. This was a loss that was not worth the gain. The new version of newcar uses the `changeProperty` API and `changeStyle` API to change the attributes or values of objects. `changeProperty` and `changeStyle` are used in the same way, the difference is that one changes properties and the other changes the object's style.

```javascript
widget.animate(changeProperty('x', 0, 100))
// Or
widget.animate(changeProperty('x'), {
  from: 0,
  to: 120
})
```

`changeProperty` and `changeStyle` can also change multiple values at the same time

```javascript
widget.animate(changeProperty(['x', 'y'], [0, 0], [100, 200]))
// Or
widget.animate(changeProperty('x'), {
  from: [0, 0],
  to: [100, 200]
})
```

The fourth parameter of `animate` can include a `by` field, which is used to set the easing curve of the animation.

The Newcar standard library provides a variety of easing curves, all starting with `ease`, and you can choose by using code hints or by viewing the function's graph.

Easing curve graph address: [https://www.desmos.com/calculator/yasltaa9um](https://www.desmos.com/calculator/yasltaa9um)
