import * as newcar from "../../packages/newcar/dist/newcar.js";
const { Car, AudioItem } = newcar;
const { Circle, Text, CoordinateSystem, Rectangle, Image, MathImage, HTMLPlugin, Point } = newcar.object;
const { Translation, AxisLength, Limit } = newcar.animation;
const { easeOutSine } = newcar.interpolator;

const animation = new Car(document.getElementById("test-canvas"), 60);

const func1 = new MathImage((x) => 100 * Math.sin(0.1 * x), 0, 0, {
  color: "#FFFFFF",
});
const func2 = new MathImage((x) => 100 * Math.cos(0.1 * x), 0, 0, {
  color: "skyblue",
});
const system = new CoordinateSystem(0, 0, 0, 0, {
  x: 100,
  y: 300,
  children: [func1, func2],
});
const html = new HTMLPlugin("<strong style='color: white'>Hello world!</strong>", {
  x: 100,
  y: 100,
});
const pointA = new Point({
  x: 100,
  y: 100,
})

animation.addObject(system).addObject(html).addObject(pointA);

animation
  .addAnimationItem(
    new AxisLength({
      startAt: 0,
      lastsFor: 50,
      to: [600, 200, 0, 0],
      bindTo: system,
      by: easeOutSine,
    })
  )
  .addAnimationItem(
    new Limit({
      startAt: 50,
      lastsFor: 800,
      to: [0, 500],
      bindTo: func1,
    })
  )
  .addAnimationItem(
    new Limit({
      startAt: 50,
      lastsFor: 800,
      to: [0, 500],
      bindTo: func2,
    })
  );

animation.onUpdate((currentFrame) => {
  if (currentFrame === 20) {
    html.content = "<h1 style='color: white'>Hello</h1>"
  }
});

const BGM = new AudioItem(
  "./11582.mp3",
  30
)
animation.addAudioItem(BGM);
document.getElementById("button").onclick = () => {
  animation.allowAudio();
}

animation.play();

// animation.exports(1, 850, (url) => {
//   const element = document.getElementById("video");
//   element.innerHTML = "Click here to jump to video file";
//   element.href = url;
// });
