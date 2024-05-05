## Widget 类

`Widget` 类是库中各种图形元素的基类。它提供了继承给更专门的 widget 类的基本属性和方法。

### 构造函数

```typescript
constructor(options?: WidgetOptions);
```

#### 参数:
- `options: WidgetOptions`（可选）：Widget 的配置选项，包括样式、位置和其他属性。

### 属性
- `x: number`：Widget 的 x 坐标位置。
- `y: number`：Widget 的 y 坐标位置。
- `centerX: number`：Widget 中心的 x 坐标。
- `centerY: number`：Widget 中心的 y 坐标。
- `progress: number`：Widget 当前动画的进度。
- `style: WidgetStyle`：控制缩放、旋转和透明度等的样式属性。
- `display: boolean`：Widget 是否可见。
- `isImplemented: boolean`：指示 Widget 是否已完全实现。
- `animationInstances: AnimationInstance[]`：应用于 Widget 的活动动画。
- `eventInstances: EventInstance[]`：应用于 Widget 的活动事件。
- `updates: ((elapsed: number, widget: Widget) => void)[]`：Widget 更新时调用的函数。
- `setups: GeneratorFunction[]`：Widget 的设置函数。
- `key: string`：Widget 的唯一标识符。
- `parent: Widget | null`：如果嵌套，则为父 Widget。
- `hasSet: boolean`：标志指示 Widget 的属性是否已设置。
- `children: Widget[]`：子 Widget。

### 方法

#### init
使用必要的属性和设置初始化 Widget。
```typescript
init(_ck: CanvasKit): void;
```

#### predraw
为绘制准备必要的项目，如初始化 Paint 或 Path。
```typescript
predraw(_ck: CanvasKit, _propertyChanged: string): void;
```

#### draw
根据其属性绘制 Widget。
```typescript
draw(_canvas: Canvas): void;
```

#### preupdate
在应用更新前准备 Widget。
```typescript
preupdate(ck: CanvasKit, propertyChanged?: string): void;
```

#### update
根据其样式变化更新 Widget。
```typescript
update(canvas: Canvas): void;
```

#### add
添加子 Widget。
```typescript
add(...children: Widget[]): this;
```

#### animate
对 Widget 应用动画。
```typescript
animate(animation: Animation<any>, startAt: number, during: number, params?: Record<string, any>): this;
```

#### on
将事件附加到 Widget。
```typescript
on(event: Event, effect: (widget: Widget, ...args: any[]) => any): this;
```

#### animateTree
以结构化的方式应用一系列动画。
```typescript
animateTree(tree: AnimationTree, startAt: number): void;
```

#### runAnimation
根据经过的时间处理当前动画。
```typescript
runAnimation(elapsed: number): void;
```

#### setEventListener
为 Widget 设置事件监听器。
```typescript
setEventListener(element: HTMLCanvasElement): void;
```

#### setUpdate
设置在 Widget 更新时调用的函数。
```typescript
setUpdate(updateFunc: (elapsed: number, widget: Widget) => void): this;
```

#### use
应用插件到 Widget。
```typescript
use(...plugins: WidgetPlugin[]): void;
```

#### show
使 Widget 可见。
```typescript
show(): this;
```

#### hide
隐藏 Widget。
```typescript
hide(): this;
```

#### copy
创建 Widget 的副本。
```typescript
copy(): this;
```

#### isIn
检查给定点是否在 Widget 内。
```typescript
isIn(x: number, y: number): boolean;
```

#### getAbsoluteCoordinates
计算 Widget 的绝对坐标。
```typescript
static getAbsoluteCoordinates(widget: Widget): { x: number; y: number; };
```

#### absoluteToRelative
将绝对坐标转换为 Widget 内的相对坐标。
```typescript
static absoluteToRelative(widget: Widget, x: number, y: number): { x: number; y: number; };
```

### 事件

- Widget 类支持各种事件，如点击、悬停等，可以使用 `on` 方法附加。

### 动画

- Widget 可以使用 `animate` 和 `animateTree` 方法进行动画处理。动画可以定义为随时间改变属性或响应用户互动。

### 样式

- Widget 可以使用 `style` 属性进行样式设置，该属性控制视觉方面的元素，如缩放、旋转和更多。

### 继承

`Widget` 类是其他特定 widget，如 `Text`、`ImageWidget`、`Svg` 等的基类，这些类继承并可能扩展其属性和方法以实现更专门的功能。

## Figure 类（继承自 Widget）

`Figure` 类是 `Widget` 的一个特化形式，设计用于绘制几何形状，如矩形、圆形和多边形。

