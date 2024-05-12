/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/// <reference types="@newcar/mod-web-components/global" />

const engine = await newcar.whenReady()

console.log(engine, newcar.getCanvasByName('foo'))

export {}

