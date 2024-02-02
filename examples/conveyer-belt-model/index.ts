import * as $ from "newcar";

const s = $.sleep;

const g = 10;
const v = 150;
const mu = 0.5;
const l = 300;
const x = (t: number) => {
  // 计算加速度
  var a = mu * g;

  // 计算加速阶段结束时的时间
  var t_a = v / a;

  // 计算加速阶段结束时的位移
  var x_t_a = (1 / 2) * a * t_a * t_a;

  if (x_t_a >= l) {
    // 如果加速阶段结束时的位移已经超过传送带长度，则小方块在加速阶段就已经停止
    if (t <= t_a) {
      // 加速阶段
      var x_acceleration = (1 / 2) * a * t * t;
      // 如果在加速阶段就超出了传送带长度，则返回传送带长度
      return Math.min(x_acceleration, l);
    } else {
      // 加速阶段结束后，小方块已经停止运动
      return l;
    }
  } else {
    // 如果加速阶段结束时的位移没有超过传送带长度，则进入恒速阶段
    if (t <= t_a) {
      // 加速阶段
      return (1 / 2) * a * t * t;
    } else {
      // 恒速阶段
      var x_constant = x_t_a + v * (t - t_a);
      // 如果在恒速阶段超出了传送带长度，则返回传送带长度
      return Math.min(x_constant, l);
    }
  }
};

const scene = new $.Scene().add(
  new $.Carobj({
    x: 800,
    y: 450,
  })
    .add(
      new $.Arc(50, {
        x: -150,
      }).setup(async (obj) => {
        console.log();
        obj.y = obj.pa;
      }),
    )
    .add(
      new $.Arc(50, {
        x: 150,
      }),
    )
    .add(
      new $.Arc(2, {
        x: -150,
        fillColor: $.Color.WHITE,
      }),
    )
    .add(
      new $.Arc(2, {
        x: 150,
        fillColor: $.Color.WHITE,
      }),
    )
    .add(new $.Line([-150, 50], [150, 50]))
    .add(new $.Line([-150, -50], [150, -50]))
    .add(new $.Arrow([-50, 75], [50, 75]))
    .add(
      new $.Text("v", {
        y: 85,
      }),
    )
    .add(
      new $.Rectangle(-30, -30, 30, 30, {
        x: -150,
        y: -80,
      })
        .add(
          new $.Arc(2, {
            fillColor: $.Color.WHITE,
          }),
        )
        .add(
          new $.Arrow([0, 0], [0, -150]).add(
            new $.Text("N", {
              y: -180,
            }),
          ),
        )
        .add(
          new $.Arrow([0, 0], [0, 150]).add(
            new $.Text("G = mg", {
              y: 180,
            }),
          ),
        )
        .add(
          new $.Arrow([0, 0], [100, 0]).add(
            new $.Text("f", {
              x: 130,
            }),
          ),
        )
        .animate($.move, 500, {
          toX: 150,
          toY: -80,
          by: x,
        }),
    ),
);

const car = $.newcar("#canvas");
car.scene = scene;
car.play();
