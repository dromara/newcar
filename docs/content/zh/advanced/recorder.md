---
title: 录制器
---

# 录制器

现在经过前面的学习，相信你已经掌握了 Newcar 的基本使用方法。现在，你需要将你做好的动画给朋友看或者是上传到社交平台，录制屏幕是一种方式。但是我们推荐使用 `Recorder` 来录制动画并导出为 `mp4` 或 `webm` 格式。

```javascript
// 先创建一个 Recorder, 并指明 Canvas Element 类型
const recorder = new Recorder(document.querySelector('#canvas'), 'mp4')

// 开始录制
recorder.start(2000, (url) => {
  // 2000ms 后输出视频的 url 地址
  console.log(url)
})
```

现在，你可以访问这个地址，并下载这个视频。
