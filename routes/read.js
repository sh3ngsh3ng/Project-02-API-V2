const express = require("express")
const router = express.Router()
const MongoUtil = require("../MongoUtil.js")
const ObjectId = require("mongodb").ObjectId

// Display ALL questions
router.get("/", async (req,res) => {
    let db = MongoUtil.getDB()
    let results = await db.collection("question_bank").find().toArray()
    res.status(200)
    res.json(results)
})

// Display questions for SELECTED field
router.get("/search/:level/", async(req,res) => {
    let db = MongoUtil.getDB()
    console.log("called")
    // array via query string is received in string => "trending,popular", "popular", "" (empty string = none selected)
    
    try {
        let searchConfig = {
            "level": req.params.level,
            "grade": req.query.grade,
            "subject": req.query.subject,
            "topic": req.query.topic
        }
        // to search for any of the elements in the array
        if (req.query.tags !== "") {
            let query = req.query.tags.split(",")
            searchConfig.tags = {
                "$in": query
            }
        }

        if (req.query.toDate !== "" && req.query.fromDate !== "") {
            searchConfig.datetime = {
                "$lte": new Date(req.query.toDate),
                "$gte": new Date(req.query.fromDate)
            }
        } else if (req.query.toDate) {
            searchConfig.datetime = {
                "$lte": new Date(req.query.toDate)
            }
        } else if (req.query.fromDate) {
            searchConfig.datetime = {
                "$gte": new Date(req.query.fromDate)
            }
        }

        console.log(searchConfig)
    
        // only project prompt and answer back to client side
        let projection = {
            "_id": 1,
            "prompt": 1,
            "suggested_answer": 1,
            "datetime": 1
        }
        let results = await db.collection("question_bank").find(searchConfig).project(projection).toArray()
        console.log(results)
        res.status(200)
        res.json(results)
    } catch (error) {
        res.status(400)
    }
    
})

// Display questions by KEYWORDS search
router.get("/search/advanced/:field/", async(req, res) => {
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

// Display all SAVED questions
router.get("/savedquestions", async (req,res) => {
    let db = MongoUtil.getDB()

    let savedQuestions = await db.collection("all_users").findOne({
        '_id': ObjectId("6177752722b1a73b99a4038a")
    })

    savedQuestions = savedQuestions.saved_questions

    let arrayOfSavedQuestions = []
    for (let ObjId of savedQuestions) {
        let results = await db.collection("question_bank").findOne({
            '_id': ObjId
        })
        if (results) {
            arrayOfSavedQuestions.push(results)
        }
    }
    res.status(200)
    console.log(arrayOfSavedQuestions)
    res.json(arrayOfSavedQuestions)
})

module.exports = router


