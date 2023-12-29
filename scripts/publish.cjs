const packages = [
  "newcar",
  "core",
  "basic",
  "recorder",
  "utils",
  "mod-markdown",
];

const exec = require("node:child_process").exec;

exec("cd packages");
packages.forEach((pack) => {
  exec(`cd ${pack}`);
  exec("pnpm publish", (_err, stdout, stderr) => {
    console.log(stdout, stderr);
  });
  exec("cd ..")
})
