const canvas = document.querySelector('canvas')

const pencilColorEle = document.querySelectorAll('.pencil-color')
const pencilWidthEle = document.querySelector('.pencil-width')
const eraserWidthEle = document.querySelector('.eraser-width')

let pencilColor = 'red'
let eraserColor = 'white'
let pencilWidth = '3'
let eraserWidth = '3'

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let tool = canvas.getContext('2d')
let mouseDown = false

console.log(pencilWidth)

tool.strokeStyle = pencilColor
tool.lineWidth = pencilWidth

// mousedown -> start new path, mousemove -> path fill (graphics)

canvas.addEventListener('mousedown', (e)=> {
  mouseDown = true
  beginPath({x: e.clientX, y: e.clientY})
})

canvas.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    drawStroke({x: e.clientX, y: e.clientY})
  }
})

canvas.addEventListener('mouseup', ()=>{
  mouseDown = false
})

pencilWidthEle.addEventListener('onchange', (e)=>{
  pencilWidth = pencilWidthEle.value
  console.log('pencilWidth',pencilWidth)
  tool.lineWidth = pencilWidth
})

function beginPath(strokeObj) {
  const {x, y} = strokeObj
  tool.beginPath()
  tool.moveTo(x, y)
}

function drawStroke (strokeObj) {
  const { x, y} = strokeObj
  tool.lineTo(x, y)
  tool.stroke()
}

pencilColorEle.forEach((colorEle)=>{
  colorEle.addEventListener('click', (e)=>{
    let color = colorEle.classList[0]
    pencilColor = color
    tool.strokeStyle = color
  })
})

