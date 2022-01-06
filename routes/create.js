const express = require("express")
const router = express.Router()
const MongoUtil = require("../MongoUtil.js")

router.post("/addquestion", async (req, res) => {
    let db = MongoUtil.getDB()
    let result1 = await db.collection("question_bank").insertOne({
        "level": req.body.level,
        "grade": req.body.grade,
        "subject": req.body.subject,
        "topic": req.body.topic,
        "prompt": req.body.prompt,
        "suggested_answer": req.body.answer,
        "tags": req.body.tags,
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

module.exports = router