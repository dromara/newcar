export interface Config {
  timing: "frame" | "second";
  canvaskitWasmFile: string | null;
}

export const defineConfig = (config: Config): Config => config;

export const config = defineConfig({
  timing: "frame",
  canvaskitWasmFile: null,
});
