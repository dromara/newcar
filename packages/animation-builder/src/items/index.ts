import { AnimationBuilderItem } from "../item";
import { AngleCircle } from "./AngleCircle";
import { ChangingStatus } from "./ChangingStatus";
import { Limit } from "./Limit";
import { MutateContent } from "./MutateContent";
import { Rotation } from "./Rotation";
import { Scale } from "./Scale";
import { SingleFrameAction } from "./SingleFrameAction";
import { Translation } from "./Translation";

export const animation = ((exports: Record<string, unknown>) => {
  exports.Translation = Translation;
  exports.Rotation = Rotation;
  exports.Scale = Scale;
  exports.ChangingStatus = ChangingStatus;
  exports.Limit = Limit;
  exports.AngleCircle = AngleCircle;
  exports.SingleFrameAction = SingleFrameAction;
  exports.MutateContent = MutateContent;
  exports.AnimationBuilderItem = AnimationBuilderItem;

  return exports;
})({});
