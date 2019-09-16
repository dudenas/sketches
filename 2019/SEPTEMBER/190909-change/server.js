const express = require('express')
const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

console.log('server is running')

const socket = require('socket.io')
const io = socket(server)

io.on('connection', (socket) => {
  console.log(`new connocetion — ${socket.id}`)
  socket.on('mouse', (data) => {
    // console.log(data)
  })
})