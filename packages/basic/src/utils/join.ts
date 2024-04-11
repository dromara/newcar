import { CanvasKit, EmbindEnumEntity } from "canvaskit-wasm";

export type Join = 'bevel' | 'miter' | 'round' 

export function str2StrokeJoin(ck: CanvasKit, str: Join): EmbindEnumEntity {
  switch (str) {
    case 'bevel': {
      return ck.StrokeJoin.Bevel
    }
    case 'miter': {
      return ck.StrokeJoin.Miter
    }
    case 'round': {
      return ck.StrokeJoin.Round
    }
  }
}