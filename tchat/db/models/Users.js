import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator";

/**
 * Mongoose Schema for a user
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any>}
 */
const schema = new mongoose.Schema({
    pseudo: {type : String, unique:true},
    password: {type : String},
    mail :{type: String, unique:true, match: /.+@.+\..+/,},
    role :{type: String, default: "user"},  // role = [user/admin]
    room :{type: String, default: "Lacoding"}
    /* options timestamps will had "created at" and "updatedAt"*/
},{
    timestamps:true,
    minimize:false,
})

schema.plugin(uniqueValidator);

const User = mongoose.model("User", schema)

export default User