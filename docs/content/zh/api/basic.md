# Basic Lib of Widgets

## Widget 类

### 选项（Options）

- `id: string`：Widget 的唯一标识符。
- `parent: Widget`（可选）：Widget 的父级 Widget。
- `visible: boolean`（可选，默认值为 `true`）：Widget 是否可见。
- `position: Vector2`（可选，默认值为 `[0, 0]`）：Widget 在父级 Widget 中的位置。
- `size: Vector2`（可选，默认值为 `[0, 0]`）：Widget 的尺寸。
- `style: WidgetStyle`（可选）：Widget 的样式选项。

### 样式（Style）

- `backgroundColor: Color`（可选）：Widget 的背景颜色。
- `borderColor: Color`（可选）：Widget 边框的颜色。
- `borderWidth: number`（可选）：Widget 边框的宽度。
- `cornerRadius: number`（可选）：Widget 圆角的半径。
- `opacity: number`（可选，范围 0 到 1）：Widget 的不透明度。

## 继承者

`Widget` 类是其他图形元素类的基类，包括：

- `Figure`：用于绘制图形元素，如圆弧、矩形、箭头等。
- `Text`：用于显示文本内容。
- `ImageWidget`：用于显示图像。
- `Svg`：用于显示 SVG 图像。

这些继承者类可能具有自己的选项和样式，请参考各自的文档以了解更多细节。

## Figure 类（继承自 Widget）

### 选项（Options）

除了继承自 Widget 的选项外，Figure 类还具有以下选项：

- `style: FigureStyle`（可选）：Figure 的样式选项。

### 样式（Style）

除了继承自 Widget 的样式外，Figure 类还具有以下样式选项：

- `border: boolean`（可选，默认值为 `false`）：是否绘制边框。
- `borderColor: Color`（可选）：边框的颜色。
- `borderWidth: number`（可选）：边框的宽度。
- `fill: boolean`（可选，默认值为 `true`）：是否填充图形。
- `fillColor: Color`（可选）：填充的颜色。
- `join: StrokeJoin`（可选）：线条的连接样式。可选值包括 `miter`（尖角连接）、`round`（圆角连接）和 `bevel`（斜角连接）。
- `cap: StrokeCap`（可选）：线条的端点样式。可选值包括 `butt`（平端）、`round`（圆端）和 `square`（方端）。
- `offset: number`（可选）：线条的偏移量。正值将线条向外偏移，负值向内偏移。
- `interval: [number, number]`（可选）：线条的虚线间隔。数组中的第一个值表示线段的长度，第二个值表示空白的长度。

## Arc 类（继承自 Figure）

### 选项（Options）

除了继承自 Figure 的选项外，Arc 类还具有以下选项：

- `radius: number`：圆弧的半径。
- `from: number`：圆弧的起始角度（以度为单位）。
- `to: number`：圆弧的结束角度（以度为单位）。

## Circle 类（继承自 Arc）

Circle 类继承自 Arc 类，没有额外的选项或样式。

## Rect 类（继承自 Figure）

### 选项（Options）

除了继承自 Figure 的选项外，Rect 类还具有以下选项：

- `from: Vector2`：矩形左上角的坐标。
- `to: Vector2`：矩形右下角的坐标。

## Arrow 类（继承自 Figure）

### 选项（Options）

除了继承自 Figure 的选项外，Arrow 类还具有以下选项：

- `from: Vector2`：箭头的起始点坐标。
- `to: Vector2`：箭头的终点坐标。

## Polygon 类（继承自 Figure）

### 选项（Options）

除了继承自 Figure 的选项外，Polygon 类还具有以下选项：

- `points: Vector2[]`：多边形的顶点坐标数组。

## Line 类（继承自 Widget）

### 选项（Options）

除了继承自 Widget 的选项外，Line 类还具有以下选项：

- `from: Vector2`：线的起始点坐标。
- `to: Vector2`：线的终点坐标。
- `style: LineStyle`（可选）：线的样式选项。

### 样式（Style）

- `color: Color`（可选）：线的颜色。
- `width: number`（可选）：线的宽度。

## Path 类（继承自 Figure）

### 选项（Options）

除了继承自 Figure 的选项外，Path 类还具有以下选项：

- `path: Path`：路径对象，用于定义复杂的图形。Path 对象可以包含多个子路径、曲线、贝塞尔曲线等。

## Text 类（继承自 Widget）

### 选项（Options）

除了继承自 Widget 的选项外，Text 类还具有以下选项：

- `text: string | InputItem[]`：显示的文本内容或输入项数组。`InputItem` 对象包含文本字符串和其他样式选项。
- `style: TextStyle`（可选）：文本的样式选项。

### 样式（Style）

除了继承自 Widget 的样式外，Text 类还具有以下样式选项：

- `offset: number`（可选）：文本的偏移量。
- `interval: number[]`（可选）：文本的间隔。用于定义文本行之间的间隔或字符之间的间隔。
- `fill: boolean`（可选，默认值为 `true`）：是否填充文本背景。
- `border: boolean`（可选，默认值为 `false`）：是否绘制文本边框。
- `fillColor: Color`（可选）：文本背景的填充颜色。
- `borderWidth: number`（可选）：文本边框的宽度。
- `borderColor: Color`（可选）：文本边框的颜色。
- `disableHinting: boolean`（可选）：是否禁用字体提示。字体提示可以优化文本渲染，但可能会影响性能。
- `ellipsis: string`（可选）：文本截断时的省略号。当文本超出指定宽度时，使用省略号代替。
- `heightMultiplier: number`（可选）：文本高度的乘数。用于调整文本行高。
- `maxLines: number`（可选）：文本的最大行数。超过指定行数时，文本将被截断。
- `replaceTabCharacters: boolean`（可选）：是否替换制表符。将制表符替换为空格。
- `strutStyle: StrutStyle`（可选）：文本的撑杆样式。用于控制文本的最小高度和最大高度。
- `textAlign: TextAlign`（可选）：文本的对齐方式。可选值包括 `left`、`right`、`center` 和 `justify`。
- `textDirection: TextDirection`（可选）：文本的书写方向。可选值包括 `ltr`（从左到右）和 `rtl`（从右到左）。
- `textHeightBehavior: TextHeightBehavior`（可选）：文本的高度行为。控制文本行是否包含 ascent 和 descent。
- `applyRoundingHack: boolean`（可选）：是否应用圆角优化。在某些情况下，可以改善文本渲染效果。
- `width: number`（可选）：文本的宽度。超过指定宽度时，文本将被截断或换行。

## ImageWidget 类（继承自 Widget）

### 选项（Options）

除了继承自 Widget 的选项外，ImageWidget 类还具有以下选项：

- `imageArray: ArrayBuffer`：图像数据的数组缓冲区。图像数据应为 PNG 或 JPEG 格式。

## Svg 类（继承自 Widget）

### 选项（Options）

除了继承自 Widget 的选项外，Svg 类还具有以下选项：

- `svg: string`：SVG 字符串。包含 SVG 图像的 XML 代码。
- `style: SvgStyle`（可选）：SVG 的样式选项。

### 样式（Style）

- `width: number`（可选）：SVG 的宽度。
- `height: number`（可选）：SVG 的高度。
