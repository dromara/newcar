/* eslint-disable no-case-declarations */
export function convertSVGToPath(svgElement) {
  // 创建一个新的空 SVG 元素
  const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  newSvg.setAttribute('viewBox', svgElement.getAttribute('viewBox'))
  const elements = svgElement.querySelectorAll('*')

  elements.forEach((el) => {
    switch (el.tagName.toLowerCase()) {
      case 'path':
        newSvg.appendChild(el.cloneNode())
        break
      case 'circle':
      case 'ellipse':
      case 'rect':
      case 'line':
      case 'polyline':
      case 'polygon':
      case 'text':
        const path = convertElementToPath(el)
        if (path)
          newSvg.appendChild(path)

        break
    }
  })

  return newSvg
}

function convertElementToPath(element) {

  try {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const data = element.getAttribute('d')
    path.setAttribute('d', data || '')
    return path
  }
  catch (error) {
    console.error('Error converting element to path:', error)
    return null
  }
}
