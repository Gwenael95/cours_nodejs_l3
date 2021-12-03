import express from "express"
import {
	signInController,
	logInController,
	updateProfileController,
	resetPasswordController,
	adminCrudInterface,
	deleteUserController,
	updateUserFormController,
	forgotPasswordController,
	deleteUserControllerAdmin,
	chatController
} from './controller/pageController.js'
import {
	getAllUsersController,
	getOneUserController,
	updateProfileControllerAdmin,
	loginInController,
	putUserController,
	authUserTokenPassport,
	sendMailForgotPasswordController,
	resetForgottenPasswordController,
	logout,
	updateUserProfileController,
	deleteAccountController,
	loginInControllerAdmin
} from "./controller/users.controller.js"
import rateLimit from "express-rate-limit"
import {passPortLogin, decodeToken, redirectNotAuth, tryAuth} from "./middlewares/security.js"


// limit nb of request from a user
const limiter = rateLimit({
	windowMs: 1000 * 60 * 15, // 15mn = 1000 * 60 * 15
	max: 50
})

/**
 * Redirect to login if not authenticated
 * @param req
 * @param res
 * @param next
 */
const defaultRedirection = function(req, res, next) {
	/*if ( req.isAuthenticated() ) {
		next();
		return
	}*/
	// Redirect here if logged in successfully
	//req.session.redirectTo = req.path;
	res.redirect(req.redirectPath || "/login")
}

const router= express.Router()


router.get("/", defaultRedirection)

//region route doesn't required token
router.get("/login", limiter, logInController)
router.post("/login", limiter,  passPortLogin, authUserTokenPassport) // api call

router.get("/signin", limiter, signInController)
router.post("/signin", limiter,  loginInController) // api call

router.get("/forgotPassword", limiter, forgotPasswordController)
router.post("/forgotPassword", limiter,  sendMailForgotPasswordController)

router.get("/resetPassword", limiter, resetPasswordController)
router.patch("/resetPassword", limiter , resetForgottenPasswordController)
//endregion


//region reserved to user , need confirmation with password
router.get('/deleteUserProfile', limiter, redirectNotAuth, decodeToken, deleteUserController)
router.delete("/deleteUserProfile", limiter, tryAuth, deleteAccountController)

router.get("/updateUserProfile", limiter, redirectNotAuth, decodeToken, updateProfileController)
router.patch("/updateUserProfile", limiter, redirectNotAuth, decodeToken, updateUserProfileController)
//@todo route patch to set pseudo only

//endregion


// router.get("/home", limiter, redirectNotAuth, decodeToken, homeController)

router.get("/admin", limiter, redirectNotAuth, decodeToken, adminCrudInterface)
router.get("/admin/:userId", limiter, redirectNotAuth, decodeToken, updateUserFormController)
router.post("/createUser", limiter, loginInControllerAdmin)
router.get('/logout', limiter,  logout) //@todo add a button to call logout
// espace admin

router.get("/user", limiter, redirectNotAuth, getAllUsersController)
router.get("/user/:id",limiter, redirectNotAuth,  getOneUserController) // to get only one element
router.get("/user/:mail", limiter, redirectNotAuth, getOneUserController)

router.post("/user", limiter, redirectNotAuth,  loginInController) // api call
router.patch("/user", limiter, redirectNotAuth, updateProfileControllerAdmin) // update partially resources
router.delete("/user", limiter, redirectNotAuth, deleteUserControllerAdmin)
//router.put("/user", limiter, redirectNotAuth, putUserController) // replace resources


router.patch("/admin/user", limiter, redirectNotAuth, decodeToken, updateProfileControllerAdmin) // update partially resources

router.get("/chat", limiter, redirectNotAuth, decodeToken, chatController)


//router.get("*", limiter, defaultRedirection) // for all route not defined before, redirect to login by default

export default router // module.exports

