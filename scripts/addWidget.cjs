// generator.js

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const className = args[0]
const baseClassName = args[1]
const directory = args[2] || 'packages/basic/src/widgets/'

const fileName = className
  .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
  .slice(1)

const content = `import type { Canvas, CanvasKit, Paint, RRect } from 'canvaskit-wasm'

export interface ${className}Options extends ${baseClassName} {
  style?: ${className}Style
}

export interface ${className}Style extends ${baseClassName} {}

export class ${className} extends ${baseClassName} {

  constructor(options?: ${className}Options) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {}

  predraw(ck: CanvasKit, propertyChanged: string): void {}

  draw(canvas: Canvas): void {}
}
`

const filePath = path.join(directory, `${fileName}.ts`)

fs.writeFile(filePath, content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err)
  } else {
    console.log(`File ${filePath} has been created successfully.`)
  }
})
