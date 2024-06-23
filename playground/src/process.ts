import * as nc from 'newcar'

export async function init(skia: string, element: HTMLCanvasElement) {
  return (await new nc.CarEngine().init(skia)).createApp(element)
}

export async function process(input: string, app: nc.App) {
  const jsBlob = new Blob([input], { type: 'application/javascript' })
  const url = window.URL.createObjectURL(jsBlob)

  const main = (await import(url)).default

  main(nc, app)

  app.play()
}
