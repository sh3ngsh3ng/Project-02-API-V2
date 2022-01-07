const Filter = require('bad-words')
const data = require("../data.json")

// recursive function to find level obj
let findLevelObj = (array, level) => {
    if (array.length === 1) {
      return array[0]
    } else {
      if (array[0].value === level) {
        return array[0]
      } else {
        return this.findLevelObj(array.slice(1), level)
      }
    }
  }

let changeFirstLetterToUpper = (string) => {
    return string[0].toUpperCase() + string.slice(1)
}

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

// Check all FIELDS are VALID and VALID accordingly to the levelObj
const checkValidityOfFields = (req, res, next) => {
    let levelObj = findLevelObj(data, req.body.level)
    let grade = parseInt(req.body.grade)
    if (levelObj.grade.includes(grade)) {
        let subject = changeFirstLetterToUpper(req.body.subject)
        if (levelObj.subjects.includes(subject)) {
            let topic = changeFirstLetterToUpper(req.body.topic)
            if (levelObj[req.body.subject].includes(topic)) {
                next()
            }
        }
    } else {
        res.sendStatus(400)
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


module.exports = {checkFields, checkProfanity, checkValidityOfFields}

// After implementing login
// const authenticateUser = (req,res,next) => {

// }
