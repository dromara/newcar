import { defineAnimation } from "@newcar/core";
import { Arc } from "..";

export const move = defineAnimation({
  act(widget, elapsed, process) {
    widget.x += 0.01
    widget.y += 0.01
  }
})
