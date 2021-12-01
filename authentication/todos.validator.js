import Validator from "fastest-validator"

const v = new Validator()

const schemaPostTodos = {
    name : { type : "string", min : 4, max : 80 },
    items : { type : "array", empty : true }
}

export const checkPostTodos = v.compile(schemaPostTodos)
