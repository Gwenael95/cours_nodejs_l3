import {checkPostUsers} from "../validator.js";
import {createUser} from "../services/users.services.js";


export function getAllUsersController(req, res){

}

export function getOneUserController(req, res){
    res.json({
        id: req.params.id
    })
}

export async function postUserController(req, res){
    const check = checkPostUsers(req.body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const user = await createUser(req.body.pseudo, req.body.password, req.body.mail)
    res.json(user)
}

export function patchUserController(req, res){

}

export function putUserController(req, res){

}

export function deleteUserController(req, res){

}