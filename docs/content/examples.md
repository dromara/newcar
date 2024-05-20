:::tip tips: Click canvas to play the animation.

<Demo1/>

```typescript
import { CarEngine, Circle, Widget, create, createScene, easeBounce, easeInCirc, move } from 'newcar'

const engine = await new CarEngine().init(
  'https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm'
)
app = engine.createApp(document.querySelector('#canvas')!)
const root = new Widget().add(
  new Circle(100, {
    x: 800,
    y: 450
  })
    .animate(create, 0, 30, {
      by: easeInCirc
    })
    .animate(move, 70, 100, {
      from: [800, 450],
      to: [800, 850],
      by: easeBounce
    })
)
const scene = createScene(root)
app.checkout(scene)
app.config.unit = 'frame'
app.play()
```

:::

::: details Playground
<iframe src="https://playground.newcarjs.org/?codes=const%20root%20=%20new%20nc.Widget().add(%0A%20%20new%20nc.Circle(100,%20%7B%0A%20%20%20%20x:%20800,%0A%20%20%20%20y:%20450,%0A%20%20%7D)%0A%20%20.animate(nc.create,%200,%2030,%20%7B%0A%20%20%20%20by:%20nc.easeInCirc,%0A%20%20%7D)%0A%20%20.animate(nc.move,%2070,%20100,%20%7B%0A%20%20%20%20from:%20%5B800,%20450%5D,%0A%20%20%20%20to:%20%5B800,%20850%5D,%0A%20%20%20%20by:%20nc.easeBounce,%0A%20%20%20%7D),%0A%20%20)%0Aconst%20scene%20=%20new%20nc.Scene(root)%0Aapp.checkout(scene)" class="w-full h-120" />
:::

---

:::tip tips: Click canvas to play the animation.

<Demo2/>

```typescript
import { CarEngine, Path, createScene, easeInCirc, stroke } from 'newcar'

const engine = await new CarEngine().init(
  'https://unpkg.com/canvaskit-wasm@latest/bin/canvaskit.wasm'
)
app = engine.createApp(document.querySelector('#canvas')!)
const root = new Path({
  style: {
    fill: false,
    border: true,
    scaleX: 5,
    scaleY: 5
  },
  x: 550,
  y: 200
}).animate(stroke, 0, 100, {
  by: easeInCirc
})
root.addPathFromSVGString(`
  M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z
  `)
const scene = createScene(root)
app.checkout(scene)
app.config.unit = 'frame'
app.play()
```

:::

<!-- ::: details Playground
<iframe class="w-full h-120" src="https://playground.newcarjs.org/?codes=const%20root%20=%20new%20nc.Path(%7B%0A%20%20style:%20%7B%0A%20%20%20%20fill:%20false,%0A%20%20%20%20border:%20true,%0A%20%20%20%20scaleX:%205,%0A%20%20%20%20scaleY:%205,%0A%20%20%7D,%0A%20%20x:%20550,%0A%20%20y:%20200,%0A%7D)%0A.animate(nc.stroke,%200,%20100,%20%7B%0A%20%20by:%20nc.easeInCirc,%0A%7D)%0Aroot.addPathFromSVGString(%60%0A%20%20M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z%0A%60)%0Aconst%20scene%20=%20new%20nc.Scene(root)%0Aapp.checkout(scene)%0A" />
:::

---

::: details Playground
<iframe class="w-full h-120" src="https://playground.newcarjs.org/?codes=const%20root%20=%20new%20nc.Widget()%0A%20%20.add(new%20nc.Line(%5B200,%20200%5D,%20%5B1400,%20700%5D,%20%7B%0A%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20width:%205%0A%20%20%20%20%7D,%0A%20%20%20%20centerX:%20200,%0A%20%20%20%20centerY:%20200%0A%20%20%7D)%0A%20%20%20%20.add(%0A%20%20%20%20%20%20new%20nc.Circle(8,%20%7B%0A%20%20%20%20%20%20%20%20x:%20200,%0A%20%20%20%20%20%20%20%20y:%20200,%0A%20%20%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20%20%20fillColor:%20nc.Color.parse('skyblue')%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D).animate(nc.move,%200,%2030,%20%7B%0A%20%20%20%20%20%20%20%20to:%20%5B200,%20700%5D%0A%20%20%20%20%20%20%7D).animate(nc.move,%20105,%2045,%20%7B%0A%20%20%20%20%20%20%20%20to:%20%5B800,%20450%5D%0A%20%20%20%20%20%20%7D)%0A%20%20%20%20)%0A%20%20%20%20.add(%0A%20%20%20%20%20%20new%20nc.Circle(8,%20%7B%0A%20%20%20%20%20%20%20%20x:%201400,%0A%20%20%20%20%20%20%20%20y:%20700,%0A%20%20%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20%20%20fillColor:%20nc.Color.parse('skyblue')%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D).animate(nc.move,%2030,%2030,%20%7B%0A%20%20%20%20%20%20%20%20to:%20%5B1400,%20200%5D%0A%20%20%20%20%20%20%7D).animate(nc.move,%2060,%2045,%20%7B%0A%20%20%20%20%20%20%20%20to:%20%5B800,%20450%5D%0A%20%20%20%20%20%20%7D)%0A%20%20%20%20)%0A%20%20%20%20.animate(nc.rotate,%20150,%2050,%20%7B%0A%20%20%20%20%20%20to:%20-23%0A%20%20%20%20%7D)%0A%20%20)%0Aconst%20scene%20=%20new%20nc.Scene(root)%0Aapp.checkout(scene)%0Areturn%20app%0A"></iframe>

