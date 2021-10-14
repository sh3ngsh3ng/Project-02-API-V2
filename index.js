const express = require("express")


require("dotenv").config()


let app = express()






app.listen(3000, ()=> {
    console.log("Server Started")
})