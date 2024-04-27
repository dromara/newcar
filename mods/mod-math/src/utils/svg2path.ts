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
    if (pathData)
      paths.push(pathData)
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
      x = Number.parseFloat(element.getAttribute('x') || '0')
      y = Number.parseFloat(element.getAttribute('y') || '0')
      path = rectToPath(element)
      break
    case 'circle':
      x = Number.parseFloat(element.getAttribute('cx') || '0')
      y = Number.parseFloat(element.getAttribute('cy') || '0')
      path = circleToPath(element)
      break
    case 'ellipse':
      x = Number.parseFloat(element.getAttribute('cx') || '0')
      y = Number.parseFloat(element.getAttribute('cy') || '0')
      path = ellipseToPath(element)
      break
    case 'line':
      x = Number.parseFloat(element.getAttribute('x1') || '0')
      y = Number.parseFloat(element.getAttribute('y1') || '0')
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

function getFirstPoint(points: string): { x: number, y: number } {
  const [firstPoint] = points.split(' ')
  const [x, y] = firstPoint.split(',').map(Number)
  return { x, y }
}

function pointsToPath(element: Element): string {
  return `M${element.getAttribute('points')}${element.tagName.toLowerCase() === 'polygon' ? ' Z' : ''}`
}

function rectToPath(rect: Element): string {
  const x = Number.parseFloat(rect.getAttribute('x') || '0')
  const y = Number.parseFloat(rect.getAttribute('y') || '0')
  const width = Number.parseFloat(rect.getAttribute('width') || '0')
  const height = Number.parseFloat(rect.getAttribute('height') || '0')
  return `M${x},${y} h${width} v${height} h${-width} Z`
}

function circleToPath(circle: Element): string {
  const cx = Number.parseFloat(circle.getAttribute('cx') || '0')
  const cy = Number.parseFloat(circle.getAttribute('cy') || '0')
  const r = Number.parseFloat(circle.getAttribute('r') || '0')
  return `M ${cx - r}, ${cy} a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`
}

function ellipseToPath(ellipse: Element): string {
  const cx = Number.parseFloat(ellipse.getAttribute('cx') || '0')
  const cy = Number.parseFloat(ellipse.getAttribute('cy') || '0')
  const rx = Number.parseFloat(ellipse.getAttribute('rx') || '0')
  const ry = Number.parseFloat(ellipse.getAttribute('ry') || '0')
  return `M ${cx - rx}, ${cy} a ${rx},${ry} 0 1,0 ${2 * rx},0 a ${rx},${ry} 0 1,0 ${-2 * rx},0`
}

function lineToPath(line: Element): string {
  const x1 = Number.parseFloat(line.getAttribute('x1') || '0')
  const y1 = Number.parseFloat(line.getAttribute('y1') || '0')
  const x2 = Number.parseFloat(line.getAttribute('x2') || '0')
  const y2 = Number.parseFloat(line.getAttribute('y2') || '0')
  return `M${x1},${y1} L${x2},${y2}`
}
