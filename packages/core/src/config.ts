export interface Config {
  /**
   * Frames Per Second
   * Can be `Number.POSITIVE_INFINITY`, which means 'not limited'
   */
  fps: number
}

/**
 * Define a config.
 * @returns The config instance.
 */
export const defineConfig = (config: Config) => config

export const DEFAULT_SCENE_CONFIG: Config = defineConfig({
  fps: 120,
})
