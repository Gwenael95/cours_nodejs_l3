import dotenv from "dotenv"
dotenv.config()

export default {
	HOST : process.env.HOST || "127.0.0.1",
	PORT : process.env.PORT || 8088,
	//localhost:27017 = Host mongodb   ; node_test = mongoDb data base
	MONGO_URI : process.env.MONGO_URI || "mongodb://localhost:27017/node_test" || "mongodb:user:pass@//localhost:27017/node_test",
}