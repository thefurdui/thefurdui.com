document.addEventListener('DOMContentLoaded', () => {
  const starfieldCanvasElement = document.createElement('canvas')
  starfieldCanvasElement.id = 'starfield-canvas'
  document.body.appendChild(starfieldCanvasElement)

  const starfieldCanvas = new StarFieldCanvas.StarField('starfield-canvas', {
    followContext: window,
    // followMouse: true,
    color: { r: 255, g: 255, b: 255 },
    glow: true,
    minV: 0.3,
    maxV: 0.5,
    numStars: 150,
    trails: false
  })
  starfieldCanvas.start()
})
