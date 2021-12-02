import Validator from "fastest-validator"

const v = new Validator()

//@todo enhance check for mail (pattern or type=email, something like this)

/**
 * Schema of data expected when a user sign in or an admin create a user
 * @type {{password: {min: number, max: number, type: string}, mail: {min: number, max: number, type: string}, confirmPassword: {min: number, max: number, type: string}, pseudo: {min: number, max: number, type: string}}}
 */
const schemaPostUser = {
    pseudo : { type : "string", min : 4, max : 80 },
    mail : { type : "string", min : 4, max : 80 },  // pattern maybe to enhanced
    password : { type : "string", min : 4, max : 80 },
    confirmPassword : { type : "string", min : 4, max : 80 }
}

/**
 * Schema of data expected when a user log in
 * @type {{password: {min: number, max: number, type: string}, mail: {min: number, max: number, type: string}}}
 */
const schemaLoginUser = {
    mail : { type : "string", min : 4, max : 80 },
    password : { type : "string", min : 4, max : 80 },
}

/**
 * Schema of data expected when a user reset password
 * @type {{id: {min: number, max: number, type: string}, key: {min: number, max: number, type: string}}}
 */
const schemaResetPasswordUser = {
    id : { type : "string", min : 4, max : 80 },
    password : { type : "string", min : 4, max : 80 },
}

/**
 * Schema of data expected when a user want to reset his password
 * using forgot password page.
 * @type {{mail: {min: number, max: number, type: string}}}
 */
const schemaForgotPasswordUser = {
    mail : { type : "string", min : 4, max : 80 }
}

export const checkPostUsers = v.compile(schemaPostUser)
export const checkLoginUser = v.compile(schemaLoginUser)
export const checkResetPasswordUser = v.compile(schemaResetPasswordUser)
export const checkPasswordUser = v.compile(schemaForgotPasswordUser)
