import type { CanvasKit } from 'canvaskit-wasm'
import type { WidgetOptions } from './widget'
import { Widget } from './widget'

export interface AsyncWidgetResponse {
  status: 'ok' | 'error'
}

/**
 * @see Widget
 */
export class AsyncWidget extends Widget {
  ready = false

  constructor(options?: WidgetOptions) {
    super(options)
  }

  override async init(_ck: CanvasKit): Promise<AsyncWidgetResponse> {
    return {
      status: 'ok',
    }
  }

  _isAsyncWidget() {
    return true
  }
}
