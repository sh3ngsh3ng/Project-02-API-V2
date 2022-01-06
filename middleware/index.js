



// Check all fields are filled (see what i did there? hahah)
const checkFields = (req,res,next) => {
    console.log(req.body)
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

// After implement login
// const checkForAdmin = (req,res,next) => {

// }
