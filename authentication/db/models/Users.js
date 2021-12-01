import mongoose from "mongoose"

//@todo validator for unique mail and pseudo (unique:true isn't a validator)
const schema = new mongoose.Schema({
    pseudo: {type : String, unique:true},
    password: {type : String},
    mail :{type: String, unique:true, match: /.+@.+\..+/,}
    /* options timestamps will had "created at" and "updatedAt"*/
},{
    timestamps:true,
    minimize:false,
})

const User = mongoose.model("User", schema)

export default User