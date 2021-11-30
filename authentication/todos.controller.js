/**
 * don't have access to our database and data models. use services instead
 * @param req
 * @param res
 */
import {createTodo} from "./todos.services.js";
import {checkPostTodos} from "./todos.validator.js"

export function getAllTodosController(req, res){

}

export function getOneTodosController(req, res){
    res.json({
        id: req.params.id
    })
}

export async function postTodosController(req, res){
    const check = checkPostTodos(req.body)
    if(check !== true){
        return res.status(400).json({
            error : check
        }) // bad request
    }
    const todo = await createTodo(req.body.name, req.body.items)
    res.json(todo)
}

export function patchTodosController(req, res){

}

export function putTodosController(req, res){

}

export function deleteTodosController(req, res){

}