:::


::: details Playground

<iframe class="w-full h-120" src="https://playground.newcarjs.org/?codes=nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf').then(font%20=%3E%20%7B%0A%20%20const%20root%20=%20new%20nc.Text(%5B%7B%0A%20%20%20%20text:%20%22Hello%5Cn%22,%0A%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20fontSize:%20100%0A%20%20%20%20%7D%0A%20%20%7D,%20%22Let%20explore%20Newcar!%22%5D,%20%7B%0A%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20width:%201600,%0A%20%20%20%20%20%20textAlign:%20'center',%0A%20%20%20%20%20%20fill:%20false,%0A%20%20%20%20%20%20border:%20true%0A%20%20%20%20%7D,%0A%20%20%20%20y:%20400%0A%20%20%7D).animate(nc.stroke,%200,%2090,%20%7B%0A%20%20%20%20origin:%20100%0A%20%20%7D)%0A%20%20const%20scene%20=%20new%20nc.Scene(root)%0A%20%20app.checkout(scene)%0A%7D)%0Areturn%20app%0A"></iframe>

:::

::: details Playground

<iframe class="w-full h-120" src="https://playground.newcarjs.org/?codes=nc.useFont('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf').then(font%20=%3E%20%7B%0A%20%20const%20root%20=%20new%20nc.Widget()%0A%20%20%20%20.add(new%20nc.Text(%5B%7B%0A%20%20%20%20%20%20text:%20%22Hello%5Cn%22,%0A%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20fontSize:%20100%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D,%20%22Let%20explore%20Newcar!%22%5D,%20%7B%0A%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20width:%201600,%0A%20%20%20%20%20%20%20%20textAlign:%20'center',%0A%20%20%20%20%20%20%20%20fill:%20false,%0A%20%20%20%20%20%20%20%20border:%20true%0A%20%20%20%20%20%20%7D,%0A%20%20%20%20%20%20y:%20400%0A%20%20%20%20%7D).animate(nc.stroke,%200,%2090,%20%7B%0A%20%20%20%20%20%20origin:%20100%0A%20%20%20%20%7D).animate(nc.move,%2090,%2090,%20%7B%0A%20%20%20%20%20%20to:%20%5B0,%20100%5D,%0A%20%20%20%20%20%20by:%20nc.easeExpo%0A%20%20%20%20%7D))%0A%20%20%20%20.add(new%20nc.Arc(100,%200,%200,%20%7B%0A%20%20%20%20%20%20x:%20800,%0A%20%20%20%20%20%20y:%20500,%0A%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20blendMode:%20'dstATop'%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D).animate(nc.changeProperty('to',%200,%20360),%20180,%2030)%0A%20%20%20%20)%0A%20%20%20%20.add(new%20nc.Rect(%5B0,%200%5D,%20%5B200,%20200%5D,%20%7B%0A%20%20%20%20%20%20x:%20700,%0A%20%20%20%20%20%20y:%20400,%0A%20%20%20%20%20%20style:%20%7B%0A%20%20%20%20%20%20%20%20shader:%20nc.Shader.createLinearGradientShader(%5B0,%200%5D,%20%5B0,%20200%5D,%20%5Bnc.Color.parse('red'),%20nc.Color.parse('blue')%5D,%20null,%20'repeat'),%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D).hide()%0A%20%20%20%20%20%20.animate(nc.create,%20220,%2030,%20%7B%0A%20%20%20%20%20%20%20%20by:%20nc.easeExpo%0A%20%20%20%20%20%20%7D)%0A%20%20%20%20%20%20.setUpdate((e,%20w)%20=%3E%20%7B%0A%20%20%20%20%20%20%20%20if%20(e%20===%20220)%20%7B%0A%20%20%20%20%20%20%20%20%20%20w.show()%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D)%0A%20%20%20%20)%0A%20%20const%20scene%20=%20new%20nc.Scene(root)%0A%20%20app.checkout(scene)%0A%7D)%0Areturn%20app%0A"></iframe> -->

<!-- :::tip tips: Click canvas to play the animation.

<Demo3/>

```typescript
```

::: -->
