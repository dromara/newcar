import { defineGlobalPlugin } from '@newcar/core'
import type { App } from '@newcar/core'

export default function debug(dash: HTMLElement) {
  return defineGlobalPlugin({
    name: 'debug',
    key: 'plugin-debug',
    version: '0.0.0',

    onUpdate(app, elapsed) {
      dash.innerHTML = `
        <div>
          <span style="color: red">N</span><span style="color: orange">e</span><span style="color: yellow">w</span><span style="color: green">c</span><span style="color: blue">a</span><span style="color: purple">r</span><span> Console</span>
          <br/>
          <span>unit: ${(app as App).config.unit}</span>
          <br/>
          <span>elapsed: ${elapsed}</span>
        </div>
        `
    },
  })
}
