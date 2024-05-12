/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as c from '@newcar/core'
import * as b from '@newcar/basic'
import * as u from '@newcar/utils'
import { once } from '@newcar/utils'
import * as wc from './index'

export type NcNamespace = typeof wc & typeof c & typeof b & typeof u

declare global {
  var newcar: NcNamespace
}

const registerGlobals = once(() => {
  const global = globalThis as any
  global.newcar = Object.assign({}, wc, c, b, u)
})

registerGlobals()

export { }
