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


    // route to display ALL questions
    app.get("/", async (req,res) => {
        let db = MongoUtil.getDB()
        let results = await db.collection("question_bank").find().toArray()
        res.status(200)
        res.json(results)
    })


    // route for ques display based on selected fields
    app.get("/search/:level/", async (req,res) => {
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

    // route to search by keywords based on fields chosen
    app.get("/search/advanced/:field/", async(req, res) => {
        let db = MongoUtil.getDB()
        let criteria = {}
        criteria[`${req.params.field}`] = {
            '$regex': req.query.keywords,
            '$options': 'i'
        }
        let results = await db.collection("question_bank").find(criteria).toArray()
        res.status(200)
        res.json(results)
    })

    // route to create question
    app.post("/addquestion", async (req, res) => {
        let db = MongoUtil.getDB()
        let result1 = await db.collection("question_bank").insertOne({
            "level": req.body.level,
            "grade": req.body.grade,
            "subject": req.body.subject,
            "topic": req.body.topic,
            "prompt": req.body.prompt,
            "suggested_answer": req.body.answer,
            "datetime": new Date()
        })
        let newQuestionId = result1.insertedId
        let result2 = await db.collection("all_users").updateOne({
            '_id': ObjectId("6177752722b1a73b99a4038a")
        }, {
            '$push': {
                'contributions': newQuestionId
            }
        })

        res.status(200)
        res.json(result2)
    })

    
    // route to update question
    app.put("/update/:questionid", async(req, res) => {
        let db = MongoUtil.getDB()
        let result = await db.collection("question_bank").updateOne({
            '_id': ObjectId(req.params.questionid)
        }, {
            '$set': {
                'prompt': req.body.prompt,
                'suggested_answer': req.body.answer
            }
        })
        res.status(200)
        res.json(result)
    })


    // route to delete question
    app.delete("/delete/:questionid", async (req,res) => {
        let db = MongoUtil.getDB()
        // delete from question bank
        let result1 = await db.collection("question_bank").deleteOne({
            '_id': ObjectId(req.params.questionid)
        })

        // update in user's contributions
        let result2 = await db.collection("all_users").updateOne({
            '_id': ObjectId("6177752722b1a73b99a4038a")
        }, {
            '$pull': {
                'contributions': ObjectId(req.params.questionid)
                }
        })

        res.status(200)
        res.send(result2)
    })

}

main ()



app.listen(3000, ()=> {
    console.log("Server Started")
})