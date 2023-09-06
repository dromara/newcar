import type { Color } from "@newcar/utils";

import type { Text } from "../text";

export interface number_axisobject {
  color?: Color;
  direction?: "left" | "right";
  interval?: number;
  arrow?: boolean;
  displayPoint?: boolean;
  number?: boolean;
  trend?: (arg0: number) => Text;
}
