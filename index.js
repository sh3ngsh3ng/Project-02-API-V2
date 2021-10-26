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

    // route for ques display
    app.get("/:level/", async (req,res) => {
        let db = MongoUtil.getDB()
        let results = await db.collection("question_bank").find({
            "level": req.params.level,
            "grade": req.query.grade,
            "subject": req.query.subject,
            "topic": req.query.topic
        }).toArray()
        res.status(200)
        res.json(results)
    })

    // route to create ques
    app.post("/addquestion", async (req, res) => {
        let db = MongoUtil.getDB()
        let result = await db.collection("question_bank").insertOne({
            "food": "test"
        })
        res.status(200)
        res.json(result)
    })

    app.delete("/delete/:id", async (req,res) => {
        let db = MongoUtil.getDB()
        let results = await db.collection("question_bank").deleteOne({
            '_id': ObjectId(req.params.id)
        })
        res.status(200)
        res.send(results)
    })

}

main ()



app.listen(3000, ()=> {
    console.log("Server Started")
})