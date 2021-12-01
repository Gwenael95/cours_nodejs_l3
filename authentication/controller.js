export function homeController(req, res){
	console.log(req.query)
	res.render("home.html", {
		title : "Home",
	})
}

export function signInController(req, res){
	console.log(req.query)
	res.render("signIn.html", {
		title : "SignIn",
	})
}

export function formController(req, res){
	console.log(req.body)
	res.json({
		success:true,
	})
}