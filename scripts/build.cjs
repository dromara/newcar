/* eslint-disable unicorn/no-array-for-each */
const rimraf = require("rimraf");
const child_process = require("node:child_process");

const exec = child_process.exec;

const package_dists = [
  "./packages/basic/dist",
  "./packages/core/dist",
  "./packages/newcar/dist",
  "./packages/utils/dist"
];

package_dists.forEach((dist) => {
  rimraf(dist, (_err) => {});
});

try {
  exec("rollup -c", (_err, stdout, stderr) => {
    console.log(stdout, stderr);
  });
} catch {}
