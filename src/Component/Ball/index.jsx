import React from 'react'
import config from './config'

export default class solarComponent extends React.PureComponent {
  constructor(props) {
    super(...props)
    this.canvas = null
    this.ctx = null
    this.canvasWidth = 300
    this.pixelMultiplier = 3
    this.isSuspend = false
    this.config = config
    this.resetConfig = JSON.stringify(config)
  }
  componentDidMount=() => {
    this.init()
  }

  init=() => {
    const canvas = this.canvas
    canvas.width = this.canvasWidth * this.pixelMultiplier
    canvas.height = canvas.width
    this.ctx = canvas.getContext('2d')
    this.canvasEvents()
    this.initDraw()
  }

  initDraw=() => {
    if (this.isSuspend) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawCanvas()
    requestAnimationFrame(this.initDraw)
  }

  canvasEvents=() => {
    this.canvas.onmousemove = this.canvasOnmousemove
  }

  canvasOnmousemove=(e) => {
    const { width, height } = this.config.obstacle
    const x = e.offsetX * this.pixelMultiplier
    const y = e.offsetY * this.pixelMultiplier
    this.config.obstacle.coordinate = [x - (width / 2), y - (height / 2)]
  }

  drawCanvas=() => {
    this.drawStart()
    this.drawBalls()
  }

  drawStart=() => {
    const { width, height, coordinate, color } = this.config.obstacle
    const ctx = this.ctx
    ctx.beginPath()
    ctx.fillRect(coordinate[0], coordinate[1], width, height)
    ctx.fillStyle = color
    ctx.closePath()
  }

  drawBalls=() => {
    const ctx = this.ctx
    this.config.balls.forEach((ball, index) => {
      ctx.beginPath()
      ctx.fillStyle = ball.color
      ctx.arc(ball.coordinate[0] + ball.radius, ball.coordinate[1] + ball.radius, ball.radius, 0, Math.PI * 2)
      ctx.fill()
      this.changeBallCoordinate(index)
    })
  }

  changeBallCoordinate=(index) => {
    this.changeCollision(index)
    const { coordinate, radius, angle } = this.config.balls[index]
    this.config.balls.forEach((ball, ind) => {
      if (ind !== index) {
        const x2 = Math.pow(coordinate[0] - ball.coordinate[0], 2)
        const y2 = Math.pow(coordinate[1] - ball.coordinate[1], 2)
        const z2 = Math.pow(radius + ball.radius, 2)
        if (x2 + y2 <= z2) {
          if ((x2 + y2) > (z2 - 1000)) {
            this.config.balls[index].angle = Math.PI + Math.atan((ball.coordinate[1] - coordinate[1]) / (ball.coordinate[0] - coordinate[0]))
            this.changeCollision(index)
          } else {
            const r = (radius + ball.radius) - Math.sqrt(x2 + y2)
            const lx1 = coordinate[0] + (Math.cos(angle + Math.PI) * r)
            const ly1 = coordinate[1] + (Math.sin(angle + Math.PI) * r)
            this.config.balls[index].coordinate = [lx1.toFixed(6) * 1, ly1.toFixed(6) * 1]
          }
        }
      }
    })
  }

  changeCollision = (index) => {
    const ball = this.config.balls[index]
    const { width, height } = this.canvas
    const { angle, speed, coordinate: [cx, cy], radius } = ball
    const x = (Math.cos(angle) * speed) + cx
    const y = (Math.sin(angle) * speed) + cy
    const cx1 = x + (2 * radius)
    const cy1 = y + (2 * radius)
    if ((cy1 > height && cx1 > width) || (y < 0 && x < 0) || (cy1 > height && x < 0) || (cx1 > width && y < 0)) {
      ball.angle += Math.PI
    } else if (cy1 > height || y < 0 || cx1 > width || x < 0) {
      ball.angle -= (Math.PI / 2)
    }
    const x1 = (Math.cos(ball.angle) * speed) + cx
    const y1 = (Math.sin(ball.angle) * speed) + cy
    ball.coordinate = [x1.toFixed(6) * 1, y1.toFixed(6) * 1]
    this.config.balls[index] = ball
  }

  suspend=() => {
    if (this.isSuspend) {
      this.isSuspend = false
      this.initDraw()
    } else {
      this.isSuspend = true
    }
  }

  reset=() => {
    this.config = JSON.parse(this.resetConfig)
    if (this.isSuspend) {
      this.isSuspend = false
      this.initDraw()
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.suspend}>{this.isSuspend ? '继续' : '暂停'}</button>
        <button onClick={this.reset}>重置</button>
        <div
          style={{
            marginLeft: '100px',
            width: `${this.canvasWidth}px`,
            height: `${this.canvasWidth}px`,
            border: '1px solid #000',
          }}
        >
          <canvas
            style={{
              width: `${this.canvasWidth}px`,
              height: `${this.canvasWidth}px`,
            }}
            ref={(r) => { this.canvas = r }}
          />
        </div></div>
    )
  }
}