### 构造函数

```typescript
constructor(options?: FigureOptions);
```

#### 参数:
- `options: FigureOptions`（可选）：除标准 widget 选项外，特定于图形的配置选项。

### 属性
- 继承自 `Widget` 的所有属性。
- `style: FigureStyle`：特定于图形的额外样式选项，如填充颜色、边框和描边属性。

### 方法

- 继承自 `Widget` 的所有方法。
- 可能提供针对特定几何操作或增强的额外方法。

### FigureStyle

特定于图形的额外样式属性：
- `fill: boolean`：图形是否应填充。
- `fillColor: Color`：用于填充图形的颜色。
- `border: boolean`：是否绘制图形边框。
- `borderColor: Color`：边框的颜色。
- `borderWidth: number`：边框的宽度。
- `cornerRadius: number`：如果图形有圆角，则为圆角的半径。

## Text 类（继承自 Widget）

`Text` 类设计用于在图形环境中显示文本。

### 构造函数

```typescript
constructor(options?: TextOptions);
```

#### 参数:
- `options: TextOptions`（可选）：特定于文本 widget 的配置选项，如文本内容和样式。

### 属性
- 继承自 `Widget` 的所有属性。
- `text: string | InputItem[]`：要显示的文本内容。可以是简单的字符串或更复杂格式的 `InputItem` 对象数组。

### 方法

- 继承自 `Widget` 的所有方法。
- 可能提供针对文本特定操作如文本折行、对齐和格式化的额外方法。

### TextStyle

特定于文本的额外样式属性：
- `fontFamily: string`：文本的字体族。
- `fontSize: number`：字体大小。
- `fontWeight: FontWeight`：字体的重量（例如，正常、粗体）。
- `textColor: Color`：文本的颜色。
- `textAlign: TextAlign`：文本的对齐方式（例如，左、右、中）。
- `lineHeight: number`：行高（以像素为单位）。
- `textDecoration: string`：文本装饰（例如，下划线、删除线）。

## ImageWidget 类（继承自 Widget）

`ImageWidget` 类用于显示图像。

### 构造函数

```typescript
constructor(options?: ImageWidgetOptions);
```

#### 参数:
- `options: ImageWidgetOptions`（可选）：特定于图像 widget 的配置选项，如图像源和缩放。

### 属性
- 继承自 `Widget` 的所有属性。
- `imageSource: string | ArrayBuffer`：图像的源。可以是 URL 或包含图像数据的 ArrayBuffer。

### 方法

- 继承自 `Widget` 的所有方法。
- 可能提供针对图像特定操作如缩放、裁剪和旋转的额外方法。

### ImageStyle

特定于图像的额外样式属性：
- `scale: number`：图像的缩放因子。
- `aspectRatio: number`：缩放图像时保持的宽高比。
- `fit: string`：图像在其边界内的适应方式（例如，包含、覆盖）。

## Svg 类（继承自 Widget）

`Svg` 类用于显示可缩放矢量图形。

### 构造函数

```typescript
constructor(options?: SvgOptions);
```

#### 参数:
- `options: SvgOptions`（可选）：特定于 SVG widget 的配置选项，如 SVG 内容和缩放。

### 属性
- 继承自 `Widget` 的所有属性。
- `svgContent: string`：SVG 内容的 XML 格式。

### 方法

- 继承自 `Widget` 的所有方法。
- 可能提供针对 SVG 特定操作如缩放和变换的额外方法。

### SvgStyle

特定于 SVG 的额外样式属性：
- `width: number`：SVG 元素的宽度。
- `height: number`：SVG 元素的高度。

这些类为创建和管理图形用户界面提供了全面的框架，包括各种元素如文本、图像和形状，每个元素都配备了专门的属性和方法，以实现详细的定制和控制。

## Arc 类（继承自 Figure）

`Arc` 类专为在图形环境中绘制弧形而设计。

### 构造函数

```typescript
constructor(options?: ArcOptions);
```

#### 参数:
- `options: ArcOptions`（可选）：包括半径和角度在内的特定于弧形的配置选项。

### 属性
- 继承自 `Figure` 的所有属性。
- `radius: number`：弧形的半径。
- `from: number`：弧形的起始角度（以度为单位）。
- `to: number`：弧形的结束角度（以度为单位）。

### 方法

- 继承自 `Figure` 的所有方法。
- 可能提供针对弧形特定操作如调整半径或角度的额外方法。

### ArcStyle

继承自 `FigureStyle` 的样式属性，没有为弧形添加的独特样式属性。

## Circle 类（继承自 Arc）

