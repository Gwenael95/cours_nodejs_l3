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

export function updateProfileController(req, res){
	console.log(req.query)
	res.render("updateUserProfile.html", {
		title : "Mettre à jour son profil",
		mail: req.query.mail,
		password: req.query.password,
		pseudo: req.query.pseudo,
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

export function deleteUserController(req, res) {
	console.log(req.body);
	res.render("deleteUserProfile.html", {
		title: "Supprimer mon compte",
		mail: req.query.mail,
		password: req.query.password,
	})
}
