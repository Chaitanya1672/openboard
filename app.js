const express = require('express')
const socket = require('socket.io')
const cors = require('cors');
let PORT = 3000

const app = express();

// Allow all origins
app.use(cors());
app.use(express.static("public"))

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