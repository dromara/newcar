import type { IRendererController } from "@newcar/objects/src/interfaces/RenderController";
import type { IRenderable } from "@newcar/objects/src/interfaces/Renderable";

export const exportAnimationToVideo = (
  core: IRenderable & IRendererController,
  startAt: number,
  lastAt: number,
  onFinish: (arg0: string) => void
) => {
  try {
    const recorder = createRecorder(core.element, {
      minmeType: "video/webm"
    });
    setRecorder(recorder, onFinish);
    record(recorder, core, startAt, lastAt);
  } catch {}
};

const createRecorder = (element: HTMLCanvasElement, datas: Record<string, unknown>) => {
  const stream = element.captureStream();
  const recorder = new MediaRecorder(stream, datas);
  return recorder;
}

const setRecorder = (recorder: MediaRecorder, onFinish: (arg0: string) => void) => {
  const datas: Blob[] = [];
  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size) {
      datas.push(event.data);
    }
  };
  recorder.onstop = () => {
    const url = URL.createObjectURL(new Blob(datas, {
      type: "video/webm"
    }));
    onFinish(url);
  };
}

const record = (recorder: MediaRecorder, core: IRenderable & IRendererController, startAt: number, lastAt: number) => {
  const length = lastAt - startAt;
  recorder.start()
  core.continue(startAt);
  setTimeout(() => {
    recorder.stop();
  }, 1000 / core.fps * length);
}
