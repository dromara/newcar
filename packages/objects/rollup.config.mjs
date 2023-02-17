import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";

/**
 * @type {import('@rollup/plugin-babel').RollupBabelInputPluginOptions}
 */
const babelConfig = {
  babelHelpers: "bundled",
  extensions: [".js", ".ts"],
  presets: ["@babel/preset-typescript"],
};

const commonPlugins = [nodeResolve({ browser: true }), commonjs(), babel(babelConfig)];

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: "./src/index.ts",
    output: {
      format: "esm",
      sourcemap: true,
      file: "./dist/newcar-objects.mjs",
    },
    plugins: [typescript(), ...commonPlugins],
    treeshake: true,
  },
  {
    input: "./src/index.ts",
    output: {
      format: "iife",
      sourcemap: true,
      name: "newcar",
      file: "./dist/newcar-objects.min.js",
    },
    plugins: [typescript(), ...commonPlugins, terser({ ecma: 2015 })],
    treeshake: true,
  },
  {
    input: "./src/index.ts",
    output: {
      format: "iife",
      sourcemap: true,
      file: "./dist/newcar-objects.js",
      name: "newcar",
    },
    plugins: [typescript({ outputToFilesystem: false, outDir: "./dist/es" }), ...commonPlugins],
  },
  {
    input: "./dist/src/index.d.ts",
    output: {
      file: "./dist/newcar-objects.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
