/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as c from '@newcar/core'
import * as b from '@newcar/basic'
import * as u from '@newcar/utils'
import { once } from '@newcar/utils'
import * as wc from './index'

export type NcNamespace = typeof wc & typeof c & typeof b & typeof u

declare global {
  // @ts-ignore
  var newcar: NcNamespace

  interface WindowEventMap {
    'newcarloaded': Event
  }
}

const registerGlobals = once(() => {
  const global = globalThis as any
  global.newcar = Object.assign({}, wc, c, b, u)
})

registerGlobals()

if (window?.document != null) {
  wc.registerCustomElements()
  window.dispatchEvent(new Event('newcarloaded'))

}

export type * from '@newcar/core'
export type * from '@newcar/basic'
export type * from '@newcar/utils'

export { }
