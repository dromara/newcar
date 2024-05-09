<template>
  <iframe src="https://playground.newcarjs.org/?codes=const%20root%20=%20new%20nc.Widget().add(%0A%20%20new%20nc.Circle(100,%20%7B%0A%20%20%20%20x:%20800,%0A%20%20%20%20y:%20450,%0A%20%20%7D)%0A%20%20.animate(nc.create,%200,%2030,%20%7B%0A%20%20%20%20by:%20nc.easeInCirc,%0A%20%20%7D)%0A%20%20.animate(nc.move,%2070,%20100,%20%7B%0A%20%20%20%20from:%20%5B800,%20450%5D,%0A%20%20%20%20to:%20%5B800,%20850%5D,%0A%20%20%20%20by:%20nc.easeBounce,%0A%20%20%20%7D),%0A%20%20)%0Aconst%20scene%20=%20new%20nc.Scene(root)%0Aapp.checkout(scene)" class="w-full h-120" />
</template>
