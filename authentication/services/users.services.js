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

export async function authUser(password, mail) {
    try {
        const user = await User.findOne({
            mail
        }).exec()
        if (passwordHash.verify(password, user.password)) {
            return user;
        } else {
            return {errors: "Cet utilisateur n'existe pas"};
        }
    }catch(err){
        return err
    }
}

export async function getUser(mail) {
    try {
        const user = await User.findOne({
            mail
        }).exec()
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
        }, { password: hashedPassword}).exec()
        return user;
    }catch(err){
        return err
    }
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
