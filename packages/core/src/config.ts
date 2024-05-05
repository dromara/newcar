export interface Config {
  unit: 'frame' | 'second'
  fps: number
}

export const defineConfig = (config: Config) => config
