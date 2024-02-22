import express from "express"

import path from "path"


const __dirname = path.resolve()

const app = express()

const port = 5500



app.set("view engine", "ejs")

app.set("views", [path.join(__dirname, "views")])

app.disable('view cache');

app.use(express.static(path.join(__dirname, "public")))



app.get("/", (req, res) => {


    res.render("index")

})

app.get("/about", (req, res) => {
    res.render("about")
})



//server up
app.listen(port, (err) => {
    console.log(`http://127.0.0.1:${port}`)

})

