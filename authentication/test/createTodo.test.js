import axios from "axios";
import config from "../config.js";
import assert from "assert"

axios.defaults.baseURL = "http://" + config.HOST + ":" + config.PORT
axios.defaults.validateStatus = function validateStatus(status){
    return true
}

describe('Todos API', function () {
    describe('POST /todos', function () {
        it("should create new todo and return it", async function (){
            const result = await axios.post("/api/todos", {
                name: "First todo",
                items: []
            })
            assert.equal(200, result.status)
            assert.deepEqual(["name", "_id", "createdAt", "updatedAt", "items", "__v"].sort(), Object.keys(result.data).sort() )
        })

        it("should not create new todo and return error", async function (){
            const result = await axios.post("/api/todos", {
                name: "",
                items: []
            })
            console.log(result.data)
            assert.equal(400, result.status)
            assert.deepEqual(["error"], Object.keys(result.data) )
        })
    });
});

axios.post("/api/todos", {
    name: "First todo",
    items: []
})
.then(result=>{
    console.log(result.data)
})