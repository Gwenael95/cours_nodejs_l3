import express from 'express'
import { homeController,
	formController,
	signInController,
	logInController,
	resetPasswordController,
	updateProfileController,
	deleteUserController,
} from './controller.js'
import {
	getAllUsersController,
	getOneUserController,
	patchUserController,
	postUserController,
	putUserController,
	authUserController,
	getUserAndSendMail,
	getUserAndResetPassword,
	getUserProfileForUpdates,
	getUserToDeleteProfile,
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
router.get("/updateUserProfile", limiter, updateProfileController)
router.get('/deleteUserProfile', limiter, deleteUserController)

router.get("/home", homeController)
router.post("/form", mw_test, formController)


router.get("/user", getAllUsersController)
router.get("/user/:id", getOneUserController) // to get only one element
router.post("/user/auth", authUserController)
router.post("/user/forgotPassword", getUserAndSendMail)
router.post("/user", postUserController)
router.patch("/user/resetPassword", getUserAndResetPassword)
router.patch("/user/updateUserProfile", getUserProfileForUpdates)
router.patch("/user", patchUserController) // update partially resources

router.delete("/user/deleteUserProfile", getUserToDeleteProfile)

router.put("/user", putUserController) // replace resources


export default router // module.exports

