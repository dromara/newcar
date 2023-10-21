import type { Carobj } from "@newcar/basic/src";

export function render(ctx: CanvasRenderingContext2D, obj: Carobj) {
  obj.onUpdate(ctx);
}

export function pre_render(ctx: CanvasRenderingContext2D, obj: Carobj) {
  obj.onSet();
}
