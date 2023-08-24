export interface coordinate_systemobject {
  x_direction?: "left" | "right";
  y_direction?: "top" | "bottom";
  x_division?: number;
  y_division?: number;
  x_width?: number;
  y_width?: number;
  x_point_color: string;
  y_point_color: string;
  x_point_interval?: number;
  y_point_interval?: number;
  arrow?: boolean;
  displayPoint?: boolean;
  grid?: boolean;
  x_color?: string;
  y_color?: string;
  grid_color?: string;
}
