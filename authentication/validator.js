import Validator from "fastest-validator"

const v = new Validator()

const schemaPostUser = {
    pseudo : { type : "string", min : 4, max : 80 },
    mail : { type : "string", min : 4, max : 80 },  // pattern maybe to enhanced
    password : { type : "string", min : 4, max : 80 },
    confirmPassword : { type : "string", min : 4, max : 80 }
}

const schemaLoginUser = {
    mail : { type : "string", min : 4, max : 80 },
    password : { type : "string", min : 4, max : 80 },
}

export const checkPostUsers = v.compile(schemaPostUser)
export const checkLoginUser = v.compile(schemaLoginUser)
