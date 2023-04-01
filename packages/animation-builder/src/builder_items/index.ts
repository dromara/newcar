import { Translation } from "./Translation";
import { Rotation } from "./Rotation";
import { Scale } from "./Scale";
import { ChangingStatus } from "./ChangingStatus";
import { Limit } from "./Limit";
import { AngleCircle } from "./AngleCircle";
import { SingleFrameAction } from "./SingleFrameAction";
import { MutateContent } from "./MutateContent";
import { AnimationBuilderItem } from "../item";

export const animation = ((exports: Record<string, unknown>) => {
  exports.Translation = Translation;
  exports.Rotation = Rotation;
  exports.Scale = Scale;
  exports.ChangingStatus = ChangingStatus;
  exports.Limit = Limit;
  exports.AngleCircle = AngleCircle;
  exports.SingleFrameAction = SingleFrameAction;
  exports.MutateContent = MutateContent;
  return exports;
})({});
