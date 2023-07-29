import * as newcar from "../../../packages/newcar/dist/newcar.js"
const { Car } = newcar;
const { CoordinateSystem, MathImage, Text } = newcar.object;
const { AxisLength, Limit, Scale, Translation, Transparency } = newcar.animation;
const { easeOutSine } = newcar.interpolator;

const animation = new Car(document.getElementById("canvas"), 60);

const func1 = new MathImage((x) => 100 * Math.sin(0.1 * x), 0, 0, {
  color: "#FFFFFF",
  lineWidth: 3,
});
const func2 = new MathImage((x) => 100 * Math.cos(0.1 * x), 0, 0, {
  color: "skyblue",
  lineWidth: 3,
});
const system = new CoordinateSystem(0, 0, 0, 0, {
  x: 100,
  y: 300,
  children: [func1, func2],
});
const text = new Text("100·sin(0.1x) 100·cos(0.1x)", {
  size: 30,
  align: "center",
  x: 400,
  y: 300,
  transparency: 0,
});

animation.addObject(system).addObject(text);

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
  )
  .addAnimationItem(
    new Scale({
      startAt: 450,
      lastsFor: 50,
      by: easeOutSine,
      to: [0.5, 0.5],
      bindTo: system,
    })
  )
  .addAnimationItem(
    new Translation({
      startAt: 450,
      lastsFor: 50,
      to: [400, 150],
      bindTo: system,
    })
  )
  .addAnimationItem(
    new Transparency({
      startAt: 500,
      lastsFor: 30,
      to: 1,
      bindTo: text,
    })
  );

animation.play();

animation.exports(1, 850, (url) => {
  const element = document.getElementById("video");
  element.innerHTML = "Click here to jump to video file";
  element.href = url;
  console.log(url);
});
