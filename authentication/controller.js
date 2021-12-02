//@todo rename file as pages.controller.js
export function homeController(req, res){
	console.log(req.query)
	res.render("home.html", {
		title : "Home",
	})
}

export function signInController(req, res){
	console.log(req.query)
	res.render("signIn.html", {
		title : "S'inscrire",
	})
}
export function forgotPasswordController(req, res){
	console.log(req.query)
	res.render("forgotPassword.html", {
		title : "Mot de passe oublié"
	})
}
export function resetPasswordController(req, res){
	console.log(req.query)
	res.render("resetPassword.html", {
		title : "Réinitialiser son mot de passe",
		mail: req.query.mail
	})
}

export function logInController(req, res){
	console.log(req.query)
	res.render("login.html", {
		title : "Se connecter",
	})
}
