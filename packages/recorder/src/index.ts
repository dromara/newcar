import type { Car } from "@newcar/core/src";

export class Recorder {
  recorder: MediaRecorder;
  stream: MediaStream;
  constructor(car: Car) {
    this.stream = car.element.captureStream();
    this.recorder = new MediaRecorder(this.stream, {
      mimeType: "video/webm",
    });
  }

  start(keep: number, callback: (url: string) => void): void {
    const data: Blob[] = [];
    this.recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        data.push(event.data);
      }
    };
    this.recorder.onstop = () => {
      const url = URL.createObjectURL(
        new Blob(data, {
          type: "video/webm",
        }),
      );
      callback(url);
    };
    this.recorder.start();
    window.setTimeout(() => {
      this.recorder.stop();
    }, keep * 1000);
  }
}
