---
title: 单位制
---

# 单位制

Newcar 提供了三种单位制：`帧`、`秒` 和 `毫秒`。默认单位通常是秒，与应用程序绑定，除了 [Recorder](./recorder) 使用毫秒。

## 设置单位制

```ts
app.config.unit = 'frame'
app.config.unit = 's'
app.config.unit = 'ms'
```