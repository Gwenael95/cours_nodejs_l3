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
import nodemon from "nodemon"
import config from "./config.js"
import apiRouter from "./router.js"
import nunjucks from "nunjucks"
import { startMongoose } from "./db/mongo.js"
import { Server as SioServer } from "socket.io"
import rateLimit from "express-rate-limit"
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './src/auth/passport.js'

const limiter = rateLimit({
	windowMs: 1000 * 60 * 15, // 15mn = 1000 * 60 * 15
	max: 50
})

startMongoose()
	.then(()=>{
		console.log("Connected to DB")
		startWebServer()
	})
	.catch((err)=>{
		console.error(err)
	})

function startWebServer() {

	const app = express()
	const server = http.createServer(app)
	const io = new SioServer(server)

	io.on("connection", (socket)=>{
		console.log("io client Connected. id = " + socket.id)
	})

	// here all we need to have html template like twig. use render in controller
	nunjucks.configure("views", {
		autoescape: true,
		express: app,
	})

	app.use(cookieParser())
	app.use(passport.initialize())

	app.use(limiter)

	app.use((req, res, next) => {
		console.log(req.url)
		next()
	})

	//necessary to enable files in public directory
	app.use(express.static("public"))

	//parse req body as Object, available in req.body
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))

	//app.use(router)
	app.use( apiRouter)
	//	app.use("/api", apiRouter) // only for api call

	server.listen(config.PORT, config.HOST, () => {
		console.log("listening on http://" + config.HOST + ":" + config.PORT)
	})
}
