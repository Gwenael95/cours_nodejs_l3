import {checkPostUsers, checkLoginUser} from "../validator.js";
import {createUser, getUser} from "../services/users.services.js";

export async function authUserController(req, res){
    const body = req.body
    const check = checkLoginUser(body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await getUser( body.password, body.mail)
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
    const user = await getUser( body.password, body.mail)
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