import { checkLoginUser } from "../validator.js";
import { authUser } from "../services/users.services.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
import config from "../config.js";
import passport from "passport";

/**
 * This function get a user from DB, and check is data to the ones send by user.
 * If all match, we create a res.locals.user data, used to create jwt token.
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
export const passPortLogin = async (req, res, next) => {
    try {
        const body = req.body
        const check = checkLoginUser(body)
        if(check !== true){
            return res.status(400).json({
                errors : check
            }) // bad request
        }

        const user = await authUser(body.password, body.mail)
        const { mail, password } = user

        if (mail === body.mail) {
            if (passwordHash.verify(body.password, password)) {
                res.locals.user = user
                next()
            } else {
                res.status(400).json({
                    errors: 'Incorrect username or password'
                })
            }
        } else {
            res.status(400).json({
                errors: 'Incorrect username or password'
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const decodeToken = function(req, res, next) {
    if (req.cookies && req.cookies["jwt"]) {
        const token = req.cookies["jwt"];
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                req.user = decoded;
            }
        });
    }
    next()
}


export function redirectNotAuth(req, res, next){
    console.log("redirect not auth")
    passport.authenticate('jwt', {
        //successRedirect: '/home',
        failureRedirect: '/login',
        session: false
    })(req, res, next)
}
export function tryAuth(req, res, next){
    passport.authenticate('jwt',{
        session:false
    })(req, res, next)
}
