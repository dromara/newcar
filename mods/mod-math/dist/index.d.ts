import { WidgetOptions, WidgetStyle, Widget } from '@newcar/core';
import { Color } from '@newcar/utils';
import { CanvasKit, Canvas } from 'canvaskit-wasm';

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

export { MathFunction, type MathFunctionOptions, type MathFunctionStyle };
