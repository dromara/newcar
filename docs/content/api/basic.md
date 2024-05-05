## Widget Class

The `Widget` class serves as the base class for various graphical elements within the library. It provides foundational properties and methods that are inherited by more specialized widget classes.

### Constructor

```typescript
constructor(options?: WidgetOptions);
```

#### Parameters:
- `options: WidgetOptions` (optional): Configuration options for the widget. Includes style, position, and other properties.

### Properties
- `x: number`: The x-coordinate of the widget's position.
- `y: number`: The y-coordinate of the widget's position.
- `centerX: number`: The x-coordinate of the widget's center.
- `centerY: number`: The y-coordinate of the widget's center.
- `progress: number`: Progress of the widget's current animation.
- `style: WidgetStyle`: Styling properties such as scale, rotation, and transparency.
- `display: boolean`: Visibility of the widget.
- `isImplemented: boolean`: Indicates if the widget is fully implemented.
- `animationInstances: AnimationInstance[]`: Active animations applied to the widget.
- `eventInstances: EventInstance[]`: Active events applied to the widget.
- `updates: ((elapsed: number, widget: Widget) => void)[]`: Functions to call on widget updates.
- `setups: GeneratorFunction[]`: Setup functions for the widget.
- `key: string`: Unique identifier for the widget.
- `parent: Widget | null`: Parent widget if nested.
- `hasSet: boolean`: Flag indicating if the widget's properties have been set.
- `children: Widget[]`: Child widgets.

### Methods

#### init
Initializes the widget with required properties and setups.
```typescript
init(_ck: CanvasKit): void;
```

#### predraw
Prepares necessary items for drawing, such as initializing Paint or Path.
```typescript
predraw(_ck: CanvasKit, _propertyChanged: string): void;
```

#### draw
Draws the widget based on its properties.
```typescript
draw(_canvas: Canvas): void;
```

#### preupdate
Prepares the widget before an update is applied.
```typescript
preupdate(ck: CanvasKit, propertyChanged?: string): void;
```

#### update
Updates the widget based on its style changes.
```typescript
update(canvas: Canvas): void;
```

#### add
Adds child widgets.
```typescript
add(...children: Widget[]): this;
```

#### animate
Applies an animation to the widget.
```typescript
animate(animation: Animation<any>, startAt: number, during: number, params?: Record<string, any>): this;
```

#### on
Attaches an event to the widget.
```typescript
on(event: Event, effect: (widget: Widget, ...args: any[]) => any): this;
```

#### animateTree
Applies a series of animations in a structured manner.
```typescript
animateTree(tree: AnimationTree, startAt: number): void;
```

#### runAnimation
Processes current animations based on elapsed time.
```typescript
runAnimation(elapsed: number): void;
```

#### setEventListener
Sets up event listeners on the widget.
```typescript
setEventListener(element: HTMLCanvasElement): void;
```

#### setUpdate
Sets a function to be called on widget updates.
```typescript
setUpdate(updateFunc: (elapsed: number, widget: Widget) => void): this;
```

#### use
Applies plugins to the widget.
```typescript
use(...plugins: WidgetPlugin[]): void;
```

#### show
Makes the widget visible.
```typescript
show(): this;
```

#### hide
Hides the widget.
```typescript
hide(): this;
```

#### copy
Creates a copy of the widget.
```typescript
copy(): this;
```

#### isIn
Checks if a given point is within the widget.
```typescript
isIn(x: number, y: number): boolean;
```

#### getAbsoluteCoordinates
Calculates the absolute coordinates of the widget.
```typescript
static getAbsoluteCoordinates(widget: Widget): { x: number; y: number; };
```

#### absoluteToRelative
Converts absolute coordinates to relative coordinates within the widget.
```typescript
static absoluteToRelative(widget: Widget, x: number, y: number): { x: number; y: number; };
```

### Events

- The Widget class supports various events such as click, hover, etc., which can be attached using the `on` method.

### Animation

- Widgets can be animated using the `animate` and `animateTree` methods. Animations can be defined to alter properties over time or in response to user interactions.

### Styling

- Widgets can be styled using the `style` property, which controls visual aspects like scale, rotation, transparency, and more.

### Inheritance

The `Widget` class is the base for other specific widgets like `Text`, `ImageWidget`, `Svg`, etc., which inherit and possibly extend its properties and methods for more specialized functionality.

## Figure Class (Inherits from Widget)

The `Figure` class is a specialized form of `Widget` designed for drawing geometric shapes such as rectangles, circles, and polygons.

