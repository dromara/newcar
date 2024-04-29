# Basic Library of Widgets

## Widget Class

### Options

- `id: string`: A unique identifier for the Widget.
- `parent: Widget` (optional): The parent Widget of this Widget.
- `visible: boolean` (optional, default is `true`): Whether the Widget is visible.
- `position: Vector2` (optional, default is `[0, 0]`): The position of the Widget within its parent Widget.
- `size: Vector2` (optional, default is `[0, 0]`): The size of the Widget.
- `style: WidgetStyle` (optional): Style options for the Widget.

### Style

- `backgroundColor: Color` (optional): Background color of the Widget.
- `borderColor: Color` (optional): Border color of the Widget.
- `borderWidth: number` (optional): Border width of the Widget.
- `cornerRadius: number` (optional): Radius of the corners of the Widget.
- `opacity: number` (optional, range 0 to 1): Opacity of the Widget.

## Inheritors

The `Widget` class is the base class for other graphical element classes, including:

- `Figure`: Used to draw graphical elements such as arcs, rectangles, arrows, etc.
- `Text`: Used to display text content.
- `ImageWidget`: Used to display images.
- `Svg`: Used to display SVG images.

These inheritor classes may have their own options and styles. Refer to their respective documentation for more details.

## Figure Class (Inherits from Widget)

### Options

In addition to the options inherited from Widget, the Figure class has the following options:

- `style: FigureStyle` (optional): Style options for the Figure.

### Style

In addition to the styles inherited from Widget, the Figure class has the following style options:

- `border: boolean` (optional, default is `false`): Whether to draw a border.
- `borderColor: Color` (optional): Color of the border.
- `borderWidth: number` (optional): Width of the border.
- `fill: boolean` (optional, default is `true`): Whether to fill the figure.
- `fillColor: Color` (optional): Fill color of the figure.
- `join: StrokeJoin` (optional): Style of the line join. Options include `miter` (sharp corners), `round` (rounded corners), and `bevel` (angled corners).
- `cap: StrokeCap` (optional): Style of the line cap. Options include `butt` (flat end), `round` (rounded end), and `square` (squared-off end).
- `offset: number` (optional): Offset of the line. Positive values offset the line outward, negative values inward.
- `interval: [number, number]` (optional): Dash interval of the line. The first value in the array represents the length of the line segment, and the second value represents the length of the gap.

## Arc Class (Inherits from Figure)

### Options

In addition to the options inherited from Figure, the Arc class has the following options:

- `radius: number`: Radius of the arc.
- `from: number`: Starting angle of the arc in degrees.
- `to: number`: Ending angle of the arc in degrees.

## Circle Class (Inherits from Arc)

The Circle class inherits from the Arc class and does not have any additional options or styles.

## Rect Class (Inherits from Figure)

### Options

In addition to the options inherited from Figure, the Rect class has the following options:

- `from: Vector2`: Coordinates of the top-left corner of the rectangle.
- `to: Vector2`: Coordinates of the bottom-right corner of the rectangle.

## Arrow Class (Inherits from Figure)

### Options

In addition to the options inherited from Figure, the Arrow class has the following options:

- `from: Vector2`: Coordinates of the starting point of the arrow.
- `to: Vector2`: Coordinates of the ending point of the arrow.

## Polygon Class (Inherits from Figure)

### Options

In addition to the options inherited from Figure, the Polygon class has the following options:

- `points: Vector2[]`: Array of coordinates for the vertices of the polygon.

## Line Class (Inherits from Widget)

### Options

In addition to the options inherited from Widget, the Line class has the following options:

- `from: Vector2`: Coordinates of the starting point of the line.
- `to: Vector2`: Coordinates of the ending point of the line.
- `style: LineStyle` (optional): Style options for the line.

### Style

- `color: Color` (optional): Color of the line.
- `width: number` (optional): Width of the line.

## Path Class (Inherits from Figure)

### Options

In addition to the options inherited from Figure, the Path class has the following options:

- `path: Path`: Path object that defines complex shapes. The Path object can contain multiple sub-paths, curves, Bezier curves, etc.

## Text Class (Inherits from Widget)

### Options

In addition to the options inherited from Widget, the Text class has the following options:

- `text: string | InputItem[]`: Text content to be displayed or an array of input items. The `InputItem` object contains a text string and other style options.
- `style: TextStyle` (optional): Style options for the text.

### Style

In addition to the styles inherited from Widget, the Text class has the following style options:

- `offset: number` (optional): Offset of the text.
- `interval: number[]` (optional): Interval of the text. Defines the interval between text lines or characters.
- `fill: boolean` (optional, default is `true`): Whether to fill the fill the text background.
- `border: boolean` (optional, default is `false`): Whether to draw a border around the text.
- `fillColor: Color` (optional): Fill color of the text background.
- `borderWidth: number` (optional): Width of the text border.
- `borderColor: Color` (optional): Color of the text border.
- `disableHinting: boolean` (optional): Whether to disable font hinting. Font hinting optimizes text rendering but may impact performance.
- `ellipsis: string` (optional): Ellipsis character when text is truncated. Replaces the text with an ellipsis when it exceeds the specified width.
- `heightMultiplier: number` (optional): Height multiplier for the text. Adjusts the line height of the text.
- `maxLines: number` (optional): Maximum number of lines for the text. Text will be truncated if it exceeds the specified number of lines.
- `replaceTabCharacters: boolean` (optional): Whether to replace tab characters. Replaces tab characters with spaces.
- `strutStyle: StrutStyle` (optional): Strut style for the text. Controls the minimum and maximum height of the text.
- `textAlign: TextAlign` (optional): Alignment of the text. Options include `left`, `right`, `center`, and `justify`.
- `textDirection: TextDirection` (optional): Direction of the text. Options include `ltr` (left-to-right) and `rtl` (right-to-left).
- `textHeightBehavior: TextHeightBehavior` (optional): Height behavior of the text. Controls whether the text lines include ascent and descent.
- `applyRoundingHack: boolean` (optional): Whether to apply a rounding hack. Improves text rendering in certain cases.
- `width: number` (optional): Width of the text. Text will be truncated or wrapped if it exceeds the specified width.

## ImageWidget Class (Inherits from Widget)

### Options

In addition to the options inherited from Widget, the ImageWidget class has the following options:

- `imageArray: ArrayBuffer`: Array buffer containing the image data. Image data should be in PNG or JPEG format.

## Svg Class (Inherits from Widget)

### Options

In addition to the options inherited from Widget, the Svg class has the following options:

- `svg: string`: SVG string. Contains the XML code of the SVG image.
- `style: SvgStyle` (optional): Style options for the SVG.

### Style

- `width: number` (optional): Width of the SVG.
- `height: number` (optional): Height of the SVG.
