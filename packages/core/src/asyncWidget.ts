import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget, WidgetOptions } from './widget'

export interface AsyncWidgetResponse {
  status: 'ok' | 'error'
}

export class AsyncWidget extends Widget {
  ready = false

  constructor(options?: WidgetOptions) {
    super(options)
  }

  override async init(ck: CanvasKit): Promise<AsyncWidgetResponse> {
    return {
      status: 'ok'
    }
  }

  override async predraw(ck: CanvasKit, propertyChanged: string): Promise<AsyncWidgetResponse> {
    return {
      status: 'ok'
    }
  }

  override async preupdate(ck: CanvasKit, propertyChanged?: string): Promise<AsyncWidgetResponse> {
    const res = await this.predraw(ck, propertyChanged)
    if (res.status === 'error') {
      console.warn('[Newcar Warn] Failed to laod async widget, please check if your network.')
    }
    return res
  }

  _isAsyncWidget() {
    return true
  }
}
