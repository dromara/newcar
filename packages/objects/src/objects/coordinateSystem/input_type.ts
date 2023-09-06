import type { Color } from "@newcar/utils";

import type { Text } from "../text";

export interface coordinate_systemobject {
  directionX?: "left" | "right";
  directionY?: "top" | "bottom";
  intervalX?: number;
  intervalY?: number;
  arrow?: boolean;
  displayPoint?: boolean;
  grid?: boolean;
  numberX?: boolean;
  numberY?: boolean;
  trendX?: (arg0: number) => Text;
  trendY?: (arg0: number) => Text;
  colorX?: Color;
  colorY?: Color;
  grid_color?: string;
}
