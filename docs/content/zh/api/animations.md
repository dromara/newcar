# 动画文档

动画在用户界面中用于增强视觉效果和改善用户体验。以下是一些常用动画的详细说明和示例。

## `fadeIn`

`fadeIn` 动画逐渐增加组件的透明度，使其从完全透明渐变为完全不透明，从而实现淡入效果。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
widget.animate(fadeIn, 0, 1000); // 开始时间为0，持续时间为1000
```

## `fadeOut`

`fadeOut` 动画逐渐减少组件的透明度，使其从完全不透明渐变为完全透明，从而实现淡出效果。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
widget.animate(fadeOut, 0, 1000); // 开始时间为0，持续时间为1000
```

## `move`

`move` 动画改变组件的位置，从一个坐标点移动到另一个坐标点。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
// 移动widget从坐标(100, 100)到(200, 200)
widget.animate(move, 0, 1000, { from: [100, 100], to: [200, 200] }); // 开始时间为0，持续时间为1000
```

## `rotate`

`rotate` 动画使组件根据指定的角度进行旋转。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
// 旋转widget 360度
widget.animate(rotate, 0, 1000, { from: 0, to: 360 }); // 开始时间为0，持续时间为1000
```

## `scale`

`scale` 动画改变组件的大小，通过调整其宽度和高度的缩放比例。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
// 将widget的缩放比例从1调整到2
widget.animate(scale, 0, 1000, { from: [1, 1], to: [2, 2] }); // 开始时间为0，持续时间为1000
```

## `roomIn`

`roomIn` 动画使组件从缩放比例0（完全不可见）逐渐增大到1（原始大小），实现一种“放大进入”的视觉效果。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
// 使widget从无到有逐渐放大显示
widget.animate(roomIn, 0, 1000); // 开始时间为0，持续时间为1000
```

## `roomOut`

`roomOut` 动画使组件从原始大小缩小到0（完全不可见），实现一种“缩小退出”的视觉效果。

### 示例：

```javascript
// 假设有一个已经创建的Widget实例名为widget
// 使widget逐渐缩小直至消失
widget.animate(roomOut, 0, 1000); // 开始时间为0，持续时间为1000
```

## `stroke`

`stroke` 动画用于动态调整图形组件的描边效果，如虚线的间隔和偏移，可以用来创建闪烁或者跑马灯的效果。

### 示例：

```javascript
// 假设有一个图形类Widget实例名为shape，支持描边样式
// 动态调整描边的间隔和偏移来创建动画效果
shape.animate(stroke, 0, 1000); // 开始时间为0，持续时间为1000
```

## `create`

`create` 动画用于逐渐绘制新创建的组件，通常与透明度或缩放动画结合使用，从而使组件从无到有地平滑出现。

### 示例：

```javascript
// 假设有一个新创建的Widget实例名为newWidget
// 使newWidget逐渐从透明变为不透明
newWidget.animate(create, 0, 1000); // 开始时间为0，持续时间为1000
```

## `destroy`

`destroy` 动画用于逐渐擦除并准备销毁组件，通常与透明度或缩放动画结合使用，从而使组件平滑消失。

### 示例：

```javascript
// 假设有一个即将被移除的Widget实例名为oldWidget
oldWidget.animate(destroy, 0, 1000); // 开始时间为0，持续时间为1000
```

这些动画提供了丰富的视觉效果，帮助开发者在创建交互动态界面时，能够更好地引导用户的注意力和提升用户体验。通过合理地应用这些动画，可以使应用程序的UI显得更加生动和吸引人。
