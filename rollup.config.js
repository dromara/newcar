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
    input: "./packages/newcar/src/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: "./packages/newcar/dist/newcar.mjs",
      },
      {
        format: "cjs",
        sourcemap: true,
        file: "./packages/newcar/dist/newcar.cjs",
        name: "newcar",
      },
      // {
      //   file: "./packages/newcar/dist/newcar.d.ts",
      //   format: "es",
      // },
    ],
    plugins: [typescript(), ...commonPlugins /* , dts() */],
    treeshake: true,
  },
  {
    input: "./packages/basic/src/objects/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: "./packages/basic/dist/newcar-basic-objects.mjs",
      },
      {
        format: "cjs",
        sourcemap: true,
        file: "./packages/basic/dist/newcar-basic-objects.cjs",
        name: "objects",
      },
    ],
    plugins: [typescript(), ...commonPlugins /* , dts() */],
    treeshake: true,
  },
  {
    input: "./packages/basic/src/animations/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: "./packages/basic/dist/newcar-basic-animations.mjs",
      },
      {
        format: "cjs",
        sourcemap: true,
        file: "./packages/basic/dist/newcar-basic-animations.cjs",
        name: "animations",
      },
    ],
    plugins: [typescript(), ...commonPlugins /* , dts() */],
    treeshake: true,
  },
];
