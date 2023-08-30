import type { Text } from "../text";

export interface coordinate_systemobject {
  x_direction?: "left" | "right";
  y_direction?: "top" | "bottom";
  x_point_interval?: number;
  y_point_interval?: number;
  arrow?: boolean;
  display_point?: boolean;
  grid?: boolean;
  x_number?: boolean;
  y_number?: boolean;
  x_number_trend?: (arg0: number) => Text;
  y_number_trend?: (arg0: number) => Text;
  x_color?: string;
  y_color?: string;
  grid_color?: string;
}
