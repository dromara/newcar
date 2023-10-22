import type { Carobj } from "@newcar/basic/src";

export function pre_render(ctx: CanvasRenderingContext2D, obj: Carobj): void {
  obj.init();
}

export function render(ctx: CanvasRenderingContext2D, obj: Carobj): void {
  obj.update(ctx);
}
