import type { Carobj } from ".";

export interface carobject {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  children?: Carobj[];
  operation?: GlobalCompositeOperation;
  display?: boolean;
  rotation?: number;
  transparency?: number;
}