`Circle` 类是 `Arc` 的一种特化形式，用于绘制完整的圆形。

### 构造函数

```typescript
constructor(options?: CircleOptions);
```

#### 参数:
- `options: CircleOptions`（可选）：特定于圆形的配置选项，主要关注半径，因为圆形是一个完整的 360 度弧形。

### 属性
- 继承自 `Arc` 的所有属性，其中 `from` 默认设置为 `0` 度，`to` 默认设置为 `360` 度，代表一个完整的圆形。

### 方法

- 继承自 `Arc` 的所有方法。
- 通常不需要额外的方法，因为 `Arc` 已提供表示完整圆形所需的功能。

### CircleStyle

继承自 `ArcStyle` 的样式属性，没有为圆形添加的独特样式属性。

## Rect 类（继承自 Figure）

`Rect` 类专为在图形环境中绘制矩形而设计。

### 构造函数

```typescript
constructor(options?: RectOptions);
```

#### 参数:
- `options: RectOptions`（可选）：包括角落坐标在内的特定于矩形的配置选项。

### 属性
- 继承自 `Figure` 的所有属性。
- `from: Vector2`：矩形左上角的坐标。
- `to: Vector2`：矩形右下角的坐标。

### 方法

- 继承自 `Figure` 的所有方法。
- 可能提供针对矩形特定操作如调整角落坐标或尺寸的额外方法。

### RectStyle

继承自 `FigureStyle` 的样式属性，可能包括如 `cornerRadius`（圆角矩形的圆角半径）等额外属性。

## Polygon 类（继承自 Figure）

`Polygon` 类专为绘制具有多边的多边形而设计。

### 构造函数

```typescript
constructor(options?: PolygonOptions);
```

#### 参数:
- `options: PolygonOptions`（可选）：包括顶点点列表在内的特定于多边形的配置选项。

### 属性
- 继承自 `Figure` 的所有属性。
- `points: Vector2[]`：定义多边形顶点的点数组。

### 方法

- 继承自 `Figure` 的所有方法。
- 可能提供针对多边形特定操作如添加或移除顶点的额外方法。

### PolygonStyle

继承自 `FigureStyle` 的样式属性，没有为多边形添加的独特样式属性。

这些类允许创建和操作各种几何形状，每个类都利用了 `Figure` 类的基础功能，同时引入了特定形状的额外属性和方法，以满足不同图形组件的需求。

## Arrow 类（继承自 Figure）

`Arrow` 类专为绘制箭头而设计，提供了图形环境中的方向指示。

### 构造函数

```typescript
constructor(options?: ArrowOptions);
```

#### 参数:
- `options: ArrowOptions`（可选）：特定于箭头的配置选项，包括起点和终点。

### 属性
- 继承自 `Figure` 的所有属性。
- `from: Vector2`：箭头的起始点坐标。
- `to: Vector2`：箭头的终点坐标。

### 方法

- 继承自 `Figure` 的所有方法。
- 可能提供针对箭头特定操作如调整长度或方向的额外方法。

### ArrowStyle

继承自 `FigureStyle` 的样式属性，可能包括诸如 `headLength` 和 `headWidth` 等额外属性，用于定义箭头头部的大小。

## Path 类（继承自 Figure）

`Path` 类设计用于绘制包括曲线、线条和弧线在内的复杂形状和路径。

### 构造函数

```typescript
constructor(options?: PathOptions);
```

#### 参数:
- `options: PathOptions`（可选）：特定于路径的配置选项，包括路径数据。

### 属性
- 继承自 `Figure` 的所有属性。
- `path: Path`：CanvasKit 中的 `Path` 对象，定义了要绘制的形状。

### 方法

- 继承自 `Figure` 的所有方法。
- 可能提供针对路径特定操作如添加曲线、线条或修改现有路径段的额外方法。

### PathStyle

继承自 `FigureStyle` 的样式属性，没有为路径添加的独特样式属性。然而，路径的复杂性可以通过 `path` 对象本身进行操作，允许创造复杂的设计和形状。

### 额外考虑

每个类都扩展了 `Figure` 类的功能，以满足更具体的绘图需求：
- **Arrow**：适用于图表、流程图以及需要方向指示的任何场所。
- **Path**：理想用于创建不易用标准几何形状表示的复杂和自定义形状。

这些专门的类增强了图形工具包的多功能性，使开发者能够创建丰富、互动和视觉上吸引人的应用程序。它们利用 `Figure` 类的健壮特性，同时引入额外的属性和方法，这些属性和方法是针对它们各自的形状特定的，提供了一套全面的图形表示和操作工具。
