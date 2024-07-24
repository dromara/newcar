import type { Widget } from '@newcar/core'
import { defineGlobalPlugin } from '@newcar/core'

function timeview(element: HTMLElement) {
  return defineGlobalPlugin({
    name: 'timeview',
    key: 'plugin-timeview',
    version: '0.0.0',
    onPlay(app) {
      element.style.border = '1px solid grey'
      let level = 0
      function process(child: Widget, current: HTMLElement) {
        level += 1
        const childElement = document.createElement('div')
        childElement.innerHTML = child.constructor.name
        childElement.style.border = '1px solid grey'
        childElement.style.userSelect = 'none'
        childElement.addEventListener('mouseover', (event) => {
          event.stopPropagation()
          childElement.style.color = 'skyblue'
        })
        childElement.addEventListener('mouseout', (event) => {
          event.stopPropagation()
          childElement.style.color = 'black'
        })
        childElement.addEventListener('click', (event) => {
          event.stopPropagation()
          for (const ele of childElement.children) {
            (ele as HTMLElement).hidden = !(ele as HTMLElement).hidden
          }
        })
        if (level !== 1)
          childElement.style.marginLeft = '30px'
        if (level > 2) {
          childElement.hidden = true
        }
        current.appendChild(childElement)
        child.children.forEach((child) => {
          process(child, childElement)
        })
        level -= 1
      }
      process(app.scene.root.children[0], element)
    },
  })
}

export default timeview
