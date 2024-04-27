export class Recorder {
  private stream
  private recorder: MediaRecorder

  constructor(public element: HTMLCanvasElement, public type: 'webm' | 'mp4') {
    this.stream = this.element.captureStream()
    this.recorder = new MediaRecorder(this.stream, {
      mimeType: 'video/webm',
    })
  }

  start(during: number, onstop: (url: string) => any): void {
    const data: Blob[] = []
    this.recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) data.push(event.data)
    }
    this.recorder.onstop = () => {
      const url = URL.createObjectURL(
        new Blob(data, {
          type: this.type === 'webm' ? 'video/webm' : 'video/mp4',
        }),
      )
      onstop(url)
    }
    this.recorder.start()

    window.setTimeout(() => {
      this.recorder.stop()
    }, during)
  }
}
