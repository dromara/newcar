import { type Carobj } from "./objects/index";
import { IRenderable } from "./objects/interfaces/Renderable";
import { IRendererController } from "./objects/interfaces/RenderController";

export class Car implements IRenderable, IRendererController {
  #ele: HTMLCanvasElement; // The html element of canvas.
  #objects: Carobj[] = []; // The objects of animation.
  #every?: (agr0: number) => void; // Do it for every frame.
  #start?: () => void; // Do it before the animation started.
  #fps = 0; // The FPS.
  #frameImmediately = 0; // Current number of frames.
  #ctx: CanvasRenderingContext2D | null = null; // The context of canvas.

  /**
   * Create a animation of newcar.
   * @param ele The element of canvas.
   * @param fps The FPS of the animation.
   */
  constructor(ele: HTMLCanvasElement, fps: number) {
    this.#ele = ele;
    if (this.#ele.getContext) {
      this.#fps = fps;
      this.#ctx = this.#ele.getContext("2d");
    }
    console.log("test1");
    return this;
  }

  /**
   * Set this.#every
   * @param command the fuction.
   */
  onUpdate(command: (agr0: number) => void) {
    this.#every = command;
    return this;
  }

  /**
   * Set this.#start
   * @param command The function.
   */
  forStart(command: () => void) {
    this.#start = command;
    return this;
  }

  /**
   * Start the animation.
   */
  start() {
    this.#frameImmediately = 0;
    if (this.#ctx === null) return;
    this.#start && this.#start();
    // eslint-disable-next-line no-constant-condition
    setInterval(() => {
      this.#ctx?.clearRect(0, 0, this.#ele.width, this.#ele.height);
      this.#frameImmediately += 1;
      this.#every && this.#every(this.#frameImmediately);
      this.#objects.forEach((object) => {
        if (!object.display || !object.lifeStatus) return;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        object.onUpdate(this.#ctx!);
      });
    }, 1000 / this.#fps);
  }

  /**
   * Link the Car Object on the animation.
   * @param obj the Carobj Object.
   */
  linkObject(obj: Carobj) {
    this.#objects.push(obj);
  }

  /**
   * Export the video of this newcar animation
   * @param startTime The time of start time.
   * @param endTime The time of end time.
   */
  exports(startTime: number, endTime: number) {
    // TODO: Export the video.
    const stream = this.#ele.captureStream();
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    const data: BlobPart[] | undefined = [];
    recorder.ondataavailable = function (event) {
      if (event.data && event.data.size) {
        data.push(event.data);
      }
    };
    recorder.onstop = () => {
      const url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
      console.log(url);
    };
    recorder.start();
    window.setTimeout(() => {
      recorder.stop();
    }, endTime * 1000);
  }
}

export { Text } from "./objects/text";
export { Spirit } from "./objects/spirit";
export { Point } from "./objects/graph/point";
export { Line } from "./objects/graph/line";
export { Definition } from "./objects/graph/definition";
export { LineSegment } from "./objects/graph/lineSegment";
export { Circle } from "./objects/graph/circle";
export { AnimationBuilder } from "./builder/AnimationBuilder";
export { MutateContent } from "./builder/builder_items/MutateContent";
export { Interpolator } from "./interpolation/Interpolator";
export { LinearInterpolator } from "./interpolation/LinearInterpolator";
export { Translation } from "./builder/builder_items/Translation";
export { Rotation } from "./builder/builder_items/Rotation";
export { Scale } from "./builder/builder_items/Scale";
export { ChangingStatus } from "./builder/builder_items/ChangingStatus";
export { Limit } from "./builder/builder_items/Limit";
export { AngleCircle } from "./builder/builder_items/AngleCircle";
export { SingleFrameAction } from "./builder/builder_items/SingleFrameAction";
export {
  EaseInBackInterpolator,
  EaseInBounceInterpolator,
  EaseInCircInterpolator,
  EaseInCubicInterpolator,
  EaseInElasticInterpolator,
  EaseInExpoInterpolator,
  EaseInOutBackInterpolator,
  EaseInOutBounceInterpolator,
  EaseInOutCircInterpolator,
  EaseInOutElasticInterpolator,
  EaseInOutCubicInterpolator,
  EaseInOutExpoInterpolator,
  EaseInOutQuadInterpolator,
  EaseInOutQuartInterpolator,
  EaseInOutQuintInterpolator,
  EaseInOutSineInterpolator,
  EaseInQuadInterpolator,
  EaseInQuartInterpolator,
  EaseInQuintInterpolator,
  EaseInSineInterpolator,
  EaseOutBackInterpolator,
  EaseOutBounceInterpolator,
  EaseOutCircInterpolator,
  EaseOutCubicInterpolator,
  EaseOutElasticInterpolator,
  EaseOutExpoInterpolator,
  EaseOutQuadInterpolator,
  EaseOutQuartInterpolator,
  EaseOutQuintInterpolator,
  EaseOutSineInterpolator,
} from "./interpolation/NonlinearInterpolators";
