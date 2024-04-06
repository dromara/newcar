import { WidgetOptions, WidgetStyle, Widget } from '@newcar/core';
import { Color } from '@newcar/utils';
import { CanvasKit, Canvas } from 'canvaskit-wasm';
import { ArrowOptions, LineOptions } from '@newcar/basic';

type Domain = [number, number];

type Range = [number, number];

interface MathFunctionOptions extends WidgetOptions {
    divisionY?: number;
    divisionX?: number;
    lineWidth?: number;
    style?: MathFunctionStyle;
    range?: Range;
}
interface MathFunctionStyle extends WidgetStyle {
    color?: Color;
    width?: number;
}
declare class MathFunction extends Widget {
    fn: (x: number) => number;
    domain: Domain;
    style: MathFunctionStyle;
    private path;
    private paint;
    range: Range;
    lineWidth: number;
    divisionX: number;
    divisionY: number;
    constructor(fn: (x: number) => number, domain: Domain, options?: MathFunctionOptions);
    init(ck: CanvasKit): void;
    predraw(ck: CanvasKit, propertyChanged: string): void;
    draw(canvas: Canvas): void;
}

type Trend = (counter: number) => number;
interface NumberAxisOptions extends WidgetOptions {
    style?: NumberAxisStyle;
    unit?: number;
    interval?: number;
    trend?: Trend;
    arrowOptions?: ArrowOptions;
    tickOptions?: LineOptions;
}
interface NumberAxisStyle extends WidgetStyle {
    tickWidth?: number;
    tickRotation?: number;
    tickColor?: Color;
    color?: Color;
    tickHeight?: [number, number];
}
declare class NumberAxis extends Widget {
    from: number;
    to: number;
    style: NumberAxisStyle;
    interval: number;
    trend: Trend;
    arrowOptions: ArrowOptions;
    tickOptions: LineOptions;
    private arrow;
    private ticks;
    constructor(from: number, to: number, options: NumberAxisOptions);
    init(ck: CanvasKit): void;
}

export { MathFunction, type MathFunctionOptions, type MathFunctionStyle, NumberAxis, type NumberAxisOptions, type NumberAxisStyle, type Trend };
