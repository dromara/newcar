import type { Car } from "@newcar/core/src/car";
import { config } from "@newcar/utils/src";

export class Recorder {
  recorder: MediaRecorder;
  stream: MediaStream;
  constructor(car: Car) {
    this.stream = car.element.captureStream();
    this.recorder = new MediaRecorder(this.stream, { mimeType: "video/webm" });
  }

  record(duration: number, callback: (url: string) => void): void {
    const data: Blob[] = [];
    this.recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        data.push(event.data);
      }
    };
    this.recorder.onstop = () => {
      const url = URL.createObjectURL(new Blob(data, { type: "video/webm" }));
      callback(url);
    };
    this.recorder.start();
    switch (config.timing) {
      case "frame": {
        window.setTimeout(() => {
          this.recorder.stop();
        }, (1000 / 60) * duration);
        break;
      }
      case "second": {
        window.setTimeout(() => {
          this.recorder.stop();
        }, duration * 1000);
      }
    }
  }
}
