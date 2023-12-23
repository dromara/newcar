export interface Config {
  timing: "frame" | "second";
}

export const defineConfig = (config: Config): Config => config;

export const config = defineConfig({
  timing: "frame",
});
