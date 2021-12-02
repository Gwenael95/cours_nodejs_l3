import {checkPostUsers, checkLoginUser, checkPasswordUser, checkResetPasswordUser} from "../validator.js";
import {createUser, authUser, getUser, resetUserPasswordById,  updateUserProfile, deleteUserProfile} from "../services/users.services.js";
import {sendMailForgotPassword} from "../mailer.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";
import passport from "passport";

/*
Controller functions to get the requested data from the models, create an HTML page displaying the data,
 and return it to the user to view in the browser.
 */

export async function authUserPassport(req, res, next){
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
            .status(200)
            .json({
                message: 'You have logged out'
            })
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        })
    }
}

export async function hasToken(req, res){
    res.send(200).json({
        message: 'welcome to the protected route!'
    })
}
export function redirectNotAuth(req, res, next){
    console.log("redirect not auth")
    passport.authenticate('jwt', {
        //successRedirect: '/home',
        failureRedirect: '/login',
        session: false
    })(req, res, next)
}




export async function getUserAndSendMail(req, res){
    const body = req.body
    const check = checkPasswordUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await getUser(body.mail)
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
    const check = checkLoginUser(body)
    if(!check){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await updateUserProfile(body.pseudo, body.password, body.mail)
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
    const user = await deleteUserProfile(body.mail,body.password);
    res.json(user);
}

export function getAllUsersController(req, res){}

export async function getOneUserController(req, res){
    const body = req.body
    const check = checkLoginUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await authUser( body.password, body.mail)
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
            error : check
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

export function patchUserController(req, res){}

export function putUserController(req, res){}