import { babel } from "@rollup/plugin-babel";
// import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

/**
 * @type {import('@rollup/plugin-babel').RollupBabelInputPluginOptions}
 */
const babelConfig = {
  babelHelpers: "bundled",
  extensions: [".js", ".ts"],
  presets: ["@babel/preset-typescript"],
};

const plugins = [
  typescript(),
  nodeResolve({ browser: true }),
  babel(babelConfig),
];
const d = [dts(), nodeResolve({ browser: true })];

const files = [
  ["utils", "index", "newcar-utils"],
  ["basic", "index", "newcar-basic"],
  ["core", "index", "newcar-core"],
  ["recorder", "index", "newcar-recorder"],
  ["newcar", "index", "newcar"],
  ["mod-markdown", "markdown", "newcar-mod-markdown"],
];

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  ...files.map((file) => ({
    input: `./packages/${file[0]}/src/${file[1]}.ts`,
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: `./packages/${file[0]}/dist/${file[2]}.mjs`,
      },
      {
        format: "cjs",
        sourcemap: true,
        file: `./packages/${file[0]}/dist/${file[2]}.cjs`,
        name: "newcar",
      },
    ],
    plugins,
    treeshake: true,
  })),
  ...files.map((file) => ({
    input: `./packages/${file[0]}/dist/packages/${file[0]}/src/${file[1]}.d.ts`,
    output: [
      {
        file: `./packages/${file[0]}/dist/${file[2]}.d.ts`,
        format: "es",
      },
    ],
    plugins: d,
  })),
];
