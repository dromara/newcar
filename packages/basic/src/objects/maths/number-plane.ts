import { Carobj } from "../carobj";
import { Text } from "../text";
import type { NumberAxisOption, Trend, TrendType } from "./number-axis";
import { NumberAxis, NumberAxisStyle, solve } from "./number-axis";

type NumberPlaneAxisOption = Omit<
  NumberAxisOption,
  "tickRotation" | "tickHeight"
>;

export type NumberPlaneOption = NumberPlaneAxisOption & {
  [K in "axisX" | "axisY"]?: Omit<
    NumberPlaneAxisOption,
    "trend" | "centerX" | "centerY"
  >;
};

const nonInheritedProps = "trend,x,y,centerX,centerY,rotation";

export class NumberPlane extends Carobj {
  #trend: Trend | null;
  axisX: NumberAxis;
  axisY: NumberAxis;

  constructor(
    public fromX: number,
    public toX: number,
    public fromY: number,
    public toY: number,
    options?: NumberPlaneOption,
  ) {
    super((options ??= {}));
    this.trend = options.trend;
    for (const key of nonInheritedProps.split(",")) {
      delete options[key as keyof NumberPlaneOption];
    }
    const optionX = { ...options, ...options.axisX };
    const optionY = { ...options, rotation: -Math.PI / 2, ...options.axisY };
    this.axisX = new NumberAxis(fromX, toX, optionX);
    this.axisY = new NumberAxis(fromY, toY, optionY);
  }

  override draw(context: CanvasRenderingContext2D): void {
    this.axisX.tickHeight = [
      -this.axisY.from * this.axisY.unit,
      this.axisY.to * this.axisY.unit,
    ];
    this.axisY.tickHeight = [
      this.axisX.to * this.axisX.unit,
      -this.axisX.from * this.axisX.unit,
    ];
    if (this.axisX.trend) {
      this.axisX.trend.options.rotation = -this.axisX.rotation;
    }
    if (this.axisY.trend) {
      this.axisY.trend.options.rotation = -this.axisY.rotation;
    }
    this.axisY.tickRotation = this.axisX.rotation - this.axisY.rotation;
    this.axisX.tickRotation = Math.PI - this.axisY.tickRotation;
    this.axisX.update(context, NumberAxisStyle.Tick);
    this.axisY.update(context, NumberAxisStyle.Tick);
    this.axisX.update(context, NumberAxisStyle.Axis | NumberAxisStyle.Arrow);
    this.axisY.update(context, NumberAxisStyle.Axis | NumberAxisStyle.Arrow);
    if (this.trend) {
      for (const axis of [this.axisX, this.axisY]) {
        for (let i = axis.min; i <= axis.max; i += axis.interval) {
          const offset = i * axis.unit;
          new Text(this.trend.trender(axis.reverse ? -i : i), {
            ...this.trend.options,
            x: offset * Math.cos(axis.rotation) + (this.trend.options.x ?? 0),
            y: offset * Math.sin(axis.rotation) + (this.trend.options.y ?? 0),
          }).update(context);
        }
      }
    }
  }

  set trend(trend: TrendType) {
    this.#trend = solve(trend, { x: 16, y: 16, size: 16 });
  }

  get trend(): Trend | null {
    return this.#trend;
  }
}
