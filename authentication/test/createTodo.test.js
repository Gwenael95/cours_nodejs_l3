import axios from "axios";
import config from "../config.js";
import assert from "assert"

axios.defaults.baseURL = "http://" + config.HOST + ":" + config.PORT
axios.defaults.validateStatus = function validateStatus(status){
    return true
}

describe('User API', function () {
    describe('POST /user', function () {
        it("should create new user and return it", async function (){
            const result = await axios.post("/user", {
                pseudo: "gwen",
                mail: "gwenael.mw@gmail.com",
                password: "monPass1"
            })
            assert.equal(200, result.status)
            assert.deepEqual(["pseudo", "mail", "_id", "createdAt", "updatedAt", "password", "__v"].sort(), Object.keys(result.data).sort() )
        })

    });
});

axios.post("/user", {
    pseudo: "gwen",
    mail: "gwenael.mw@gmail.com",
    password: "monPass1"
})
.then(result=>{
    console.log(result.data)
})