### Constructor

```typescript
constructor(options?: FigureOptions);
```

#### Parameters:
- `options: FigureOptions` (optional): Configuration options specific to figures, in addition to the standard widget options.

### Properties
- Inherits all properties from `Widget`.
- `style: FigureStyle`: Additional styling options specific to figures, such as fill color, border, and stroke properties.

### Methods

- Inherits all methods from `Widget`.
- Additional methods may be provided for specific geometric manipulations or enhancements.

### FigureStyle

Additional style properties specific to figures:
- `fill: boolean`: Whether the figure should be filled.
- `fillColor: Color`: Color used for filling the figure.
- `border: boolean`: Whether a border should be drawn around the figure.
- `borderColor: Color`: Color of the border.
- `borderWidth: number`: Width of the border.
- `cornerRadius: number`: Radius of the corners if the figure has rounded corners (applicable to shapes like rectangles).

## Text Class (Inherits from Widget)

The `Text` class is designed to display text within the graphics environment.

### Constructor

```typescript
constructor(options?: TextOptions);
```

#### Parameters:
- `options: TextOptions` (optional): Configuration options specific to text widgets, such as text content and styling.

### Properties
- Inherits all properties from `Widget`.
- `text: string | InputItem[]`: The text content to display. Can be a simple string or an array of `InputItem` objects for more complex formatting.

### Methods

- Inherits all methods from `Widget`.
- Additional methods may be provided for text-specific manipulations such as text wrapping, alignment, and formatting.

### TextStyle

Additional style properties specific to text:
- `fontFamily: string`: Font family of the text.
- `fontSize: number`: Size of the font.
- `fontWeight: FontWeight`: Weight of the font (e.g., normal, bold).
- `textColor: Color`: Color of the text.
- `textAlign: TextAlign`: Alignment of the text (e.g., left, right, center).
- `lineHeight: number`: Line height in pixels.
- `textDecoration: string`: Text decoration (e.g., underline, line-through).

## ImageWidget Class (Inherits from Widget)

The `ImageWidget` class is used for displaying images.

### Constructor

```typescript
constructor(options?: ImageWidgetOptions);
```

#### Parameters:
- `options: ImageWidgetOptions` (optional): Configuration options specific to image widgets, such as image source and scaling.

### Properties
- Inherits all properties from `Widget`.
- `imageSource: string | ArrayBuffer`: The source of the image. Can be a URL or an ArrayBuffer containing image data.

### Methods

- Inherits all methods from `Widget`.
- Additional methods may be provided for image-specific manipulations such as scaling, cropping, and rotation.

### ImageStyle

Additional style properties specific to images:
- `scale: number`: Scale factor for the image.
- `aspectRatio: number`: Aspect ratio to maintain when scaling the image.
- `fit: string`: How the image should fit within its bounds (e.g., contain, cover).

## Svg Class (Inherits from Widget)

The `Svg` class is used for displaying scalable vector graphics.

### Constructor

```typescript
constructor(options?: SvgOptions);
```

#### Parameters:
- `options: SvgOptions` (optional): Configuration options specific to SVG widgets, such as SVG content and scaling.

### Properties
- Inherits all properties from `Widget`.
- `svgContent: string`: The SVG content in XML format.

### Methods

- Inherits all methods from `Widget`.
- Additional methods may be provided for SVG-specific manipulations such as scaling and transformation.

### SvgStyle

Additional style properties specific to SVGs:
- `width: number`: Width of the SVG element.
- `height: number`: Height of the SVG element.

These classes provide a comprehensive framework for creating and managing graphical user interfaces with various elements like text, images, and shapes, each equipped with specialized properties and methods for detailed customization and control.

## Arc Class (Inherits from Figure)

The `Arc` class is designed for drawing arc shapes within a graphical environment.

### Constructor

```typescript
constructor(options?: ArcOptions);
```

#### Parameters:
- `options: ArcOptions` (optional): Configuration options specific to arcs, including radius and angles.

### Properties
- Inherits all properties from `Figure`.
- `radius: number`: The radius of the arc.
- `from: number`: The starting angle of the arc in degrees.
- `to: number`: The ending angle of the arc in degrees.

### Methods

- Inherits all methods from `Figure`.
- Additional methods may be provided for arc-specific manipulations such as adjusting the radius or angles.

### ArcStyle

Inherits style properties from `FigureStyle` with no additional unique styling properties for arcs.

## Circle Class (Inherits from Arc)

