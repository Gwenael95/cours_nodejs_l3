export function homeController(req, res){
	console.log(req.query)
	res.json({
		success:true,
	})
}

export function formController(req, res){
	console.log(req.body)
	res.json({
		success:true,
	})
}