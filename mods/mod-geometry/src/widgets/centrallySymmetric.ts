import type { Ref, WidgetOptions } from '@newcar/core'
import { Widget, changed, reactive, ref } from '@newcar/core'
import { deepClone } from '@newcar/utils'

export class centrallySymmetric extends Widget {
  private clone: Widget
  center: Ref<[number, number]>

  constructor(
    private originalWidget: Widget,
    center: [number, number],
    options: WidgetOptions,
  ) {
    super(options)
    this.center = ref(center)

    this.clone = reactive(deepClone(originalWidget))
    this.clone.centerX.value = center[0]
    this.clone.centerY.value = center[1]
    this.clone.style.rotation.value = 180

    this.add(this.clone)

    changed(this.clone, (v) => {
      this.clone = v
    })
  }
}
