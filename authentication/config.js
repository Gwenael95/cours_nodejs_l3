import dotenv from "dotenv"
dotenv.config()

export default {
	HOST : process.env.HOST || "127.0.0.1",
	PORT : process.env.PORT || 8088,
	MONGO_URI : process.env.MONGO_URI || "mongodb://localhost/node_test" || "mongodb:user:pass@//localhost/node_test",
}