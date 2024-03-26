import { defineAnimation } from "@newcar/core";
import { Arc } from "..";

export const move = defineAnimation({
  act(widget, elapsed, process) {
    widget.x += 10
    widget.y += 10
  }
})
