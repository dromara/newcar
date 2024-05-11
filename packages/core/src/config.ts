export interface Config {
  /**
   * The Time Unit.
   */
  unit: 'frame' | 's' | 'ms'
}

/**
 * Define a config.
 * @returns The config instance.
 */
export const defineConfig = (config: Config) => config
