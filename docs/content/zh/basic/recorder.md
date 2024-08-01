---
title: Recorder(录像机)
---

# Recorder

到目前为止，经过前面的课程，我相信你已经掌握了Newcar的基本用法。目前，如果你想向朋友展示你制作的动画或将其上传到社交媒体上，屏幕录制是一个选择。但是，我们建议使用 `Recorder(录像机)` 来记录您的动画并以 `mp4` 或`webm`格式导出。

```javascript
// First, create a Recorder, specifying the Canvas Element type
const recorder = new Recorder(document.querySelector('#canvas'), 'mp4')

// Start recording
recorder.start(2000, (url) => {
  // After 2000ms, output the video's URL address
  console.log(url)
})
```

现在，您可以访问这个URL并下载视频。
