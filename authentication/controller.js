import { getAllUser, getUserById, UserDelete } from './services/users.services.js'

//@todo rename file as pages.controller.js
/**
 * Controller to display home page
 * @param req
 * @param res
 */
export function homeController(req, res){
	const currentUser = {
		nom : 'riles',
		role : true
	}
	console.log(req.query)
	res.render("home.html", {
		title : "Home",
		currentUser
	})
}

export async function admin(req, res){
	const users = await getAllUser()
	res.render("crud.html", {
		title : "Home",
		users
	})
}

export async function deleteUserController(req, res){
  try { const user = req.params.userId;
	console.log(user)
    await UserDelete(user)
    const users = await getAllUser()
    res.render('partial.users.html', { users })}
	catch(err){
		console.log(err, '4444444444444444444444')
	}
}

export async function userForm(req, res){
	try { 
	  const userId = req.params.userId;
	  const user = await getUserById(userId)
	  console.log(user);
	  res.render('adminUserForm.html', { user })}
	  catch(err){
		  console.log(err, '-------------')
	  }
  }

  export async function userEdit(req, res){
	  const userId = req.params.userId;
	  const userData = req.query
	  console.log(userId)
	  console.log(userData)
	  res.redirect('/home/admin')
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

export function updateProfileController(req, res){
	console.log(req.query)
	res.render("updateUserProfile.html", {
		title : "Mettre à jour son profil",
		mail: req.query.mail,
		password: req.query.password,
		pseudo: req.query.pseudo,
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
