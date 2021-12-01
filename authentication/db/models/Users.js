import mongoose from "mongoose"

const schema = new mongoose.Schema({
    pseudo: {type : String},
    password: {type : String},
    mail :{type: String}
    /* options timestamps will had "created at" and "updatedAt"*/
},{
    timestamps:true,
    minimize:false,
})

const User = mongoose.model("User", schema)

export default User