export interface Config {
  /**
   * The Time Unit.
   */
  unit: 'frame' | 'second'

  /**
   * The frame per second.
   */
  fps: number
}

/**
 * Define a config.
 * @returns The config instance.
 */
export const defineConfig = (config: Config) => config
