# NewCar Animation Engine Contribution Guide
This is the contribution guide of Newcar. If you want to make a contribution, **please read this guide first!**

# Packages

The project uses `monorepo`. All the packages are in the directory `/packages` (all paths appeared in this documentation are relative to the project's root directory).

Here are the packages and their information:

| Package Name | Introduction | index |
| --- | --- | --- |
| newcar | The user API | `/packages/newcar` |
| @newcar/core | The core of Newcar. | `/packages/core` |
| @newcar/objects | The objects of animation. | `/packages/objects` |
| @newcar/animation-builder | The builder of animation key frame | `/packages/animation-builder` |
| @newcar/sound-builder | The builder of sounds and audios | `/packages/sound-builder` |
| @newcar/event-builder | The event arrived scripts | `/packages/event-builder` |
| @newcar/utils | The tools of creating newcar animation | `/packages/utils` |
# Development

The following tools are necessary in order to build this repository:
* `pnpm`
* `rollup`
* `eslint`

The test file `main.js` is in the `/test`.

## Building
To build the whole project, use the following command: 
```shell
$ npm run build:all
$ # or
$ pnpm run -r build
```
The distributable files will appear in the directory `/packages/newcar/dist`, as many other open-source projects do.

## Testing

Use a static server to run the `/newcar/index.html`.

## Releasing

To make a new version, please add a pull request to the branch `main`.