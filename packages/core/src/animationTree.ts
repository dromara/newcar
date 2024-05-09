import type { Animation, AnimationInstance } from './animation'
import type { Widget } from './widget'

/**
 * Animation Tree is used when you want to run a group of animations.
 */
export interface AnimationTree {
  /**
   * The animation that this node need
   */
  animation: Animation<Widget>
  duration: number
  mode: 'positive' | 'reverse'
  /**
   * The next animation node of this AnimationTree
   */
  next: AnimationTree[] | AnimationTree
}

/**
 * Creating a AnimationTree.
 * @param tree The `AnimationTree` Interface instance.
 * @returns A `AnimationTree` object.
 */
export function createAnimationTree(tree: AnimationTree) {
  return tree
}

/**
 * Analyzing the animation tree and transform them into common animation.
 * @param tree The `AnimationTree` object.
 * @param start The start frame.
 * @returns A list that composed by `AnimationInstance`s
 */
export function analyseAnimationTree<T extends Widget>(tree: AnimationTree, start: number) {
  const animations: AnimationInstance<T>[] = []
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
