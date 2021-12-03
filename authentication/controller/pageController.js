import { getAllUser, getUserById, UserDeleteById } from '../services/users.services.js'
import {ObjectId} from "mongodb";

function getCurrentUser(req){
	if(req.user){
		return {
			pseudo : req.user.pseudo,
			role : req.user.role,
			isAdmin: req.user.role === "admin",
			mail: req.user.mail
		}
	}
	else{
		return null
	}
}

/**
 * Controller to display home page
 * @param req
 * @param res
 */
export function homeController(req, res){
	const currentUser = getCurrentUser(req)
	res.render("home.html", {
		title : "Acueil",
		currentUser
	})
}

export async function admin(req, res){
	const currentUser = getCurrentUser(req)

	if (currentUser.isAdmin){
		const users = await getAllUser()
		return res.render("crud.html", {
			title : "Espace Admin",
			users,
			currentUser
		})
	}
	res.redirect("/home")
}

/**
 * Controller to display delete profile page for admin
 * @param req 
 * @param res 
 */
export async function deleteUserControllerAdmin(req, res){
  try {
  	const userId = req.body.userId;
    await UserDeleteById(userId)
    const users = await getAllUser()
    res.render('partial.users.html', { users })}
	catch(err){
		console.log("delete user error : \n", err)
	}
}

/**
 * Controller to display delete profile page for users
 * @param req 
 * @param res 
 */
export function deleteUserController(req, res) {
	const currentUser = getCurrentUser(req)
	console.log(currentUser)
	res.render("deleteUserProfile.html", {
		title: "Supprimer mon compte - " + currentUser.pseudo,
		mail: currentUser.mail
	})
}



export async function userForm(req, res){
	//http://127.0.0.1:8088/home/admin/61a8179615fd196e339b9b3a
	try {
		const currentUser = getCurrentUser(req)

		if (currentUser.isAdmin){
			const userId = req.params.userId;
			const user = await getUserById(new ObjectId(userId))
			console.log(user);
			return res.render('adminUserForm.html', {
				title:"Mis à jour de l'utilisateur " + user.pseudo,
				user,
				userId :userId
			})
		}
		res.redirect("/home")
	}
	  catch(err){
		  console.log(err, '-------------')
	  }
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

export async function chatController(req, res){
	const currentUser = getCurrentUser(req)
	console.log(req.user)
	res.render("chat.html", {
		title : "Chat",
		user:currentUser
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
	const currentUser = getCurrentUser(req)

	console.log(currentUser)
	res.render("updateUserProfile.html", {
		title : "Mettre à jour mon profil",
		mail: currentUser.mail,
		pseudo: currentUser.pseudo,
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

