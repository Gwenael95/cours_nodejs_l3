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

    const user = await User.create({
        pseudo, password: hashedPassword, mail
    })
    return user
}

//@todo to get, passwordHash.verify(data.password, hashedPassword)
// @todo delete, update function