const express = require("express")
const router = express.Router()
const MongoUtil = require("../MongoUtil.js")

// Update question (PROMPT n SUGGESTED_ANSWER only)
router.patch("/update/:questionid", async(req, res) => {
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

// Update SAVED questions
router.patch("/savequestions", async (req,res) => {
    console.log("Called")
    let db = MongoUtil.getDB()

    let oldContributedQuestions = await db.collection("all_users").findOne({
        '_id': ObjectId("6177752722b1a73b99a4038a")
    })

    let newContributions = req.body.savedQuestions
    oldContributedQuestions = oldContributedQuestions.saved_questions

    for (let newQuestion of newContributions) {

        if (!oldContributedQuestions.includes(newQuestion)) {
            newQuestion = ObjectId(newQuestion)
            oldContributedQuestions.push(newQuestion)
        }
    }
    let newContributedQuestions = oldContributedQuestions

    let results = await db.collection("all_users").updateOne({
        '_id': ObjectId("6177752722b1a73b99a4038a")
    }, {
        '$set': {
            'saved_questions': newContributedQuestions
        }
    })

    res.status(200)
    res.json(results)
})


module.exports = router