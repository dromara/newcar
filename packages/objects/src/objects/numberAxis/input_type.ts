import type { Color } from "@newcar/utils";

import type { Text } from "../text";

export interface number_axisobject {
  color?: Color;
  direction?: "left" | "right";
  point_interval?: number;
  arrow?: boolean;
  display_point?: boolean;
  number?: boolean;
  number_trend?: (arg0: number) => Text;
}
