



// Check that all FIELDS are FILLED when creating questions (see what i did there? hahah)
const checkFields = (req,res,next) => {
    if (req.body.level == null 
        || req.body.grade == null 
        || req.body.subject == null 
        || req.body.topic == null
        || req.body.prompt == null
        || req.body.suggested_answer == null) 
        {
        res.sendStatus(400)
    } else {
        next()
    }
}



module.exports = {checkFields}

// After implementing login
// const authenticateUser = (req,res,next) => {

// }
