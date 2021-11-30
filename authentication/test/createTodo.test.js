import axios from "axios";
import config from "../config.js";

axios.defaults.baseURL = "http://" + config.HOST + ":" + config.PORT
axios.post("/api/todos", {
    name: "First todo",
    items: []
})
.then(result=>{
    console.log(result.data)
})