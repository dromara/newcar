import {
  easeInBack,
  easeInBounce,
  easeInCirc,
  easeInCubic,
  easeInElastic,
  easeInExpo,
  easeInOutBack,
  easeInOutBounce,
  easeInOutCirc,
  easeInOutElastic,
  easeInOutCubic,
  easeInOutExpo,
  easeInOutQuad,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeOutBack,
  easeOutBounce,
  easeOutCirc,
  easeOutCubic,
  easeOutElastic,
  easeOutExpo,
  easeOutQuad,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
} from "./NonlinearInterpolators";
import { LinearInterpolator } from "./LinearInterpolator";

export const interpolator = ((exports: Record<string, (arg0: number) => number>) => {
  exports.easeInBack = easeInBack;
  exports.easeInBounce = easeInBounce;
  exports.easeInCirc = easeInCirc;
  exports.easeInCubic = easeInCubic;
  exports.easeInElastic = easeInElastic;
  exports.easeInExpo = easeInExpo;
  exports.easeInOutBack = easeInOutBack;
  exports.easeInOutBounce = easeInOutBounce;
  exports.easeInOutCirc = easeInOutCirc;
  exports.easeInOutElastic = easeInOutElastic;
  exports.easeInOutCubic = easeInOutCubic;
  exports.easeInOutExpo = easeInOutExpo;
  exports.easeInOutQuad = easeInOutQuad;
  exports.easeInOutQuart = easeInOutQuart;
  exports.easeInOutQuint = easeInOutQuint;
  exports.easeInOutSine = easeInOutSine;
  exports.easeInQuad = easeInQuad;
  exports.easeInQuart = easeInQuart;
  exports.easeInQuint = easeInQuint;
  exports.easeInSine = easeInSine;
  exports.easeOutBack = easeOutBack;
  exports.easeOutBounce = easeOutBounce;
  exports.easeOutCirc = easeOutCirc;
  exports.easeOutCubic = easeOutCubic;
  exports.easeOutElastic = easeOutElastic;
  exports.easeOutExpo = easeOutExpo;
  exports.easeOutQuad = easeOutQuad;
  exports.easeOutQuart = easeOutQuart;
  exports.easeOutQuint = easeOutQuint;
  exports.easeOutSine = easeOutSine;
  exports.Linear = LinearInterpolator;
  return exports;
})({});
