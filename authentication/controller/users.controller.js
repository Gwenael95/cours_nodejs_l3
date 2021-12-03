import {checkPostUsers, checkLoginUser, checkPasswordUser, checkResetPasswordUser, checkUpdateUserProfile,
    checkUpdateUserProfileByAdmin} from "../validator.js";
import {createUser, authUser, getUserByMail, resetUserPasswordById,  updateUserProfile, deleteUserProfile, getAllUser,
    updateUserProfileByAdmin} from "../services/users.services.js";
import {sendMailForgotPassword} from "../mailer.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";

/*
Controller functions to get the requested data from the models, create an HTML page displaying the data,
 and return it to the user to view in the browser.
 */

export async function authUserPassport(req, res){
    let user

    if (res.locals.user) {
        user = res.locals.user
    } else {
        res.status(400).json({
            error: 'user not found'
        })
    }

    const payload = {
        mail: user.mail,
        pseudo: user.pseudo,
        role: user.role,
        isAdmin: user.role === "admin",
        expiration: Date.now() + parseInt(config.JWT_EXPIRATION_TIME)
    }

    const token = jwt.sign(JSON.stringify(payload), config.JWT_SECRET)

    res
        .cookie('jwt',
            token, {
                httpOnly: true,
                secure: false //--> SET TO TRUE ON PRODUCTION
            }
        )
        .status(200)
        .json({
            message: 'You have logged in '
        })
}

export async function logout(req, res){
    if (req.cookies['jwt']) {
        res
            .clearCookie('jwt')
            res.redirect('/login')
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        })
    }
}




export async function getUserAndSendMail(req, res){
    const body = req.body
    const check = checkPasswordUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await getUserByMail(body.mail)
    if (Object.keys(user).length===0 ||  user.errors){
        return res.status(404).json({
            errors : user.errors || "User not found"
        }) // not found
    }
    sendMailForgotPassword(user.mail, user._id).catch(console.error);
    res.json(user)
}

export async function getUserAndResetPassword(req, res){
    const body = req.body
    const check = checkResetPasswordUser(body)
    if(check !== true){
        return res.status(400).json({
            errors : check
        }) // bad request
    }
    const userUpdate = await resetUserPasswordById(body.password, body.id)
    res.json(userUpdate)
}

export async function getUserProfileForUpdates(req, res){
    const body = req.body
    const check = checkUpdateUserProfile(body)
    if(!check || body.password !==body.confirmPassword){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await updateUserProfile(req.user.mail, req.body.oldPassword, body.pseudo, body.password, body.mail)
    res.json(user)
}

export async function getUserToDeleteProfile(req, res) {
    const body = req.body;
    const check = checkLoginUser(body);
    if (!check) {
        return res.status(400).json({
            error: check,
        })
    }
    const user = await deleteUserProfile(body.mail, body.password);
    res.json(user);
}

export async function getAllUsersController(req, res){
    const user = await getAllUser()
    res.json(user)
}

export async function getOneUserController(req, res){
    const user = await getUserByMail(req.params.mail)
    res.json(user)
}

export async function postUserController(req, res){
    const body = req.body
    const check = checkPostUsers(body)
    console.log("post user")
    console.log(body)
    console.log(check)
    console.log(config)
    if(check !== true || body.password !== body.confirmPassword){
        return res.status(400).json({
            errors : check
        }) // bad request
    }
    const user = await createUser(body.pseudo, body.password, body.mail)
    if(user.errors){
        return res.status(500).json({
            errors : user,
        }) // bad request
    }
    res.json(user)
}

export async function patchUserController(req, res){
    if (!req.user.isAdmin){
        return res.status(401).json({
            errors : "unauthorized"
        }) // bad request
    }
    const body = req.body
    const check = checkUpdateUserProfileByAdmin(body)
    if(!check || body.confirmPassword !== body.password){
        return res.status(400).json({
            errors : check
        }) // bad request
    }
    const user = await updateUserProfileByAdmin(body.oldMail,  body.pseudo, body.password, body.mail)
    res.json(user)
}

export function putUserController(req, res){

}

