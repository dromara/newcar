export interface FixedPositional {
  readonly x: number;
  readonly y: number;
}
export interface Positional extends FixedPositional {
  x: number;
  y: number;
}

export interface FixedRotatable {
  readonly rotation: number;
}
export interface Rotatable extends FixedRotatable {
  rotation: number;
}

export interface FixedScalable {
  readonly scaleX: number;
  readonly scaleY: number;
}
export interface Scalable extends FixedScalable {
  scaleX: number;
  scaleY: number;
}

export interface FixedTransparent {
  readonly transparency: number;
}
export interface Transparent extends FixedTransparent {
  transparency: number;
}
