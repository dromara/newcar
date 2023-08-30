import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";

export function exportAnimationToVideo(
  core: IRenderable & IRendererController,
  startAt: number,
  lastAt: number,
  onFinish: (arg0: string) => void,
) {
  try {
    const recorder = createRecorder(core.element, {
      minmeType: "video/webm",
    });
    setRecorder(recorder, onFinish);
    record(recorder, core, startAt, lastAt);
  } catch {}
}

function createRecorder(element: HTMLCanvasElement, data: Record<string, unknown>) {
  const stream = element.captureStream();
  const recorder = new MediaRecorder(stream, data);

  return recorder;
}

function setRecorder(recorder: MediaRecorder, onFinish: (arg0: string) => void) {
  const data: Blob[] = [];
  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      data.push(event.data);
    }
  };
  recorder.onstop = () => {
    const url = URL.createObjectURL(
      new Blob(data, {
        type: "video/webm",
      }),
    );
    onFinish(url);
  };
}

function record(
  recorder: MediaRecorder,
  core: IRenderable & IRendererController,
  startAt: number,
  lastAt: number,
) {
  const length = lastAt - startAt;
  recorder.start();
  core.continue(startAt);
  setTimeout(() => {
    recorder.stop();
  }, (1000 / core.fps) * length);
}
