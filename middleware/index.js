const Filter = require('bad-words')




// Check that all FIELDS are FILLED when creating questions (see what i did there? hahah)
const checkFields = (req,res,next) => {
    if (req.body.level == null 
        || req.body.grade == null 
        || req.body.subject == null 
        || req.body.topic == null
        || req.body.prompt == null
        || req.body.answer == null) 
        {
        res.sendStatus(400)
    } else {
        next()
    }
}

// check for profanity
const checkProfanity = (req,res,next) => {
    let filter = new Filter()
    let check = filter.isProfane(req.body.prompt) || filter.isProfane(req.body.answer)
    if (check) {
        res.sendStatus(400)
    } else {
        next()
    }
}


module.exports = {checkFields, checkProfanity}

// After implementing login
// const authenticateUser = (req,res,next) => {

// }
