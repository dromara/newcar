import {
  createCar,
  config,
  Scene,
  Arc,
  move,
  Recorder,
  sleep,
  create,
} from "newcar";

// 设置CanvasKit-WASM文件
config.canvaskitWasmFile = "../node_modules/canvaskit-wasm/bin/canvaskit.wasm";
// 根据刚才定义的canvas标签初始化newcar
const car = createCar("#canvas");

car.scene = new Scene() // 初始化场景
  .add(
    new Arc(100, {
      x: 100, // 设置x坐标
      y: 100, // 设置y坐标
    }) // 加入一个半径为100的圆
      .animate(create, 30) // “创建物体”动画
      .setup(async (obj) => {
        // 传入一个异步函数，第一个参数为此对象本身
        await sleep(100); // 等待100帧
        obj.animate(move, 30, {
          // 加入动画
          to: 300,
        });
      }),
  );
car.on("ready-to-play", () => {
  // 当CanvasKit-WASM准备充足时，播放动画
  car.play();
});

const recorder = new Recorder(car);
recorder.record(600, (url) => {
  console.log(url);
});
