const obstacle = {
  coordinate: [],
  width: 20,
  height: 10,
  color: 'red',
}

const balls = [
  {
    coordinate: [700, 700],
    angle: Math.PI * (1 / 4),
    color: 'rgba(255,0,0,.5)',
    speed: 0,
    radius: 30,
  },
  {
    coordinate: [840, 840],
    angle: Math.PI * (1 / 4),
    color: 'rgba(0,255,0,.5)',
    speed: 10,
    radius: 30,
  },
  // {
  //   coordinate: [100, 100],
  //   newcoordinate: [1, 1],
  //   angle: Math.PI * (4 / 6),
  //   color: 'rgba(0,0,255,.5)',
  //   speed: 0,
  //   radius: 30,
  // },
]

export default {
  balls,
  obstacle,
}
