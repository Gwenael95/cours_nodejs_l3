import express from 'express'
import { homeController,
	formController,
	signInController,
	logInController,
	resetPasswordController,
	forgotPasswordController
} from './controller.js'
import {
	deleteUserController,
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
import {checkJWT} from "./middlewares/security.js"

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
router.get("/forgotPassword", limiter, forgotPasswordController)
router.get("/resetPassword", limiter, resetPasswordController)

router.get("/home", checkJWT,  homeController)
router.post("/form", mw_test, formController)


router.post("/user/auth", authUserController)
router.post("/user/forgotPassword", getUserAndSendMail) //@todo use jwt to avoid abusive usage
router.patch("/user/resetPassword", getUserAndResetPassword)

router.get("/user", getAllUsersController)
router.get("/user/:id", getOneUserController) // to get only one element
router.post("/user", postUserController)
router.patch("/user", patchUserController) // update partially resources
router.delete("/user", deleteUserController)
router.put("/user", putUserController) // replace resources


export default router // module.exports

