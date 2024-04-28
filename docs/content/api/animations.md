# Animation Documentation

Animations in user interfaces enhance visual effects and improve the user experience. Here is a detailed description and examples of some commonly used animations:

## `fadeIn`

The `fadeIn` animation gradually increases the opacity of a component, transitioning it from fully transparent to fully opaque, creating a fade-in effect.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
widget.animate(fadeIn, 0, 1000); // Start time is 0, duration is 1000
```

## `fadeOut`

The `fadeOut` animation gradually decreases the opacity of a component, transitioning it from fully opaque to fully transparent, creating a fade-out effect.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
widget.animate(fadeOut, 0, 1000); // Start time is 0, duration is 1000
```

## `move`

The `move` animation changes the position of a component by moving it from one coordinate to another.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
// Move widget from coordinate (100, 100) to (200, 200)
widget.animate(move, 0, 1000, { from: [100, 100], to: [200, 200] }); // Start time is 0, duration is 1000
```

## `rotate`

The `rotate` animation rotates a component by a specified angle.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
// Rotate widget by 360 degrees
widget.animate(rotate, 0, 1000, { from: 0, to: 360 }); // Start time is 0, duration is 1000
```

## `scale`

The `scale` animation changes the size of a component by adjusting the scale factor of its width and height.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
// Adjust the scale of widget from 1 to 2
widget.animate(scale, 0, 1000, { from: [1, 1], to: [2, 2] }); // Start time is 0, duration is 1000
```

## `roomIn`

The `roomIn` animation starts with a scale factor of 0 (completely invisible) and gradually increases it to 1 (original size), creating a "zoom-in" visual effect.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
// Make widget gradually appear by zooming in
widget.animate(roomIn, 0, 1000); // Start time is 0, duration is 1000
```

## `roomOut`

The `roomOut` animation scales down a component from its original size to a scale factor of 0 (completely invisible), creating a "zoom-out" visual effect.

### Example:

```javascript
// Assuming there is an already created Widget instance named widget
// Make widget gradually disappear by zooming out
widget.animate(roomOut, 0, 1000); // Start time is 0, duration is 1000
```

## `stroke`

The `stroke` animation is used to dynamically adjust the stroke effect of a graphical component, such as the dash interval and offset of a dashed line, to create flashing or marquee effects.

### Example:

```javascript
// Assuming there is a graphical Widget instance named shape that supports stroke styles
// Dynamically adjust the stroke interval and offset to create an animation effect
shape.animate(stroke, 0, 1000); // Start time is 0, duration is 1000
```

## `create`

The `create` animation is used to gradually draw a newly created component, often combined with opacity or scale animations to smoothly bring the component into view.

### Example:

```javascript
// Assuming there is a newly created Widget instance named newWidget
// Make newWidget gradually transition from transparent to opaque
newWidget.animate(create, 0, 1000); // Start time is 0, duration is 1000
```

## `destroy`

The `destroy` animation is used to gradually erase and prepare a component for destruction, often combined with opacity or scale animations to smoothly remove it from view.

### Example:

```javascript
// Assuming there is a Widget instance named oldWidget that is about to be removed
oldWidget.animate(destroy, 0, 1000); // Start time is 0, duration is 1000
```

These animations provide a rich set of visual effects that help developers guide user attention and improve the user experience when creating interactive and dynamic interfaces. By applying these animations appropriately, the UI of an application can become more engaging and visually appealing.
