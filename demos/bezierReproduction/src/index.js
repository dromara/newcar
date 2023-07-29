import * as newcar from "../../../packages/newcar/dist/newcar.js";
const { Car } = newcar;
const { Point, Line, Pen } = newcar.object;
const { Translation } = newcar.animation;

const animation = new Car(document.getElementById("canvas"), 60);

const pointA = new Point({
  x: 200,
  y: 300,
});
const pointB = new Point({
  x: 400,
  y: 100,
});
const pointC = new Point({
  x: 600,
  y: 300,
});
const pointM = new Point({
  x: 200,
  y: 300,
});
const pointN = new Point({
  x: 400,
  y: 100,
});
const lineAB = new Line(pointA, pointB, {});
const lineBC = new Line(pointB, pointC, {});
const lineMN = new Line(pointM, pointN, {});
const pointQ = new Point({})
const pen = new Pen({});

animation
  .addObject(pointA)
  .addObject(pointB)
  .addObject(pointC)
  .addObject(pointM)
  .addObject(pointN)
  .addObject(lineAB)
  .addObject(lineBC)
  .addObject(lineMN)
  .addObject(pointQ)
  .addObject(pen);

animation.onUpdate((currentFrame) => {
  pen.x = pointQ.x;
  pen.y = pointQ.y;
  if (currentFrame === 1) {
    pen.put();
  }
})

animation
  .addAnimationItem(
    new Translation({
      startAt: 0,
      lastsFor: 400,
      to: [400, 100],
      bindTo: pointM,
    })
  )
  .addAnimationItem(
    new Translation({
      startAt: 0,
      lastsFor: 400,
      to: [600, 300],
      bindTo: pointN,
    })
  );

animation.play();
