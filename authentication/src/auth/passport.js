import passport from 'passport'
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy
import config from "../../config.js"

/**
 * Extract data from the cookies in request header
 * @param req
 * @return {null|Strign}
 */
const cookieExtractor = req => {
    let jwt = null

    if (req && req.cookies) {
        jwt = req.cookies['jwt']
    }

    return jwt
}

/**
 * Check if token has expired
 * @todo : when token expire, redirect to login page
 */
passport.use('jwt', new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.JWT_SECRET
}, (jwtPayload, done) => {
    const { expiration } = jwtPayload

    if (Date.now() > expiration) {
        done('Unauthorized, token expire', false)
    }

    done(null, jwtPayload)
}))