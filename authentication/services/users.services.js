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

// pareil avec id 

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

///


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



// @todo delete