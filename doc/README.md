Hi, there!

There was the code document of Newcar, if you want to make a contribution, **please read this document before you start to code!**

# Packages

The project use the monorepo, all the packages is in `./packages`.

| Package Name | Introduction | index | Document |
| --- | --- | --- | --- |
| @newcar/core | The core of Newcar, include the class `Car` for user. | `packages/core` | [Click here](./core/README.md) |
| @newcar/objects | The objects of animation. | `packages/objects` | [Click here]() |
| @newcar/animation-builder | The builder of animation key frame | `packages/animation-builder` | [Click here]() |

# Development

About development, we use this tools:
* pnpm
* rollup
* eslint

The test file `index.html` is in `packages/core`.

## build
We set up some command in npm, if you want to build all part of project, you can use:
```shell
$ npm run build:all
$ # or
$ pnpm run -r build
```
The file will be output in `packages/core/dist`.

## run
There I use the live-server, but if you use other local servers, it's all okay.

You just need

```shell
$ npm install live-server -g
```

And

```shell
$ live-server
```

Youe web browser will appear.

## relaese

If you want to make a new version, please commit and merge to the branch main before run the command:

```shell
$ pnpm release
```

and then, it will give your some item to choice.
