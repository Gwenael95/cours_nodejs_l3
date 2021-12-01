import jwt from "jsonwebtoken";
import config from "../config.js";
import {createWebToken} from "../src/webtoken.js"

export async function checkJWT(req, res, next){
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if(!token){
        token = req.cookies.authcookie
    }

    if(token) {
        jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_required');
            } else if(decoded.user){
                req.decoded = decoded;
                const tokenData = createWebToken(decoded.user)
                res.header('Authorization', 'Bearer ' + tokenData.token);
                next();
            }
        });
    }
    else {
        return res.status(401).json('token_required');
    }
}