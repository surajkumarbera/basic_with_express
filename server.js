const express = require('express')
const formidable = require('express-formidable')
const path = require('path')
const fs = require('fs')

//server host address and port no
const IP = '127.0.0.1'
const PORT = 3000

//initialize express
const app = express()

//Log middleware 
var logRequest = (req, res, next) => {
    console.log(`Request Type: ${req.method}\nRequest Time: ${new Date().toUTCString()}\nRequest From: ${req.protocol}//${req.get('host')}${req.originalUrl}\n`)
    next()
}

var id = 0
// add middleware
app.use(logRequest)     
app.use(formidable({uploadDir: path.join(__dirname, 'images')}))

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/submit', (req, res) => {
    console.log( req.fields)
    console.log(req.files)
    console.log(req.files.img)

    fs.renameSync(req.files.img.path, path.join(__dirname, 'images', (String(id++) + path.parse(req.files.img.name).ext)))

    res.sendFile(path.join(__dirname, 'form.html'))
})

//start the server
app.listen(PORT, IP, () => console.log(`Servr start listening on - ${IP}:${PORT}\n`))
