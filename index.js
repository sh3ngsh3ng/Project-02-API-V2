const express = require("express")
const cors = require("cors")
const MongoUtil = require("./MongoUtil.js")
const ObjectId = require("mongodb").ObjectId
require("dotenv").config()
const mongoUrl = process.env.MONGO_URI


let app = express()
app.use(cors())
app.use(express.json())





async function main () {
    await MongoUtil.connect(mongoUrl, "project_02")


    app.get("/", async (req,res) => {
        let db = MongoUtil.getDB()
        let results = await db.collection("question_bank").find().toArray()
        res.status(200)
        res.json(results)
    })


    app.post("/post", async (req, res) => {
        let db = MongoUtil.getDB()
        let result = await db.collection("question_bank").insertOne({
            "food": "test"
        })
        res.status(200)
        res.json(result)
    })

}

main ()



app.listen(3000, ()=> {
    console.log("Server Started")
})