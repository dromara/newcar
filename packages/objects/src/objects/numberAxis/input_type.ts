import type { Text } from "../text";

export interface number_axisobject {
  color: string;
  direction: "left" | "right";
  width: number;
  point_interval: number;
  arrow: boolean;
  display_point: boolean;
  number: boolean;
  number_trend: (arg0: number) => Text;
}
