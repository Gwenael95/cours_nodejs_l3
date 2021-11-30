// Prepare to include the server code into our web_server
import express from 'express' // without type:module => const express = require('express')
import http from 'http'

const PORT = 8080
const HOST = "127.0.0.1"
const app = express()
const server = http.createServer(app)


app.use((req, res, next)=>{
	console.log(req.url)
	next()
})

//parse req body as Object, available in req.body
app.use(express.json())
app.use(express.urlencode( { extended:true } ))



server.listen(PORT, HOST, ()=>{
	console.log("listening " + HOST )
})




/*
import express from 'express' // without type:module => const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const server = http.createServer(app)

app.use(express.static('html'))


const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

const pseudos = []
const clients = {
    'client.id': 'pseudo'
}

let connected = 0

io.on('connection', function(socket_client) {
    console.log('Client connected', socket_client.id)
})

const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log('started')
})


*/


