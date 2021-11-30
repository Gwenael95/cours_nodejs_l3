/**
 * don't have access to our database and data models. use services instead
 * @param req
 * @param res
 */

export function getAllTodosController(req, res){

}

export function getOneTodosController(req, res){
    res.json({
        id: req.params.id
    })
}

export function postTodosController(req, res){

}

export function patchTodosController(req, res){

}

export function putTodosController(req, res){

}

export function deleteTodosController(req, res){

}