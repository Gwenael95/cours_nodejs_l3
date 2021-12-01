import jwt from "jsonwebtoken";
import config from "../config.js";

export function createWebToken(data){
    const expireIn = 24 * 60 * 60; // 24H
    const token = jwt.sign({
            user: data
        },
        config.SECRET_KEY,
        {
            expiresIn: expireIn
        });
    return {token, expireIn}
}