//@todo rename file as pages.controller.js
/**
 * Controller to display home page
 * @param req
 * @param res
 */
export function homeController(req, res){
	console.log(req.query)
	res.render("home.html", {
		title : "Home",
	})
}

/**
 * Controller to display sign in page
 * @param req
 * @param res
 */
export function signInController(req, res){
	console.log(req.query)
	res.render("signIn.html", {
		title : "S'inscrire",
	})
}

/**
 * Controller to display forgot password page
 * @param req
 * @param res
 */
export function forgotPasswordController(req, res){
	console.log(req.query)
	res.render("forgotPassword.html", {
		title : "Mot de passe oublié"
	})
}

/**
 * Controller to display reset password page, using mail in query
 * @param req
 * @param res
 */
export function resetPasswordController(req, res){
	console.log(req.query)
	res.render("resetPassword.html", {
		title : "Réinitialiser son mot de passe",
		user: req.query.user,
		key: req.query.key
	})
}

/**
 * Controller to display log in page
 * @param req
 * @param res
 */
export function logInController(req, res){
	console.log(req.query)
	res.render("login.html", {
		title : "Se connecter",
	})
}
