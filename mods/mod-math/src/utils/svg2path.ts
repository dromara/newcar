/* eslint-disable no-case-declarations */
import { mat2d, vec2 } from 'gl-matrix'

/**
 * 解析 SVG 变换字符串。
 * @param {string} transformStr - 变换字符串。
 * @returns {mat2d} - 变换矩阵。
 */
function parseTransform(transformStr: string) {
  const matrix = mat2d.create()
  const regex = /(\w+)\(([^)]+)\)/g
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(transformStr)) !== null) {
    const [_, type, args] = match
    const values = args.split(',').map(Number.parseFloat)
    switch (type) {
      case 'translate':
        mat2d.translate(matrix, matrix, new Float32Array(values))
        break
      case 'rotate':
        const angle = values[0] * Math.PI / 180
        mat2d.rotate(matrix, matrix, angle)
        break
      case 'scale':
        mat2d.scale(matrix, matrix, new Float32Array(values))
        break
      default:
        console.error(`Unsupported transform type: ${type}`)
    }
  }

  return matrix
}

/**
 * 应用变换到路径。
 * @param {string} pathData - SVG 路径数据。
 * @param {string} transform - 变换字符串。
 * @returns {{ x: number, y: number, path: string }} - 变换后的路径信息。
 */
function applyTransforms(pathData: string, transform: string) {
  const matrix = parseTransform(transform)
  const point = vec2.fromValues(0, 0) // 假设路径起始于 (0, 0)
  vec2.transformMat2d(point, point, matrix)

  return {
    x: point[0],
    y: point[1],
    path: pathData,
  }
}

/**
 * 从 SVG 字符串内容中提取所有路径并应用变换。
 * @param {string} svgContent - SVG 文件的完整内容。
 * @returns {Array} - 变换后的路径信息数组。
 */
export function svg2path(svgContent: string) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(svgContent, 'image/svg+xml')
  const paths: { x: any, y: any, path: any }[] = []

  const pathElements = xmlDoc.querySelectorAll('path')
  pathElements.forEach((pathElem) => {
    const pathData = pathElem.getAttribute('d')
    const transform = pathElem.closest('g')?.getAttribute('transform') || ''
    const transformedPath = applyTransforms(pathData, transform)
    paths.push(transformedPath)
  })

  return paths
}
