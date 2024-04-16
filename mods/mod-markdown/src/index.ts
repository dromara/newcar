export default {
  tree() {
    return createWidget({
      x: 100,
      y: 100
    }).add(
      createCircle(100)
    )
  }
}