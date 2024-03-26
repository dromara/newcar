import { defineAnimation } from "@newcar/core";
import { Arc } from "..";

export const move = defineAnimation({
  act(widget, elapsed, process) {
    widget.x += 1
    widget.y += 1
    console.log(widget);
    
  }
})
