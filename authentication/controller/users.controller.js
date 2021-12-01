import {checkPostUsers, checkLoginUser, checkPasswordUser} from "../validator.js";
import {createUser, authUser, getUser, resetUserPassword} from "../services/users.services.js";
import {sendMailForgotPassword} from "../mailer.js";
import jwt from "jsonwebtoken";
import config from "../config.js";


export async function authUserController(req, res){
    const body = req.body
    const check = checkLoginUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await authUser( body.password, body.mail)

    if(user.errors){
        return res.status(400).json({
            errors: "Les données fournis ne permette pas d'identifier l'utilisateur"
        })
    }

    const expireIn = 24 * 60 * 60; // 24H
    const token    = jwt.sign({
            user: user
        },
        config.SECRET_KEY,
        {
            expiresIn: expireIn
        });

    console.log(token)
    res.header('Authorization', 'Bearer ' + token);

    return res.status(200).json(user);
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
    sendMailForgotPassword(user.mail).catch(console.error);
    res.json(user)
}

export async function getUserAndResetPassword(req, res){
    const body = req.body
    const check = checkLoginUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await resetUserPassword(body.password, body.mail)
    res.json(user)
}

export function getAllUsersController(req, res){

}

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
    if(check !== true || body.password !== body.confirmPassword){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await createUser(body.pseudo, body.password, body.mail)
    res.json(user)
}

export function patchUserController(req, res){

}

export function putUserController(req, res){

}

export function deleteUserController(req, res){

}