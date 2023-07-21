import type { Carobj } from ".";

export type carobject = {
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
  children?: Carobj[];
  operation?: GlobalCompositeOperation;
  display?: boolean;
  rotation?: number;
  live?: number;
  die?: number;
  rotationCenterX?: number;
  rotationCenterY?: number;
  transparency?: number
}
