interface PathData {
  x: number
  y: number
  path: string
}

export function svg2path(svgString: string): PathData[] {
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
  const svgElement = svgDoc.documentElement

  const paths: PathData[] = []

  svgElement.querySelectorAll('*').forEach((el) => {
    const pathData = elementToPathDataWithCoords(el)
    if (pathData) paths.push(pathData)
  })

  return paths
}

function elementToPathDataWithCoords(element: Element): PathData | null {
  const tagName = element.tagName.toLowerCase()
  let path = ''
  let x = 0
  let y = 0

  switch (tagName) {
    case 'path':
      path = element.getAttribute('d') || ''
      break
    case 'rect':
      ;[x, y] = getPos(element, 'x', 'y')
      path = rectToPath(element)
      break
    case 'circle':
      ;[x, y] = getPos(element, 'cx', 'cy')
      path = circleToPath(element)
      break
    case 'ellipse':
      ;[x, y] = getPos(element, 'cx', 'cy')
      path = ellipseToPath(element)
      break
    case 'line':
      ;[x, y] = getPos(element, 'x1', 'y1')
      path = lineToPath(element)
      break
    case 'polygon':
    case 'polyline':
      path = pointsToPath(element)
      // eslint-disable-next-line no-case-declarations
      const points = getFirstPoint(element.getAttribute('points') || '')
      x = points.x
      y = points.y
      break
    default:
      console.warn(`Unsupported SVG element type: ${tagName}`)
      return null
  }

  return { x, y, path }
}

function getFirstPoint(points: string): { x: number; y: number } {
  const [firstPoint] = points.split(' ')
  const [x, y] = firstPoint.split(',').map(Number)
  return { x, y }
}

function pointsToPath(element: Element): string {
  return `M${element.getAttribute('points')}${
    element.tagName.toLowerCase() === 'polygon' ? ' Z' : ''
  }`
}

function rectToPath(rect: Element): string {
  const [x, y, width, height] = getPos(rect, 'x', 'y', 'width', 'height')
  return `M${x},${y} h${width} v${height} h${-width} Z`
}

function circleToPath(circle: Element): string {
  const [cx, cy, r] = getPos(circle, 'cx', 'cy', 'r')
  return `M ${cx - r}, ${cy} a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${
    -2 * r
  },0`
}

function ellipseToPath(ellipse: Element): string {
  const [cx, cy, rx, ry] = getPos(ellipse, 'cx', 'cy', 'rx', 'ry')
  return `M ${cx - rx}, ${cy} a ${rx},${ry} 0 1,0 ${
    2 * rx
  },0 a ${rx},${ry} 0 1,0 ${-2 * rx},0`
}

function lineToPath(line: Element): string {
  const [x1, y1, x2, y2] = getPos(line, 'x1', 'y1', 'x2', 'y2')
  return `M${x1},${y1} L${x2},${y2}`
}

function getPos(el: Element, ...attrs: string[]): number[] {
  const values = attrs.map((attr) =>
    Number.parseFloat(el.getAttribute(attr) || '0'),
  )
  return values
}
