import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('@rollup/plugin-babel').RollupBabelInputPluginOptions}
 */
const babelConfig = {
  babelHelpers: "bundled",
  extensions: [".js", ".ts"],
  presets: ["@babel/preset-typescript"],
};

const commonPlugins = [
  nodeResolve({ browser: true }),
  commonjs(),
  babel(babelConfig),
];

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: "./src/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: "./dist/newcar.js",
      },
      // {
      //   file: "./packages/newcar/dist/newcar.d.ts",
      //   format: "es",
      // },
    ],
    plugins: [typescript(), ...commonPlugins /* , dts() */],
    treeshake: true,
  },
];
