# NewCar Animation Engine Contribution Guide
This is the contribution guide of Newcar. If you want to make a contribution, **please read this guide first!**

# Packages

The project uses `monorepo`. All the packages are in the directory `/packages` (all paths appeared in this documentation are relative to the project's root directory).

Here are the packages and their information:

| Package Name | Introduction | index | Document |
| --- | --- | --- | --- |
| @newcar/core | The core of Newcar, include the class `Car` for user. | `/packages/core` | [Click here](./core/README.md) |
| @newcar/objects | The objects of animation. | `/packages/objects` | [Click here]() |
| @newcar/animation-builder | The builder of animation key frame | `/packages/animation-builder` | [Click here]() |

# Development

The following tools are necessary in order to build this repository:
* `pnpm`
* `rollup`
* `eslint`

The test file `index.html` is in the `/packages/core`.

## Building
To build the whole project, use the following command: 
```shell
$ npm run build:all
$ # or
$ pnpm run -r build
```
The distributable files will appear in the directory `/packages/core/dist`, as many other open-source projects do.

## Testing

Use a static server to run the `/packages/core/index.html`.

## Releasing

To make a new version, please add a pull request to the branch `main`.