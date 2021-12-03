import User from "../db/models/Users.js"
import passwordHash from "password-hash";
import {ObjectId} from "mongodb";


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

/**
 * Get on user using is mail
 * @param mail {String} : user's mail
 * @return {Promise<any>}
 */
export async function getUserByMail(mail) {
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
        const user = await User.find({})
        return user;
    }catch(err){
        return err
    }
}

///


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
/*
@todo change role of user to admin
db.users.findOneAndUpdate({
    mail:"gwenael.mw@gmail.com"
}, { role:"admin"})

export async function resetDataUser(pseudo, password, mail, id) {
    try {
        const sameUser = await User.findOne({ _id:{$nin:id},$or:[{pseudo:pseudo},{mail:mail}]})
        if(sameUser){
            console.log(sameUser);
            let erreur = "error"
            throw erreur
        }
        const hashedPassword = passwordHash.generate(password);
        const user = await User.findByIdAndUpdate({
            _id : id
        }, { $set : { password: hashedPassword, pseudo: pseudo, mail: mail}},{new: true}).exec()
        
        return 'success';
    }catch(err){
        console.log('ici')
        console.log(err)
        return err
    }
}

export function UserDelete(user){
    return User.findByIdAndDelete(user).exec()
 }

*/

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

export function UserDeleteById(user){
    return User.findByIdAndDelete(new ObjectId(user))
}


/**
 * Update all user data (except role).
 * Be aware, should only be used if the user is authenticated
 * @param oldMail {String} : old user's mail
 * @param oldPassword {String} : old user's password
 * @param pseudo {String} : new user's pseudo
 * @param password {String} : new user's password
 * @param mail {String} : new user's mail
 * @return {Promise<any>}
 */
export async function updateUserProfile(oldMail, oldPassword , pseudo, password, mail) {
    try {
        const currentUser = await User.findOne({mail:oldMail});
        console.log(currentUser)
        if (passwordHash.verify(oldPassword, currentUser.password )) {
            const hashedPassword = passwordHash.generate(password);
            const user = await User.findOneAndUpdate({
                mail: oldMail
            }, { pseudo: pseudo, password: hashedPassword, mail: mail })
            return user;
        }
        else{
            return {errors: "Une erreur est survenue."};
        }

    }catch(err){
        return err
    }
}

export async function updateUserProfileByAdmin(oldMail , pseudo, password, mail) {
    try {
        const hashedPassword = passwordHash.generate(password);
        const user = await User.findOneAndUpdate({
            mail: oldMail
        }, { pseudo: pseudo, password: hashedPassword, mail: mail })
        return user;
    }catch(err){
        return err
    }
}


export async function deleteUserProfile(mail, password) {
    try {
        const user = await User.findOne({mail});
        if (passwordHash.verify(password, user.password )) {
            await User.deleteOne({mail});
            return user;
        } else {
            return {errors: "Une erreur est survenue."};
        }
    } catch(err) {
        return err;
    }
}

// @todo delete