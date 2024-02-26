import express from "express"
import path from "path"

import bodyparser from 'body-parser';


const __dirname = path.resolve()

const app = express()

const port = 5500



app.set("view engine", "ejs")

app.set("views", [path.join(__dirname, "views")])

app.disable('view cache');

app.use(express.static(path.join(__dirname, "public")))


// node presets
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());



app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/faq", (req, res) => {
    res.render("faq")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/control", (req, res) => {
    res.render("admin")
})


// post request

// app.get("/postroute")

app.post("/postroute", (req, res) => {

    const { username, userpass } = req.body

    console.log(username, userpass)
    res.redirect('/');
})

// add it on the end only *

app.get("*", (req, res) => {
    res.render("notfound")
})



//server up
app.listen(port, (err) => {
    console.log(`http://127.0.0.1:${port}`)

})

