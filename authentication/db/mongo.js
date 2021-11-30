import mongoose from "mongoose"
import config  from "../config.js"
/**
 * Connect to mongoDB.
 * don't need to call it later after first call
 */
export function startMongoose(){
    return mongoose.connect(config.MONGO_URI)
}