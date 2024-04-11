import { CanvasKit, EmbindEnumEntity } from "canvaskit-wasm";

export type Cap = 'butt' | 'round' | 'square'
export function str2StrokeCap(ck: CanvasKit, str: Cap): EmbindEnumEntity {
  switch (str) {
    case 'butt': {
      return ck.StrokeCap.Butt
    }
    case 'round': {
      return ck.StrokeCap.Round
    }
    case 'square': {
      return ck.StrokeCap.Square
    }
  }
}