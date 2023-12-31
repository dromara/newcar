import { changeProperty } from "./change-property";

export type { Animate } from "./animate";

const _scale = ["scaleX", "scaleY"] as ["scaleX", "scaleY"];
export const create = changeProperty("progress", 0, undefined);
export const destroy = changeProperty("progress", undefined, 0);
export const rotate = changeProperty("rotation");
export const move = changeProperty(["x", "y"]);
export const scale = changeProperty(_scale);
export const zoomIn = changeProperty(_scale, 0, undefined);
export const zoomOut = changeProperty(_scale, undefined, 0);
export const transparency = changeProperty("transparency");
export const fadeIn = changeProperty("transparency", 0, undefined);
export const fadeOut = changeProperty("transparency", undefined, 0);
export { changeProperty };

// TODO: Text Input animation
// TODO: MathFunction Transform animation
// TODO: Create animation
