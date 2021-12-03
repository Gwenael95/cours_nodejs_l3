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
//import nodemon from "nodemon"
import config from "./config.js"
import apiRouter from "./router.js"
import nunjucks from "nunjucks"
import { startMongoose } from "./db/mongo.js"
import { Server as SioServer } from "socket.io"
import rateLimit from "express-rate-limit"
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './src/auth/passport.js'
import path from "path";

//region sqlite db for messages
import Sequelize from "sequelize"

const dbPath = path.resolve( "chat.sqlite");

//
// On se connecte à la base
const sequelize = new Sequelize("database", "username", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,

	// Sqlite seulement
	storage: dbPath
});

// On charge le modèle "Chat"
import chatModel from "./client/Models/Chat.js"
import userModel from  "./client/Models/User.js"

const Chat = chatModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);
// On effectue le chargement "réèl"
Chat.sync();
User.sync();
//endregion

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


	/**
	 * Listen a connection for users
	 */
	io.on("connection", (socket) => {
		console.log("Une connexion s'active");
		let userData = null

		socket.on("new_user", (data)=>{
			userData = data
			const user = User.create({
				pseudo: data.pseudo,
				mail: data.mail,
				room: data.room,
				connectionDate: data.connectionDate
			}).then(() => {
				/**
				 * Receive all informations to the base and give it to users connect in the server
				 */
				User.findAll({
					attributes: [ "pseudo", "mail", "room", "connectionDate"],
					where:{room:data.room},
					group:["pseudo"]
				}).then(list => {
					io.emit("init_users", {users: JSON.stringify(list)});
				});
			}).catch(e => {
				console.log(e);
			});
		})

		/**
		 * Listen disconnection to user then remove in the serve and deleted to the chat
		 */
		socket.on("disconnect", () => {
			User.destroy({where:{
				pseudo:userData.pseudo
				}}).then(list=>{
				io.emit("remove_user", userData);
			})

			console.log("Un utilisateur s'est déconnecté");
		});

		
		/**
		 * Enter on room and the user can join it
		 */
		socket.on("enter_room", (room) => {
			// On entre dans la salle demandée
			socket.join(room);
			console.log(socket.rooms);

			/**
			 * We take name, message, room and date to receive on database, then we sort all message to one room and limit
			 * to 10 messages.
			 */
			Chat.findAll({
				attributes: ["id", "name", "message", "room", "createdAt"],
				where: {
					room: room,
				},
				order: [["createdAt", "DESC"]],
				limit : 10

		}).then(list => {
				socket.emit("init_messages", {messages: JSON.stringify(list.reverse())});
			});
		});

		/**
		 * User can leave a room and join another one
		 */
		socket.on("leave_room", (room) => {
			// On entre dans la salle demandée
			socket.leave(room);
			console.log(socket.rooms);
		});

		// Receive message
		socket.on("chat_message", (msg) => {
			// On stocke le message dans la base
			const message = Chat.create({
				name: msg.name,
				message: msg.message,
				room: msg.room,
				createdAt: msg.createdAt
			}).then(() => {
				/**
				 * Message store in dtb and broadcast to all users in the same room
				 */
				io.in(msg.room).emit("received_message", msg);

			}).catch(e => {
				console.log(e);
			});
		});

		// Listen "taping" message, then the user can see another user writting.
		socket.on("typing", msg => {
			socket.to(msg.room).emit("usertyping", msg);
		})
	});
	//endregion


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
