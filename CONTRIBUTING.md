# Contribution Guide

If you want to contribute to Newcar Team, there are some tips for you.

## Compiling and Run

We use pnpm as the packages manager and monorepo to namage our repo.

Before you get started, you are supposed to install pnpm if your computer have not it:

```shell
$ npm install -g pnpm
```

Forking the repo and link to it, you can use command as followings:

```shell
$ pnpm install
$ pnpm dev
$ pnpm serve
$ pnpm build
```

Congratulations! If everything is okay, you can visit [localhost:5173](localhost:5173) with your browser and see this examples.

## File Structure

Open the repo, you will see the structure like followings:

```
mods
  | mod-math
  | mod-geometry
  | mod-chart
  | ...
packages
  | core
  | basic
  | ...
plugins
  | ...
...
```
- mods: The offical mods of Newcar
- packages: the core and other packages that core is dependent on or be dependented
  - basic: There are many basic figures in there, please refer to [newcar.js.org](https://newcar.js.org) to see them
- plugins: The offcial plugins of Newcar

And you can custom some widget for our offical lib, the guide is in out [documentation](https://newcar.js.org).

We hope you can get a great sense when you contribute to us.

Thanks for reading!
