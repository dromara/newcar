import type { Animation, AnimationInstance } from './animation'
import type { Widget } from './widget'

export interface AnimationTree {
  animation: Animation<Widget>
  duration: number
  mode: 'positive' | 'reverse'
  next: AnimationTree[] | AnimationTree
}

export function createAnimationTree(tree: AnimationTree) {
  return tree
}

export function analyseAnimationTree(tree: AnimationTree, start: number) {
  const animations: AnimationInstance[] = []
  animations.push({
    startAt: start,
    during: tree.duration,
    animation: tree.animation,
    mode: tree.mode,
  })
  if (Array.isArray(tree.next)) {
    for (const item of tree.next) {
      if ((item as AnimationTree).next) {
        animations.push(
          ...analyseAnimationTree(item as AnimationTree, start + tree.duration),
        )
      }
      else {
        console.warn(
          '[Newcar Warn] You are trying to add a Animation or AnimationInstance object as next, please use AnimationTree object',
        )
      }
    }
    return animations
  }
}
