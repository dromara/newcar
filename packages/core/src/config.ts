export interface SceneConfig {
  /**
   * The Time Unit.
   */
  unit: 'frame' | 's' | 'ms'
}

/**
 * Define a config.
 * @returns The config instance.
 */
export const defineSceneConfig = (config: SceneConfig) => config
