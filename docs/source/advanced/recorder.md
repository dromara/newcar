---
title: Recorder
---

# Recorder

By now, after the previous lessons, I believe you have mastered the basic usage of Newcar. Currently, if you want to show your friends the animation you've created or upload it to social media, screen recording is one option. However, we recommend using the `Recorder` to record your animation and export it in `mp4` or `webm` format.

```javascript
// First, create a Recorder, specifying the Canvas Element type
const recorder = new Recorder(document.querySelector("#canvas"), "mp4");

// Start recording
recorder.start(2000, (url) => {
  // After 2000ms, output the video's URL address
  console.log(url);
});
```

Now, you can access this URL and download the video.
