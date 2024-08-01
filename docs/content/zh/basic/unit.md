---
title: 单元系统
---

# 单元系统

Newcar 提供了三种时间单位: `frame`, `s`, 和 `ms`. 默认的单位是秒, 受到应用程序限制, 只有[Recorder(录像机)](./recorder) 使用的是毫秒.

## 设置单位系统

```ts
app.config.unit = 'frame'
app.config.unit ='s'
app.config.unit ='ms'
```
