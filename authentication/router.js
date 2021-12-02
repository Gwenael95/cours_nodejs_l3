import express from 'express'
import { homeController,
	formController,
	signInController,
	logInController,
	resetPasswordController,
	admin,
	deleteUserController,
	userForm,
	userEdit
} from './controller.js'
import {
	getAllUsersController,
	getOneUserController,
	patchUserController,
	postUserController,
	putUserController,
	authUserController,
	getUserAndSendMail,
	getUserAndResetPassword
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

router.get("/login", limiter, logInController)
router.get("/signin", limiter, signInController)
router.get("/resetPassword", limiter, resetPasswordController)
router.get("/", limiter, (req,res)=>{
	res.redirect('/login')
})

router.get("/home", homeController)
router.post("/form", mw_test, formController)

// espace admin

router.get("/home/admin", limiter, admin)

router.delete("/user/:userId", deleteUserController)

router.get("/home/admin/:userId", limiter, userForm)
router.patch("/home/admin/:userId", limiter, userEdit)


router.post("/user/auth", authUserController)
router.post("/user/forgotPassword", getUserAndSendMail)
router.patch("/user/resetPassword", getUserAndResetPassword)
router.get("/user", getAllUsersController)
router.get("/user/:id", getOneUserController) // to get only one element
router.post("/user", postUserController)
router.patch("/user", patchUserController) // update partially resources
router.put("/user", putUserController) // replace resources


export default router // module.exports

