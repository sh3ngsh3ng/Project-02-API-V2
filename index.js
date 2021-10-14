const express = require("express")
const cors = require("cors")
const MongoUtil = require("./MongoUtil.js")
const ObjectId = require("mongodb").ObjectId
require("dotenv").config()
const mongoUrl = process.env.MONGO_URL


let app = express()

app.use(express.json())

app.use(cors())



async function main () {
    let db = await MongoUtil.connect(mongoUrl, "project_02")

}


main ()



app.listen(3000, ()=> {
    console.log("Server Started")
})