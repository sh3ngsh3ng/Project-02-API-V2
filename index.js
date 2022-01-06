const express = require("express")
const cors = require("cors")
const MongoUtil = require("./MongoUtil.js")
const ObjectId = require("mongodb").ObjectId
require("dotenv").config()
const mongoUrl = process.env.MONGO_URI


let app = express()
app.use(cors())
app.use(express.json())


// Routes
const api = {
    'read': require("./routes/read"),
    'create': require("./routes/create"),
    'update': require("./routes/update"),
    'delete': require("./routes/update")
}

async function main () {
    await MongoUtil.connect(mongoUrl, "project_02")

    // READ
    app.use("/read", api.read)
    // CREATE
    app.use("/create", api.create)
    // UPDATE
    app.use("/update", api.update)
    // DELETE
    app.use("/delete", api.delete)
    
}


main ()



app.listen(3000, ()=> {
    console.log("Server Started")
})




// route to display ALL questions
    // app.get("/", async (req,res) => {
    //     let db = MongoUtil.getDB()
    //     let results = await db.collection("question_bank").find().toArray()
    //     res.status(200)
    //     res.json(results)
    // })

    // route for ques display based on selected fields
    // app.get("/search/:level/", async (req,res) => {
    //     let db = MongoUtil.getDB()
    //     // array via query string is received in string => "trending,popular", "popular", "" (empty string = none selected)
    //     let searchConfig = {
    //         "level": req.params.level,
    //         "grade": req.query.grade,
    //         "subject": req.query.subject,
    //         "topic": req.query.topic
    //     }

    //     // to search for any of the elements in the array
    //     if (req.query.tags !== "") {
    //         let query = req.query.tags.split(",")
    //         searchConfig.tags = {
    //             "$in": query
    //         }
    //     }

    //     let projection = {
    //         "_id": 1,
    //         "prompt": 1,
    //         "suggested_answer": 1,
    //         "datetime": 1
    //     }
        
    //     let results = await db.collection("question_bank").find(searchConfig).project(projection).toArray()
    //     console.log(results)
    //     res.status(200)
    //     res.json(results)
    // })

    // route to search by keywords based on fields chosen
    // app.get("/search/advanced/:field/", async(req, res) => {
    //     let db = MongoUtil.getDB()
    //     let criteria = {}
    //     criteria[`${req.params.field}`] = {
    //         '$regex': req.query.keywords,
    //         '$options': 'i'
    //     }
    //     let results = await db.collection("question_bank").find(criteria).toArray()
    //     res.status(200)
    //     res.json(results)
    // })

    // route to display all saved questions
    // app.get("/savedquestions", async (req,res) => {
    //     let db = MongoUtil.getDB()

    //     let savedQuestions = await db.collection("all_users").findOne({
    //         '_id': ObjectId("6177752722b1a73b99a4038a")
    //     })

    //     savedQuestions = savedQuestions.saved_questions

    //     let arrayOfSavedQuestions = []
    //     for (let ObjId of savedQuestions) {
    //         let results = await db.collection("question_bank").findOne({
    //             '_id': ObjId
    //         })
    //         if (results) {
    //             arrayOfSavedQuestions.push(results)
    //         }
    //     }
    //     res.status(200)
    //     console.log(arrayOfSavedQuestions)
    //     res.json(arrayOfSavedQuestions)

    // })




    // route to create question
    // app.post("/addquestion", async (req, res) => {
    //     let db = MongoUtil.getDB()
    //     let result1 = await db.collection("question_bank").insertOne({
    //         "level": req.body.level,
    //         "grade": req.body.grade,
    //         "subject": req.body.subject,
    //         "topic": req.body.topic,
    //         "prompt": req.body.prompt,
    //         "suggested_answer": req.body.answer,
    //         "tags": req.body.tags,
    //         "datetime": new Date()
    //     })
    //     let newQuestionId = result1.insertedId
    //     let result2 = await db.collection("all_users").updateOne({
    //         '_id': ObjectId("6177752722b1a73b99a4038a")
    //     }, {
    //         '$push': {
    //             'contributions': newQuestionId
    //         }
    //     })

    //     res.status(200)
    //     res.json(result2)
    // })



    // route to update question (prompt and suggested_answer only)
    // app.patch("/update/:questionid", async(req, res) => {
    //     let db = MongoUtil.getDB()
    //     let result = await db.collection("question_bank").updateOne({
    //         '_id': ObjectId(req.params.questionid)
    //     }, {
    //         '$set': {
    //             'prompt': req.body.prompt,
    //             'suggested_answer': req.body.answer
    //         }
    //     })
    //     res.status(200)
    //     res.json(result)
    // })


    // app.patch("/savequestions", async (req,res) => {
    //     console.log("Called")
    //     let db = MongoUtil.getDB()

    //     let oldContributedQuestions = await db.collection("all_users").findOne({
    //         '_id': ObjectId("6177752722b1a73b99a4038a")
    //     })

    //     let newContributions = req.body.savedQuestions
    //     oldContributedQuestions = oldContributedQuestions.saved_questions

    //     for (let newQuestion of newContributions) {

    //         if (!oldContributedQuestions.includes(newQuestion)) {
    //             newQuestion = ObjectId(newQuestion)
    //             oldContributedQuestions.push(newQuestion)
    //         }
    //     }
    //     let newContributedQuestions = oldContributedQuestions

    //     let results = await db.collection("all_users").updateOne({
    //         '_id': ObjectId("6177752722b1a73b99a4038a")
    //     }, {
    //         '$set': {
    //             'saved_questions': newContributedQuestions
    //         }
    //     })
    
    //     res.status(200)
    //     res.json(results)
    // })



    // app.delete("/delete/:questionid", async (req,res) => {
    //     let db = MongoUtil.getDB()
    //     // delete from question bank
    //     let result1 = await db.collection("question_bank").deleteOne({
    //         '_id': ObjectId(req.params.questionid)
    //     })

    //     // update in user's contributions
    //     let result2 = await db.collection("all_users").updateOne({
    //         '_id': ObjectId("6177752722b1a73b99a4038a")
    //     }, {
    //         '$pull': {
    //             'contributions': ObjectId(req.params.questionid)
    //             }
    //     })

    //     res.status(200)
    //     res.send(result2)
    // })