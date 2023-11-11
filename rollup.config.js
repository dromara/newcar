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

const plugins = [typescript(), nodeResolve({ browser: true }), babel(babelConfig)];
const d = dts();

const files = [
  ["./packages/newcar", "src/index.ts", "newcar"],
  ["./packages/basic", "src/objects/index.ts", "newcar-basic-objects"],
  ["./packages/basic", "src/animations/index.ts", "newcar-basic-objects"],
];

/**
 * @type {import('rollup').RollupOptions}
 */
export default files.map((file) => ({
  input: `${file[0]}/${file[1]}`,
  output: [
    {
      format: "esm",
      sourcemap: true,
      file: `./packages/newcar/dist/${file[2]}.mjs`,
    },
    {
      format: "cjs",
      sourcemap: true,
      file: `./packages/newcar/dist/${file[2]}.cjs`,
      name: "newcar",
    },
  ],
  plugins,
  treeshake: true,
}));
// {
//   input: "./packages/newcar/src/index.ts",
//   output: [
//     {
//       format: "esm",
//       sourcemap: true,
//       file: "./packages/newcar/dist/newcar.mjs",
//     },
//     {
//       format: "cjs",
//       sourcemap: true,
//       file: "./packages/newcar/dist/newcar.cjs",
//       name: "newcar",
//     },
//     // {
//     //   file: "./packages/newcar/dist/newcar.d.ts",
//     //   format: "es",
//     // },
//   ],
//   plugins,
//   treeshake: true,
// },
// {
//   input: "",
//   output: [
//     {
//       format: "esm",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-objects.mjs",
//     },
//     {
//       format: "cjs",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-objects.cjs",
//       name: "objects",
//     },
//   ],
//   plugins,
//   treeshake: true,
// },
// {
//   input: "./packages/basic/src/animations/index.ts",
//   output: [
//     {
//       format: "esm",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-animations.mjs",
//     },
//     {
//       format: "cjs",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-animations.cjs",
//       name: "animations",
//     },
//   ],
//   plugins,
//   treeshake: true,
// },
// {
//   input: "./packages/basic/src/interpolations/index.ts",
//   output: [
//     {
//       format: "esm",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-interpolations.mjs",
//     },
//     {
//       format: "cjs",
//       sourcemap: true,
//       file: "./packages/basic/dist/newcar-basic-interpolations.cjs",
//       name: "interpolations",
//     },
//   ],
//   plugins,
//   treeshake: true,
// },
