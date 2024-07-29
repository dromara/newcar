---
title: Property Animation
---

# Animation

The underlying principle of newcar animations is to continuously change an attribute of an object in each frame. In the quick start, you've already mastered the basic use of newcar animations. Now let's delve into more detail.

How do you define an animation? We have previously learned about the built-in animation `create`, and in addition to that, newcar has many other built-in animations. Here is a list of commonly used animations:

- create
- destroy
- rotate
- move
- scale
- zoomIn
- zoomOut
- fadeIn
- fadeOut
- ...

In the followings, I'll take you getting into the animation system and have a deeper understanding.

## Animation Step by Step

When you called the `Widget.animate` function, it will push your animation into a `Waiting Array` , and it will run these animations that you animated step by step

The most simple animation is `delay`, it's like its name - to do nothing in some time unit. For example, if you want to wait 3s and run `create` animation, you can code like followings:

```ts
new Circle(100)
  .animate(delay(3))
  .animate(create().withAttr({ duration: 1 }))
```

## Sync Animation

If you want to run two or more animations in same timeline, you can use `parallel()` to make it. The function allow you input two and more animations, and run them together.

For instance, if you want to let a circle run `create` animation with discoloring, you can:

```ts
new Circle(100)
  .animate(
    parallel(
      create().withAttr({ duration: 1 }),
      discolorate().withAttr({ duration: 1, to: Color.parse('skyblue') })
    )
  )
```

In addition, if you want to insert step-by-step animation, you can use `sequence` to make it.

```ts
new Circle(100)
  .animate(
    parallel(
      sequence(
        create().withAttr({ duration: 0.5 }),
        fadeIn().withAttr({ duration: 0.5 })
      ),
      discolorate().withAttr({ duration: 1, to: Color.parse('skyblue') })
    )
  )
```

## change property

Newcar offers a variety of animations that could be used, but it can't cover all the attributes, so `changeProperty` api is your best choice.

Usage:

```ts
circle.animate(
  changeProperty((w) => w.radius).withAttr({
    duration: 1,
    from: 100,
    to: 300
  })
)
```

## Easing Functions

In Newcar, some functions is spelled with "ease" at the begin, it can control your animation's speed action, we called them `TimingFunction`

you can use `by` parameter to receive a timing function:

```ts
circle.animate(
  create.withAttr({
    duration: 1,
    by: easeBounce
  })
)
```

Easing curve graph address: [https://www.desmos.com/calculator/yasltaa9um](https://www.desmos.com/calculator/yasltaa9um)
