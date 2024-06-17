import { Path } from '@newcar/basic'
import type { PathOptions } from '@newcar/basic'

export class Union extends Path {
  constructor(private figure1: Path, private figure2: Path, options?: PathOptions) {
    super(options)
    this.addPathFromOptions(this.figure1.path, this.figure2.path, 'union')
  }
}
