import {click, Line, mouseDown, mouseMove, TextOptions, TextStyle} from '@newcar/basic'
import { Text, mouseMoveOnCanvas } from '@newcar/basic'
import type { Ref } from '@newcar/core'
import { ref } from '@newcar/core'
import {CanvasKit} from "canvaskit-wasm";

export interface TextEditorOptions extends TextOptions {
  style?: TextEditorStyle
  editable?: boolean
  selectable?: boolean
}

export interface TextEditorStyle extends TextStyle {}

export default class TextEditor extends Text {
  editable: Ref<boolean>
  selectable: Ref<boolean>

  private isInText = false
  private cursor: Line
  private mouseStart: [number, number]
  private mouseEnd: [number, number]

  constructor(originText: string, options?: TextEditorOptions) {
    super(originText, options)

    this.editable = ref(options.editable ?? true)
    this.selectable = ref(options.selectable ?? true)

    this.cursor = new Line([0, 0], [0, 100]).hide()
    this.add(this.cursor)

    this.on(mouseMoveOnCanvas, (widget, x, y) => {
      if (this.calculateIn(x, y)) {
        console.log('move in!')
        document.body.style.cursor = 'text'
      }
      else {
        document.body.style.cursor = 'auto'
      }
    })

    this.on(mouseDown, () => {
      this.isInText = true
      console.log('click in!')
    })

    this.on(click, (widget, x, y) => {
      this.cursor.from.value = [x, this.calculateRange()[1]]
      this.cursor.to.value = [x, this.calculateRange()[3]]
      this.cursor.show()
    })

    this.on(mouseMove, (x, y) => {
      this.builder.getText()
    })
  }

  init(ck: CanvasKit) {
    super.init(ck)
  }
}
