---
title: Unit System
---

# Unit System

Newcar provides three unit systems: `frame`, `s`, and `ms`. The default unit is usually seconds, bound to the app, except for [Recorder](./recorder) which uses milliseconds.

## Setting the Unit System

```ts
app.config.unit = 'frame'
app.config.unit ='s'
app.config.unit ='ms'
```
