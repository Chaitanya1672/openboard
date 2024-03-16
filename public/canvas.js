const canvas = document.querySelector('canvas')

const pencilColorEle = document.querySelectorAll('.pencil-color')
const pencilWidthEle = document.querySelector('.pencil-width')
const eraserWidthEle = document.querySelector('.eraser-width')
const download = document.querySelector('.download')
const redo = document.querySelector('.redo')
const undo = document.querySelector('.undo')

let pencilColor = 'red'
let eraserColor = 'white'
let pencilWidth = '3'
let eraserWidth = '3'

let undoRedoTracker = []
let track = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let tool = canvas.getContext('2d')
let mouseDown = false

tool.strokeStyle = pencilColor
tool.lineWidth = pencilWidth

// mousedown -> start new path, mousemove -> path fill (graphics)

canvas.addEventListener('mousedown', (e)=> {
  mouseDown = true
  // beginPath({x: e.clientX, y: e.clientY})
  const data = {
    x: e.clientX, 
    y: e.clientY
  }
  socket.emit('beginPath', data)
})

canvas.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    let data = {
      x: e.clientX, 
      y: e.clientY,
      color: eraserToolFlag ? eraserColor : pencilColor,
      width: eraserToolFlag ? eraserWidth : pencilWidth
    }
    socket.emit('drawStroke', data)
  }
})

canvas.addEventListener('mouseup', ()=>{
  mouseDown = false
  let taskUrl = canvas.toDataURL()
  undoRedoTracker.push(taskUrl)
  track = undoRedoTracker.length - 1  
})

pencilColorEle.forEach((colorEle)=>{
  colorEle.addEventListener('click', (e)=>{
    let color = colorEle.classList[0]
    pencilColor = color
    tool.strokeStyle = color
  })
})

pencilWidthEle.addEventListener('change', ()=>{
  pencilWidth = pencilWidthEle.value
  tool.lineWidth = pencilWidth
})

eraser.addEventListener('click', ()=>{
  if(eraserToolFlag){ 
    // tool.strokeStyle = eraserColor
    // tool.lineWidth = eraserWidth
    let data = {
      strokeStyle: eraserColor,
      lineWidth: eraserWidth
    }
    socket.emit('colorWidthChange', data)
  }else {
    // tool.strokeStyle = pencilColor
    // tool.lineWidth = pencilWidth
    let data = {
      strokeStyle: pencilColor,
      lineWidth: pencilWidth
    }
    socket.emit('colorWidthChange', data)
  }
})

eraserWidthEle.addEventListener('change', ()=>{
  eraserWidth = eraserWidthEle.value
  tool.lineWidth = eraserWidthEle.value
})

download.addEventListener('click', ()=>{
  // Get the data URL of the canvas content and adding to link tag then click event
  let dataURL = canvas.toDataURL('image/jpg');
  let imageLink = document.createElement('a');
  imageLink.href = dataURL;
  imageLink.download = 'canvas_image.jpg';
  document.body.appendChild(imageLink);
  imageLink.click();
  document.body.removeChild(imageLink);
})

undo.addEventListener('click', () => {
  if(track > 0) track --
  let data = {
    trackValue: track, 
    actionTracker: undoRedoTracker
  }
  socket.emit('redoUndo', data)
})

redo.addEventListener('click', () => {
  if(track < undoRedoTracker.length - 1) track ++
  let data = {
    trackValue: track, 
    actionTracker: undoRedoTracker
  }
  socket.emit('redoUndo', data)
})


function beginPath(strokeObj) {
  const {x, y} = strokeObj
  tool.beginPath()
  tool.moveTo(x, y)
}

function drawStroke (strokeObj) {
  const {x, y, color, width} = strokeObj
  tool.strokeStyle = color
  tool.lineWidth = width
  tool.lineTo(x, y)
  tool.stroke()
}

function undoRedoCanvas (trackObj) {
  const {trackValue, actionTracker} = trackObj
  track = trackValue
  undoRedoTracker = actionTracker
  
  let url = undoRedoTracker[track]
  let img = new Image() // new reference of image
  img.src = url
  img.onload = (e) =>{
    tool.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}

socket.on('beginPath', (data)=>{
  beginPath(data)
})

socket.on('drawStroke', (data)=>{
  drawStroke(data)
})
socket.on('redoUndo', (data)=>{
  undoRedoCanvas(data)
})
socket.on('colorWidthChange', (data)=>{
  const {strokeStyle, lineWidth} = data
  tool.lineWidth = lineWidth
  tool.strokeStyle = strokeStyle
})