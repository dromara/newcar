import type { Carobj } from ".";

export interface carobject {
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
  contextX?: number;
  contextY?: number;
  children?: Carobj[];
  operation?: GlobalCompositeOperation;
  display?: boolean;
  rotation?: number;
  live?: number;
  die?: number;
  rotationCenterX?: number;
  rotationCenterY?: number;
}
