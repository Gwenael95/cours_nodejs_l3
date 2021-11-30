import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {type : String, default : ""},
    items: {type : [String]},
    /* options timestamps will had "created at" and "updatedAt"*/
},{
    timestamps:true,
    minimize:false,
})

const Todo = mongoose.model("Todo", schema)

export default Todo 