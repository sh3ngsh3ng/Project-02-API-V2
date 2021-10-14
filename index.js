const express = require("express")
const MongoUtil = require("./MongoUtil.js")

require("dotenv").config()


let app = express()






app.listen(3000, ()=> {
    console.log("Server Started")
})