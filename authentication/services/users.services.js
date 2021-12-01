import User from "../db/models/Users.js"
import passwordHash from "password-hash";

/**
 * Create and save a new User
 * @param pseudo
 * @param password
 * @param mail
 * @return {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
export async function createUser(pseudo, password, mail) {
    const hashedPassword = passwordHash.generate(password);

    try {
        const user = await User.create({
            pseudo, password: hashedPassword, mail
        })
        return user
    }catch(err){
        return err
    }
}

export async function getUser(password, mail) {
    console.log("try get user services")
    try {
        const user = await User.findOne({
            mail
        }).exec()
        console.log(user)
        if (passwordHash.verify(password, user.password)) {
            return user;
        } else {
            return {errors: "Cet utilisateur n'existe pas"};
        }
    }catch(err){
        return err
    }
}

//@todo to get, passwordHash.verify(data.password, hashedPassword)
// @todo delete, update function