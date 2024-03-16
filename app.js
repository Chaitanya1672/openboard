const express = require('express')
const socket = require('socket.io')
let PORT = 3000

const app = express()
// app.use()
app.use(express.static("public"))

app.get('/', function (req, res) {
  res.send('Hello to Realtime Openboard Project')
})

const server = app.listen(PORT,()=>{
  console.log(`Server started at port ${PORT}`)
})

const io = socket(server)

io.on('connection', (socket)=>{
  console.log('Socket connected!')
  
  // received data
  socket.on('beginPath', (data) => {
    //now transfer data to all connections
    io.sockets.emit('beginPath', data)
  })
  socket.on('drawStroke', (data) => {
    io.sockets.emit('drawStroke', data)
  })
  socket.on('redoUndo', (data) => {
    io.sockets.emit('redoUndo', data)
  })
  socket.on('colorWidthChange', (data) => {
    io.sockets.emit('colorWidthChange', data)
  })
})