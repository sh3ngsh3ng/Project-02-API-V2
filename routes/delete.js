const express = require("express")
const router = express.Router()
const MongoUtil = require("../MongoUtil.js")
const ObjectId = require("mongodb").ObjectId


router.delete("/delete/:questionid", async (req,res) => {
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

module.exports = router