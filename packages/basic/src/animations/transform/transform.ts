import { useAnimate } from '@newcar/core'
import type { Path as ckPath } from 'canvaskit-wasm'
import type { Path } from '../../widgets'

export function transform() {
  // 辅助函数：插值两个点之间的中点
  function interpolatePoint(p1, p2, t) {
    return [
      p1[0] + (p2[0] - p1[0]) * t,
      p1[1] + (p2[1] - p1[1]) * t,
    ]
  }

  // 辅助函数：在路径点之间插入点
  function addInterpolatedPoints(points, numPoints) {
    const newPoints = []
    for (let i = 0; i < points.length - 1; i++) {
      newPoints.push(points[i])
      for (let j = 1; j < numPoints; j++) {
        newPoints.push(interpolatePoint(points[i], points[i + 1], j / numPoints))
      }
    }
    newPoints.push(points[points.length - 1])
    return newPoints
  }

  // 平衡路径点数量
  function balancePathPoints(points1, points2) {
    const len1 = points1.length
    const len2 = points2.length

    if (len1 > len2) {
      points2 = addInterpolatedPoints(points2, Math.floor(len1 / len2) - 1)
    }
    else if (len2 > len1) {
      points1 = addInterpolatedPoints(points1, Math.floor(len2 / len1) - 1)
    }

    // 确保点数量相等
    while (points1.length !== points2.length) {
      if (points1.length < points2.length) {
        points1.push(points1[points1.length - 1])
      }
      else {
        points2.push(points2[points2.length - 1])
      }
    }

    const result1: Array<number> = []
    points1.forEach(p => result1.push(p[0], p[1]))
    const result2: Array<number> = []
    points2.forEach(p => result2.push(p[0], p[1]))

    return [result1, result2]
  }

  return useAnimate<Path, {
    to: Path
  }>((ctx) => {
    if (!ctx.to.isImplemented.value) {
      ctx.to.init(ctx.ck)
      ctx.to.isImplemented.value = true
    }

    // 获取起始和目标路径的点
    const points1 = []
    for (let i = 0; i < ctx.widget.path.countPoints(); i++)
      points1.push(ctx.widget.path.getPoint(i))

    const points2 = []
    for (let i = 0; i < ctx.to.path.countPoints(); i++)
      points2.push(ctx.to.path.getPoint(i))

    // 平衡路径点数量
    const [balancedPoints1, balancedPoints2] = balancePathPoints(points1, points2)

    // 定义动词列表，假设所有点之间是直线
    const verbList = Array.from({ length: balancedPoints1.length / 2 }).fill(ctx.ck.LINE_VERB)
    verbList[0] = ctx.ck.MOVE_VERB // 第一个动词应该是 Move

    // 创建并调整克隆路径
    const clonedWidget = ctx.widget.path.copy()
    clonedWidget.rewind()
    clonedWidget.addVerbsPointsWeights(verbList, balancedPoints1, [])

    ctx.to.path.rewind()
    ctx.to.path.addVerbsPointsWeights(verbList, balancedPoints2, [])

    // 创建插值路径并添加到原路径
    const interpolatedPath = ctx.ck.Path.MakeFromPathInterpolation(clonedWidget, ctx.to.path, ctx.process)
    ctx.widget.path.rewind()
    ctx.widget.path.addPath(interpolatedPath)

    // 清理临时路径
    clonedWidget.delete()
    interpolatedPath.delete()
  })
}
