const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello to Realtime Openboard Project')
})

app.listen(3000)