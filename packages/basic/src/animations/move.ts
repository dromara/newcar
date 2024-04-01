// import { changeProperty } from "@newcar/core";

import { defineAnimation } from "@newcar/core";

// export const move = changeProperty(['x', 'y'])

export const move = defineAnimation({
  act(widget, e, p, params) {
    widget.x = e
  }
})
