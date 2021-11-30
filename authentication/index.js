// Prepare to include the server code into our web_server
// install all necessary package with "npm install"
// should add .env in .gitignore

//classic start (prod) : npm start. 
//dev start : npm run dev. it will restart server when updating a file 

//@todo : create file .env . its content is 
// PORT=8088
// HOST=127.0.0.1 

import express from "express" // without type:module => const express = require("express")
import http from "http"
import config from "./config.js"
import apiRouter from "./router.js"
import nunjucks from "nunjucks"

const app = express()
const server = http.createServer(app)

// here all we need to have html template like twig. use render in controller
nunjucks.configure("views", {
	autoescape : true,
	escape : app,
})

app.use((req, res, next)=>{
	console.log(req.url)
	next()
})

//necessary to enable files in public directory
app.use(express.static("public"))

//parse req body as Object, available in req.body
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))

//app.use(router)
app.use("/api", apiRouter)


server.listen(config.PORT,config.HOST, ()=>{
	console.log("listening on http://" + config.HOST + ":" + config.PORT )
})
