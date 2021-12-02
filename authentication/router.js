import express from "express"
import { homeController,
	signInController,
	logInController,
	resetPasswordController,
	forgotPasswordController
} from "./controller.js"
import {
	deleteUserController,
	getAllUsersController,
	getOneUserController,
	patchUserController,
	postUserController,
	putUserController,
	authUserPassport,
	getUserAndSendMail,
	getUserAndResetPassword,
	logout,
	hasToken,
	redirectNotAuth
} from "./controller/users.controller.js"
import rateLimit from "express-rate-limit"
import {passPortLogin} from "./middlewares/security.js"
import passport from "passport"
import jwt from "jsonwebtoken"

// limit nb of request from a user
const limiter = rateLimit({
	windowMs: 1000 * 60 * 15, // 15mn = 1000 * 60 * 15
	max: 50
})

const redirect = function(req, res, next) {
	if ( req.isAuthenticated() ) {
		next();
		return
	}
	// Redirect here if logged in successfully
	//req.session.redirectTo = req.path;
	res.redirect(req.redirectPath || "/login")
}

const router= express.Router()


router.get("/", redirectNotAuth)

router.get("/login", limiter, logInController)
router.post("/login", limiter,  passPortLogin, authUserPassport) // api call

router.get("/signin", limiter, signInController)
router.post("/signin", limiter,  postUserController) // api call

router.get("/forgotPassword", limiter, forgotPasswordController)
router.post("/forgotPassword", limiter,  getUserAndSendMail)

router.get("/resetPassword", limiter, resetPasswordController)
router.patch("/resetPassword", limiter , getUserAndResetPassword)


router.get("/home", limiter, redirectNotAuth,  homeController)
router.get('/logout', limiter,  logout)
router.get('/protected', limiter, passport.authenticate('jwt', { session: false }), hasToken) // to test token


router.get("/user", limiter, redirectNotAuth, getAllUsersController)
router.get("/user/:id",limiter, redirectNotAuth,  getOneUserController) // to get only one element
router.post("/user", limiter, redirectNotAuth,  postUserController) // api call
router.patch("/user", limiter, redirectNotAuth, patchUserController) // update partially resources
router.delete("/user", limiter, redirectNotAuth, deleteUserController)
router.put("/user", limiter, redirectNotAuth, putUserController) // replace resources



router.get("*", limiter, redirect) // for all route not defined before, redirect to login

export default router // module.exports

