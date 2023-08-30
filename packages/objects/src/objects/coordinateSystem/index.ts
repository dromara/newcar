import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import { Text } from "../text";
import type { coordinate_systemobject } from "./input_type";
import type { ILimitofAxisX, ILimitofAxisY, ISystemDirection } from "./interface";

export class CoordinateSystem
  extends Carobj
  implements ILimitofAxisX, ILimitofAxisY, ISystemDirection
{
  #x_max: number;
  #y_max: number;
  #x_min: number;
  #y_min: number;
  #x_direction: "left" | "right";
  #y_direction: "top" | "bottom";
  x_color: string;
  x_point_interval: number;
  y_point_interval: number;
  arrow: boolean;
  display_point: boolean;
  y_color: string;
  grid_color: string;
  grid: boolean;
  x_number: boolean;
  y_number: boolean;
  y_number_trend: (arg0: number) => Text;
  x_number_trend: (arg0: number) => Text;

  constructor(
    x_max: number,
    y_max: number,
    x_min: number,
    y_min: number,
    data?: coordinate_systemobject & carobject,
  ) {
    data = data ?? {};
    super(data);
    this.#x_max = x_max;
    this.#x_min = x_min;
    this.#y_max = y_max;
    this.#y_min = y_min;
    this.#x_direction = data.x_direction ?? "right";
    this.#y_direction = data.y_direction ?? "top";
    this.x_point_interval = data.x_point_interval ?? 50;
    this.y_point_interval = data.y_point_interval ?? 50;
    this.arrow = data.arrow ?? true;
    this.display_point = data.display_point ?? true;
    this.grid = data.grid ?? true;
    this.x_color = data.x_color ?? "white";
    this.y_color = data.y_color ?? "white";
    this.grid_color = data.grid_color ?? "white";
    this.x_number = data.x_number ?? true;
    this.y_number = data.y_number ?? true;
    this.y_number_trend =
      data.y_number_trend ??
      ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
    this.x_number_trend =
      data.x_number_trend ??
      ((numberCount: number) => new Text(String(numberCount), { x: 0, y: 0 }));
  }

  get x_max() {
    return this.#x_max;
  }

  set x_max(value: number) {
    this.#x_max = value;
  }

  get x_min() {
    return this.#x_min;
  }

  set x_min(value: number) {
    this.#x_min = value;
  }

  get y_max() {
    return this.#y_max;
  }

  set y_max(value: number) {
    this.#y_max = value;
  }

  get y_min() {
    return this.#y_min;
  }

  set y_min(value: number) {
    this.#y_min = value;
  }

  get x_direction() {
    return this.#x_direction;
  }

  set x_direction(value: "left" | "right") {
    this.#x_direction = value;
  }

  get y_direction() {
    return this.#y_direction;
  }

  set y_direction(value: "top" | "bottom") {
    this.#y_direction = value;
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);

    if (this.#x_min > 0) {
      throw new Error("Parameter `x_min` cannot be greater than 0");
    }
    if (this.#x_max < 0) {
      throw new Error("Parameter `x_max` cannot be less than 0");
    }
    if (this.#y_min > 0) {
      throw new Error("Parameter `y_min` cannot be greater than 0");
    }
    if (this.#y_max < 0) {
      throw new Error("Parameter `y_max` cannot be less than 0");
    }

    if (this.#x_direction === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#y_direction === "top") {
      ctx.scale(1, -1);
    }

    // draw grid
    if (this.grid) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.grid_color}`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        ctx.moveTo(x, this.#y_max);
        ctx.lineTo(x, this.#y_min);
      }
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        ctx.moveTo(this.#x_max, y);
        ctx.lineTo(this.#x_min, y);
      }
      ctx.stroke();
    }
    // draw axis X
    ctx.beginPath();
    ctx.strokeStyle = `${this.x_color}`;
    ctx.lineWidth = 2;
    ctx.moveTo(this.#x_min, 0);
    ctx.lineTo(this.#x_max, 0);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, 6);
      ctx.moveTo(this.#x_max, 0);
      ctx.lineTo(this.#x_max - 6, -6);
    }
    ctx.stroke();

    // draw axis Y
    ctx.beginPath();
    ctx.strokeStyle = `${this.y_color}`;
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.#y_min);
    ctx.lineTo(0, this.#y_max);
    if (this.arrow) {
      ctx.lineWidth = 2;
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(6, this.#y_max - 6);
      ctx.moveTo(0, this.#y_max);
      ctx.lineTo(-6, this.#y_max - 6);
    }
    ctx.stroke();

    // Draw number point;
    if (this.display_point) {
      ctx.beginPath();
      ctx.strokeStyle = `${this.x_color}`;
      ctx.lineWidth = 2;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        ctx.moveTo(x, 10);
        ctx.lineTo(x, -10);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `${this.y_color}`;
      ctx.lineWidth = 2;
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        ctx.moveTo(10, y);
        ctx.lineTo(-10, y);
      }
      ctx.stroke();
    }

    // To avoid text inversion, restore the coordinate system to its original state here

    if (this.x_direction === "left") {
      ctx.scale(-1, 1);
    }
    if (this.y_direction === "top") {
      ctx.scale(1, -1);
    }

    // draw number

    let numberCount = 0;
    if (this.#x_direction === "right" && this.x_number) {
      numberCount = 0;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        if (numberCount !== 0) {
          const text = this.x_number_trend(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        if (numberCount !== 0) {
          const text = this.x_number_trend(numberCount);
          text.x = x;
          text.y = 20;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.#x_direction === "left" && this.x_number) {
      numberCount = 0;
      for (let x = 0; x <= this.#x_max; x += this.x_point_interval) {
        if (numberCount !== 0) {
          const text = this.x_number_trend(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let x = 0; x >= this.#x_min; x -= this.x_point_interval) {
        if (numberCount !== 0) {
          const text = this.x_number_trend(numberCount);
          text.x = -x;
          text.y = 20;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    }

    if (this.#y_direction === "top" && this.y_number) {
      numberCount = 0;
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        if (numberCount !== 0) {
          const text = this.y_number_trend(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        if (numberCount !== 0) {
          const text = this.y_number_trend(numberCount);
          text.x = -20;
          text.y = -y;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    } else if (this.#y_direction === "bottom" && this.y_number) {
      numberCount = 0;
      for (let y = 0; y <= this.#y_max; y += this.y_point_interval) {
        if (numberCount !== 0) {
          const text = this.y_number_trend(numberCount);
          text.x = -20;
          text.y = y;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount += 1;
      }

      numberCount = 0;
      for (let y = 0; y >= this.#y_min; y -= this.y_point_interval) {
        if (numberCount !== 0) {
          const text = this.y_number_trend(numberCount);
          text.x = -20;
          text.y = y;
          text.size = 20;
          text.align = "center";
          text.onUpdate(ctx);
        }
        numberCount -= 1;
      }
    }

    const originText = this.x_number_trend(0);
    originText.align = "right";
    originText.baseline = "top";
    originText.size = 20;
    originText.x = 0;
    originText.y = 0;
    originText.onUpdate(ctx);

    // Restore
    if (this.#x_direction === "left") {
      ctx.scale(-1, 1);
    }
    if (this.#y_direction === "top") {
      ctx.scale(1, -1);
    }

    return ctx;
  }
}
