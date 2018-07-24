const fs = require('fs')
const cheerio = require('cheerio')

const scriptjsFun = () => {
  const app = document.getElementById('app')
  const canvas = document.createElement('canvas')
  canvas.width = 500
  canvas.height = 500
  app.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  function drawCube() {
    const x = canvas.width / 2
    const wobble = (Math.sin(Date.now() / 250) * canvas.height) / 50
    const y = (canvas.height / 2) + wobble + (100 / 2)
    const wx = 100
    const wy = 100
    const h = 100
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - wx, y - (wx * 0.5))
    ctx.lineTo(x - wx, y - h - (wx * 0.5))
    ctx.lineTo(x, y - (h * 1))
    ctx.closePath()
    ctx.fillStyle = 'rgba(10,20,30,.5)'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + wy, y - (wy * 0.5))
    ctx.lineTo(x + wy, y - h - (wy * 0.5))
    ctx.lineTo(x, y - (h * 1))
    ctx.closePath()
    ctx.fillStyle = 'rgba(100,20,30,.5)'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x, y - h)
    ctx.lineTo(x - wx, y - h - (wx * 0.5))
    ctx.lineTo((x - wx) + wy, y - h - ((wx * 0.5) + (wy * 0.5)))
    ctx.lineTo(x + wy, y - h - (wy * 0.5))
    ctx.closePath()
    ctx.fillStyle = '#555'
    ctx.fill()
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCube()
  }
  requestAnimationFrame(draw)
}

const canvasCube = async datas => new Promise((resolve) => {
  fs.readFile('./nodejs/Request/3345/cube/index.html', 'utf-8', (err, data) => {
    if (err) console.log(err)
    const $ = cheerio.load(data)
    $('body').append(`<script>const startinit = ${scriptjsFun};startinit()</script>`)
    resolve($.html())
  })
})

module.exports = {
  canvasCube,
}
