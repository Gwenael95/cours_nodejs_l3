import User from "../db/models/Users.js"
import passwordHash from "password-hash";


/**
 * Create and save a new User in DB
 * @param pseudo {String} : user's pseudo
 * @param password {String} : user's password
 * @param mail {String} : user's password
 * @return {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
export async function createUser(pseudo, password, mail) {
    const hashedPassword = passwordHash.generate(password);

    try {
        const user = await User.create({
            pseudo, password: hashedPassword, mail
        })
        delete user.password; // ? delete user._doc.password;

        return user
    }catch(err){
        return err
    }
}

/**
 * Authenticate an user using his mail and then verify his password
 * @param password {String} : user's password
 * @param mail {String} : user's mail
 * @return {Promise<{errors: string}|any>}
 */
export async function authUser(password, mail) {
    try {
        const user = await User.findOne({
            mail
        })

        if (user) {
            if (passwordHash.verify(password, user.password)) {
                //delete user.password; // ? delete user._doc.password;
                return user;
            }
            else{
                return {errors: "Les données fournis ne permette pas d'identifier l'utilisateur"};
            }
        } else {
            return {errors: "Cet utilisateur n'existe pas"};
        }

    }catch(err){
        return err
    }
}

/** @todo refactor to getUserByMail
 * Get on user using is mail
 * @param mail {String} : user's mail
 * @return {Promise<any>}
 */
export async function getUser(mail) {
    try {
        const user = await User.findOne({
            mail
        })
        delete user.password; // ? delete user._doc.password;

        return user;
    }catch(err){
        return err
    }
}


export async function getUserById(id) {
    try {
        const user = await User.findById(id).exec()
        return user;
    }catch(err){
        return err
    }
}

export async function getAllUser() {
    try {
        const user = await User.find({}).exec()
        return user;
    }catch(err){
        return err
    }
}
export async function resetUserPassword(password, mail) {
    try {
        const hashedPassword = passwordHash.generate(password);

        const user = await User.findOneAndUpdate({
            mail
        }, { password: hashedPassword})
        delete user.password; // ? delete user._doc.password;

        return user;
    }catch(err){
        return err
    }
}
/**@todo refactor to resetUserForgotPassword (
 * Reset user password using his mail
 * @param password {String} : user's password
 * @param mail {String} : user's mail
 * @return {Promise<any>}
 */
export async function resetUserPasswordById(password, id) {
    try {
        const hashedPassword = passwordHash.generate(password);

        const user = await User.findOneAndUpdate({
            _id:id
        }, { password: hashedPassword})
        delete user.password; // ? delete user._doc.password;
        return user;
    }catch(err){
        return err
    }
}

export function UserDelete(user){
    return User.findByIdAndDelete(user).exec()
}


export async function updateUserProfile(pseudo, password, mail) {
    try {
        const hashedPassword = passwordHash.generate(password);
        const newEmail = mail;
        const newPseudo = pseudo;
        const user = await User.findOneAndUpdate({
            mail
        }, { pseudo: newPseudo, password: hashedPassword, mail: newEmail }).exec()
        return user;
    }catch(err){
        return err
    }
}

export async function deleteUserProfile(mail, password) {
    try {
        const user = await User.findOne({mail}).exec();
        if (passwordHash.verify(password, user.password )) {
            user.deleteOne();
            return user;
        } else {
            return {errors: "Une erreur est survenue."};
        }
    } catch(err) {
        return err;
    }
}

// @todo delete