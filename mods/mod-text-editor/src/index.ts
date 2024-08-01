import type { TextOptions, TextStyle } from '@newcar/basic'
import { Text } from '@newcar/basic'
import { changed } from '@newcar/core'
import type { Canvas, CanvasKit } from 'canvaskit-wasm'

export interface TextEditorOptions extends TextOptions {
  style?: TextEditorStyle
}

export interface TextEditorStyle extends TextStyle {}

export default class TextEditor extends Text {
  element: HTMLInputElement = document.createElement('input')

  constructor(originText: string, options?: TextEditorOptions) {
    options.style ??= {}
    super(originText, options ?? {})
  }

  init(ck: CanvasKit) {
    super.init(ck)

    this.element.style.width = `${this.calculateRange()[2]}px`
    this.element.style.height = `${this.calculateRange()[3]}px`
  }

  setElement(element: HTMLCanvasElement) {
    super.setElement(element)
    element.parentElement.appendChild(this.element)
    this.element.style.position = 'absolute'
    this.element.style.backgroundColor = 'rgba(0,0,0,0)'
    this.element.style.left = `${this.x.value + element.getBoundingClientRect().left}px`
    this.element.style.top = `${this.y.value + element.getBoundingClientRect().top}px`
    this.element.style.border = 'none'
    this.element.style.fontSize = `${this.style.fontSize.value}px`
    this.element.style.color = this.style.color.toString()

    changed(this.x, (v) => {
      this.element.style.left = `${v.value + element.clientLeft}px`
    })
    changed(this.y, (v) => {
      this.element.style.top = `${v.value + element.clientTop}px`
    })
    changed(this.text, () => {
      this.element.style.width = `${this.calculateRange()[2]}px`
      this.element.style.height = `${this.calculateRange()[3]}px`
    })

    this.element.addEventListener('click', () => {
      this.element.value = this.text.value
      this.hide()
    })
    this.element.addEventListener('blur', () => {
      this.text.value = this.element.value
      this.show()
      this.element.value = ''
    })
  }

  draw(canvas: Canvas) {
    super.draw(canvas)
  }
}
