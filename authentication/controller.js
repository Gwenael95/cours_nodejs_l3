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

export function formController(req, res){
	console.log(req.body)
	res.json({
		success:true,
	})
}