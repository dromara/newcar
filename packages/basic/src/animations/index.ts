import { changeProperty } from "./change-property";

export type { AnimateFunction } from "@newcar/core";

const _scale = ["scaleX", "scaleY"] as ["scaleX", "scaleY"];
export const create = changeProperty("progress", 0, 1);
export const destroy = changeProperty("progress", 1, 0);
export const rotate = changeProperty("rotation");
export const move = changeProperty(["x", "y"]);
export const scale = changeProperty(_scale);
export const zoomIn = changeProperty(_scale, 0, 1);
export const zoomOut = changeProperty(_scale, 1, 0);
export const transparency = changeProperty("transparency");
export const fadeIn = changeProperty("transparency", 0, 1);
export const fadeOut = changeProperty("transparency", 1, 0);
export { changeProperty };

// TODO: Text Input animation
// TODO: MathFunction Transform animation
// TODO: Create animation
