import type { Text } from "../objects";
import type { TimingFunction } from "../timing-functions";
import type { Animate } from "./animate";

export const textInput: Animate = (
  object: Text,
  process: number,
  _by: TimingFunction,
  params: { to: string },
): void => {
  object.text = params.to.slice(0, Math.round(process * params.to.length));
};
