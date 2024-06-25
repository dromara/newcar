export interface AudioOptions {
  path: string
}

export interface Audio {
  path: string
}

export function defineAudio(options: AudioOptions): Audio {
  return {
    path: options.path,
  }
}
