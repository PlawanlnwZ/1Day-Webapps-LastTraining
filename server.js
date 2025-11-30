const express  = require('express')
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname,"main")))

app.get("/", (req,res) =>{
    res.redirect("login.html")
})

app.listen(3000,()=>{
    console.log("Open in http://localhost:3000")
})