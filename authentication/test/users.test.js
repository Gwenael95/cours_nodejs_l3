import axios from "axios";
import config from "../config.js";
import assert from "assert"
import mongoose from "mongoose";
import { startMongoose } from "../db/mongo.js"

axios.defaults.baseURL = "http://" + config.HOST + ":" + config.PORT
axios.defaults.validateStatus = function validateStatus(status){
    return true
}

await startMongoose()


/**
 * These test concerned the user API
 */
describe('User API', function () {

    /**
     * Executed before each test. for example can be used to already have one user in DB
     */
    beforeEach(() => console.log("\n###################################"));

    /**
     * Executed after each test. for example can clear DB data
     */
    afterEach(function () {
        mongoose.connection.db.dropDatabase()
    });

    /**
     * These test concerned the creation of new user
     */
    describe('POST /user', function () {

        it("should create new user and return it", async function (){
            const result = await axios.post("/signin", {
                pseudo: "gwen",
                mail: "gwenael@gmail.com",
                password: "monPass1",
                confirmPassword : "monPass1"
            })
            assert.equal(200, result.status)
            assert.deepEqual(["pseudo", "role", "mail", "_id", "createdAt", "updatedAt", "password", "__v"].sort(), Object.keys(result.data).sort() )
        })

        it("should create a new user, but can't create another with same pseudo", async function (){
            const result = await axios.post("/signin", {
                pseudo: "gwen",
                mail: "gwenael@gmail.com",
                password: "monPass1",
                confirmPassword : "monPass1"
            })
            assert.equal(200, result.status)
            assert.deepEqual(["pseudo", "role", "mail", "_id", "createdAt", "updatedAt", "password", "__v"].sort(), Object.keys(result.data).sort() )

            const result2 = await axios.post("/signin", {
                pseudo: "gwen",
                mail: "railas@gmail.com",
                password: "monPass1",
                confirmPassword : "monPass1"
            })
            assert.equal(500, result2.status)
            assert.deepEqual(["errors"].sort(), Object.keys(result2.data).sort() )

        })

        it("should create a new user, but can't create another with same mail", async function (){
            const result = await axios.post("/signin", {
                pseudo: "gwen",
                mail: "gwenael@gmail.com",
                password: "monPass1",
                confirmPassword : "monPass1"
            })
            assert.equal(200, result.status)
            assert.deepEqual(["pseudo", "role", "mail", "_id", "createdAt", "updatedAt", "password", "__v"].sort(), Object.keys(result.data).sort() )

            const result2 = await axios.post("/signin", {
                pseudo: "railas",
                mail: "gwenael@gmail.com",
                password: "monPass1",
                confirmPassword : "monPass1"
            })
            assert.equal(500, result2.status)
            assert.deepEqual(["errors"].sort(), Object.keys(result2.data).sort() )
        })
    });
});