The `Circle` class is a specialized form of `Arc` used for drawing complete circles.

### Constructor

```typescript
constructor(options?: CircleOptions);
```

#### Parameters:
- `options: CircleOptions` (optional): Configuration options specific to circles, primarily focusing on radius as the circle is a complete 360-degree arc.

### Properties
- Inherits all properties from `Arc` with `from` set to `0` and `to` set to `360` degrees by default, representing a full circle.

### Methods

- Inherits all methods from `Arc`.
- Typically does not require additional methods beyond what `Arc` provides as it represents a complete circle.

### CircleStyle

Inherits style properties from `ArcStyle` with no additional unique styling properties for circles.

## Rect Class (Inherits from Figure)

The `Rect` class is designed for drawing rectangles within the graphical environment.

### Constructor

```typescript
constructor(options?: RectOptions);
```

#### Parameters:
- `options: RectOptions` (optional): Configuration options specific to rectangles, including coordinates for corners.

### Properties
- Inherits all properties from `Figure`.
- `from: Vector2`: The coordinates for the top-left corner of the rectangle.
- `to: Vector2`: The coordinates for the bottom-right corner of the rectangle.

### Methods

- Inherits all methods from `Figure`.
- Additional methods may be provided for rectangle-specific manipulations such as adjusting corner coordinates or dimensions.

### RectStyle

Inherits style properties from `FigureStyle`, with potential additional properties such as `cornerRadius` for rectangles with rounded corners.

## Polygon Class (Inherits from Figure)

The `Polygon` class is designed for drawing polygons with multiple sides.

### Constructor

```typescript
constructor(options?: PolygonOptions);
```

#### Parameters:
- `options: PolygonOptions` (optional): Configuration options specific to polygons, including a list of vertex points.

### Properties
- Inherits all properties from `Figure`.
- `points: Vector2[]`: An array of points defining the vertices of the polygon.

### Methods

- Inherits all methods from `Figure`.
- Additional methods may be provided for polygon-specific manipulations such as adding or removing vertices.

### PolygonStyle

Inherits style properties from `FigureStyle` with no additional unique styling properties for polygons.

These classes allow for the creation and manipulation of various geometric shapes, each with tailored properties and methods that enhance their specificity and utility in graphical applications. They leverage the foundational capabilities of the `Figure` class while introducing shape-specific features that cater to the needs of different graphical components.

## Arrow Class (Inherits from Figure)

The `Arrow` class is specialized for drawing arrows, providing directional cues within the graphical environment.

### Constructor

```typescript
constructor(options?: ArrowOptions);
```

#### Parameters:
- `options: ArrowOptions` (optional): Configuration options specific to arrows, including start and end points.

### Properties
- Inherits all properties from `Figure`.
- `from: Vector2`: The starting point of the arrow.
- `to: Vector2`: The ending point of the arrow.

### Methods

- Inherits all methods from `Figure`.
- Additional methods may be provided for arrow-specific manipulations such as adjusting the length or orientation.

### ArrowStyle

Inherits style properties from `FigureStyle`, with potential additional properties such as `headLength` and `headWidth` for defining the size of the arrowhead.

## Path Class (Inherits from Figure)

The `Path` class is designed for drawing complex shapes and paths that might include curves, lines, and arcs.

### Constructor

```typescript
constructor(options?: PathOptions);
```

#### Parameters:
- `options: PathOptions` (optional): Configuration options specific to paths, including the path data.

### Properties
- Inherits all properties from `Figure`.
- `path: Path`: A `Path` object from CanvasKit, defining the shape to be drawn.

### Methods

- Inherits all methods from `Figure`.
- Additional methods may be provided for path-specific manipulations such as adding curves, lines, or modifying existing path segments.

### PathStyle

Inherits style properties from `FigureStyle` with no additional unique styling properties for paths. However, the complexity of paths can be manipulated through the `path` object itself, which allows for intricate designs and shapes.

### Additional Considerations

Each of these classes extends the functionality of the `Figure` class to cater to more specific drawing needs:
- **Arrow**: Useful for diagrams, flowcharts, and anywhere directional indicators are needed.
- **Path**: Ideal for creating complex and custom shapes that are not easily represented by standard geometric figures.

These specialized classes enhance the versatility of the graphical toolkit, enabling developers to create rich, interactive, and visually appealing applications. They leverage the robust features of the `Figure` class while introducing additional properties and methods that are specific to their respective shapes, providing a comprehensive set of tools for graphic representation and manipulation.
