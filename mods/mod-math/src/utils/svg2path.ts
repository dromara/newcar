/* eslint-disable no-cond-assign */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-case-declarations */
export function svg2path(svgString: string): string {
  const path = []

  const svgRegex = /<(rect|circle|ellipse|line|polyline|polygon|path|text|image|use|symbol|g|defs)\s+([^>]+)>/g
  let match
  while ((match = svgRegex.exec(svgString)) !== null) {
    const tagName = match[1]
    const attrs = match[2].trim().split(/\s+/)

    switch (tagName) {
      case 'rect':
        const x = attrs.find(attr => attr.startsWith('x='))?.replace('x=', '')
        const y = attrs.find(attr => attr.startsWith('y='))?.replace('y=', '')
        const width = attrs.find(attr => attr.startsWith('width='))?.replace('width=', '')
        const height = attrs.find(attr => attr.startsWith('height='))?.replace('height=', '')
        if (x && y && width && height && !Number.isNaN(+x) && !Number.isNaN(+y) && !Number.isNaN(+width) && !Number.isNaN(+height))
          path.push(`M${x} ${y} L${+x + +width} ${y} L${+x + +width} ${+y + +height} L${x} ${+y + +height} Z`)

        break
      case 'circle':
        const cx = attrs.find(attr => attr.startsWith('cx='))?.replace('cx=', '')
        const cy = attrs.find(attr => attr.startsWith('cy='))?.replace('cy=', '')
        const r = attrs.find(attr => attr.startsWith('r='))?.replace('r=', '')
        if (cx && cy && r && !Number.isNaN(+cx) && !Number.isNaN(+cy) && !Number.isNaN(+r))
          path.push(`M${cx} ${+cy - +r} A${r} ${r} 0 1 1 ${cx} ${+cy + +r} Z`)

        break
      case 'ellipse':
        const rx = attrs.find(attr => attr.startsWith('rx='))?.replace('rx=', '')
        const ry = attrs.find(attr => attr.startsWith('ry='))?.replace('ry=', '')
        if (rx && ry && !Number.isNaN(+rx) && !Number.isNaN(+ry))
          path.push(`M${cx} ${+cy - +ry} A${rx} ${ry} 0 1 1 ${cx} ${+cy + +ry} Z`)

        break
      case 'line':
        const x1 = attrs.find(attr => attr.startsWith('x1='))?.replace('x1=', '')
        const y1 = attrs.find(attr => attr.startsWith('y1='))?.replace('y1=', '')
        const x2 = attrs.find(attr => attr.startsWith('x2='))?.replace('x2=', '')
        const y2 = attrs.find(attr => attr.startsWith('y2='))?.replace('y2=', '')
        if (x1 && y1 && x2 && y2 && !Number.isNaN(+x1) && !Number.isNaN(+y1) && !Number.isNaN(+x2) && !Number.isNaN(+y2))
          path.push(`M${x1} ${y1} L${x2} ${y2}`)

        break
      case 'polyline':
        let points = attrs.find(attr => attr.startsWith('points='))?.replace('points=', '')
        if (points) {
          const pointArray = points.split(' ')
          if (pointArray.every(point => !Number.isNaN(+point))) {
            path.push(`M${pointArray[0]} ${pointArray[1]}`)
            for (let i = 2; i < pointArray.length; i += 2)
              path.push(`L${pointArray[i]} ${pointArray[i + 1]}`)
          }
        }
        break
      case 'polygon':
        points = attrs.find(attr => attr.startsWith('points='))?.replace('points=', '')
        if (points) {
          const pointArray = points.split(' ')
          if (pointArray.every(point => !Number.isNaN(+point))) {
            path.push(`M${pointArray[0]} ${pointArray[1]}`)
            for (let i = 2; i < pointArray.length; i += 2)
              path.push(`L${pointArray[i]} ${pointArray[i + 1]}`)

            path.push('Z')
          }
        }
        break
      case 'path':
        const d = attrs.find(attr => attr.startsWith('d='))?.replace('d=', '')
        if (d)
          path.push(d)

        break
      case 'text':
        const textX = attrs.find(attr => attr.startsWith('x='))?.replace('x=', '')
        const textY = attrs.find(attr => attr.startsWith('y='))?.replace('y=', '')
        const textString = match[0].replace(/<text[^>]+>/, '').trim()
        if (textX && textY && !Number.isNaN(+textX) && !Number.isNaN(+textY)) {
          for (let i = 0; i < textString.length; i++) {
            const charCode = textString.charCodeAt(i)
            if (charCode >= 65 && charCode <= 90) { // Uppercase letters
              path.push(`M${textX + i * 10} ${textY} m 0 -5 l 0 10 l 5 0 l 0 -10 Z`)
            }
            else if (charCode >= 97 && charCode <= 122) { // Lowercase letters
              path.push(`M${textX + i * 10} ${textY} m 0 -3 l 0 6 l 3 0 l 0 -6 Z`)
            }
            else if (charCode === 32) { // Space
              path.push(`M${textX + i * 10} ${textY} m 0 -2 l 0 4 l 2 0 l 0 -4 Z`)
            }
            else {
              path.push(`M${textX + i * 10} ${textY} m 0 -5 l 0 10 l 5 0 l 0 -10 Z`)
            }
          }
        }
        break
      case 'image':
        const imageX = attrs.find(attr => attr.startsWith('x='))?.replace('x=', '')
        const imageY = attrs.find(attr => attr.startsWith('y='))?.replace('y=', '')
        const imageWidth = attrs.find(attr => attr.startsWith('width='))?.replace('width=', '')
        const imageHeight = attrs.find(attr => attr.startsWith('height='))?.replace('height=', '')
        if (imageX && imageY && imageWidth && imageHeight && !Number.isNaN(+imageX) && !Number.isNaN(+imageY) && !Number.isNaN(+imageWidth) && !Number.isNaN(+imageHeight))
          path.push(`M${imageX} ${imageY} L${+imageX + +imageWidth} ${imageY} L${+imageX + +imageWidth} ${+imageY + +imageHeight} L${imageX} ${+imageY + +imageHeight} Z`)

        break
      case 'use':
        const useX = attrs.find(attr => attr.startsWith('x='))?.replace('x=', '')
        const useY = attrs.find(attr => attr.startsWith('y='))?.replace('y=', '')
        const xlinkHref = attrs.find(attr => attr.startsWith('xlink:href='))?.replace('xlink:href=', '')
        if (useX && useY && xlinkHref && !Number.isNaN(+useX) && !Number.isNaN(+useY)) {
          const symbolRegex = new RegExp(`<symbol id="${xlinkHref}"\\s+([^>]+)>(.*?)<\/symbol>`, 'g')
          const symbolMatch = symbolRegex.exec(svgString)
          if (symbolMatch) {
            const symbolAttrs = symbolMatch[1].trim().split(/\s+/)
            const symbolPath = svg2path(symbolMatch[2])
            path.push(`M${useX} ${useY} ${symbolPath}`)
          }
        }
        break
      case 'symbol':
        let symbolViewBox = attrs.find(attr => attr.startsWith('viewBox='))?.replace('viewBox=', '')
        if (typeof symbolViewBox !== 'undefined')
          symbolViewBox = symbolViewBox.replace('transform=', '')

        const symbolPath = svg2path(match[2])
        if (symbolPath)
          path.push(`M0 0 ${symbolPath}`)

        break
      case 'g':
        let gTransform = attrs.find(attr => attr.startsWith('transform='))
        if (typeof gTransform !== 'undefined')
          gTransform = gTransform.replace('transform=', '')

        const gPath = svg2path(match[2])
        if (gPath)
          path.push(`M0 0 ${gTransform} ${gPath}`)

        break
      case 'defs':
        const defsPath = svg2path(match[2])
        if (defsPath)
          path.push(`M0 0 ${defsPath}`)

        break
    }
  }

  return path.join(' ')
}
