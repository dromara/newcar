import {
  EaseInBackInterpolator,
  EaseInBounceInterpolator,
  EaseInCircInterpolator,
  EaseInCubicInterpolator,
  EaseInElasticInterpolator,
  EaseInExpoInterpolator,
  EaseInOutBackInterpolator,
  EaseInOutBounceInterpolator,
  EaseInOutCircInterpolator,
  EaseInOutElasticInterpolator,
  EaseInOutCubicInterpolator,
  EaseInOutExpoInterpolator,
  EaseInOutQuadInterpolator,
  EaseInOutQuartInterpolator,
  EaseInOutQuintInterpolator,
  EaseInOutSineInterpolator,
  EaseInQuadInterpolator,
  EaseInQuartInterpolator,
  EaseInQuintInterpolator,
  EaseInSineInterpolator,
  EaseOutBackInterpolator,
  EaseOutBounceInterpolator,
  EaseOutCircInterpolator,
  EaseOutCubicInterpolator,
  EaseOutElasticInterpolator,
  EaseOutExpoInterpolator,
  EaseOutQuadInterpolator,
  EaseOutQuartInterpolator,
  EaseOutQuintInterpolator,
  EaseOutSineInterpolator,
} from "./NonlinearInterpolators";
import { LinearInterpolator } from "./LinearInterpolator";

export const interpolator = ((exports: Record<string, (arg0: number) => number>) => {
  exports.EaseInBackInterpolator = EaseInBackInterpolator;
  exports.EaseInBounceInterpolator = EaseInBounceInterpolator;
  exports.EaseInCircInterpolator = EaseInCircInterpolator;
  exports.EaseInCubicInterpolator = EaseInCubicInterpolator;
  exports.EaseInElasticInterpolator = EaseInElasticInterpolator;
  exports.EaseInExpoInterpolator = EaseInExpoInterpolator;
  exports.EaseInOutBackInterpolator = EaseInOutBackInterpolator;
  exports.EaseInOutBounceInterpolator = EaseInOutBounceInterpolator;
  exports.EaseInOutCircInterpolator = EaseInOutCircInterpolator;
  exports.EaseInOutElasticInterpolator = EaseInOutElasticInterpolator;
  exports.EaseInOutCubicInterpolator = EaseInOutCubicInterpolator;
  exports.EaseInOutExpoInterpolator = EaseInOutExpoInterpolator;
  exports.EaseInOutQuadInterpolator = EaseInOutQuadInterpolator;
  exports.EaseInOutQuartInterpolator = EaseInOutQuartInterpolator;
  exports.EaseInOutQuintInterpolator = EaseInOutQuintInterpolator;
  exports.EaseInOutSineInterpolator = EaseInOutSineInterpolator;
  exports.EaseInQuadInterpolator = EaseInQuadInterpolator;
  exports.EaseInQuartInterpolator = EaseInQuartInterpolator;
  exports.EaseInQuintInterpolator = EaseInQuintInterpolator;
  exports.EaseInSineInterpolator = EaseInSineInterpolator;
  exports.EaseOutBackInterpolator = EaseOutBackInterpolator;
  exports.EaseOutBounceInterpolator = EaseOutBounceInterpolator;
  exports.EaseOutCircInterpolator = EaseOutCircInterpolator;
  exports.EaseOutCubicInterpolator = EaseOutCubicInterpolator;
  exports.EaseOutElasticInterpolator = EaseOutElasticInterpolator;
  exports.EaseOutExpoInterpolator = EaseOutExpoInterpolator;
  exports.EaseOutQuadInterpolator = EaseOutQuadInterpolator;
  exports.EaseOutQuartInterpolator = EaseOutQuartInterpolator;
  exports.EaseOutQuintInterpolator = EaseOutQuintInterpolator;
  exports.EaseOutSineInterpolator = EaseOutSineInterpolator;
  exports.LinearInterpolator = LinearInterpolator;
  return exports;
})({});
