import express from 'express'
import { homeController, formController, signInController } from './controller.js'
import {
	deleteUserController,
	getAllUsersController,
	getOneUserController,
	patchUserController,
	postUserController,
	putUserController
} from "./controller/users.controller.js"
import rateLimit from "express-rate-limit"


// limit nb of request from a user
const limiter = rateLimit({
	windowMs: 1000 * 60 * 15, // 15mn = 1000 * 60 * 15
	max: 50
})

const mw_test = (req, res, next) => {
	console.log("")
	next()
}

const router= express.Router()

router.post("/login", limiter, (req, res)=>{
})
router.get("/signin", limiter, signInController)

router.get("/home", homeController)
router.post("/form", mw_test, formController)

router.get("/user", getAllUsersController)
router.get("/user/:id", getOneUserController) // to get only one element
router.post("/user", postUserController)
router.patch("/user", patchUserController) // update partially resources
router.delete("/user", deleteUserController)
router.put("/user", putUserController) // replace resources


export default router // module.exports

