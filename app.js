import express from "express"
import path from "path"
import mongoose from "mongoose";


import bodyparser from 'body-parser';


const __dirname = path.resolve()

const app = express()

const port = 5500
const uri = "mongodb://127.0.0.1:27017/testbase"

// to make a schema
import { Schema, model } from "mongoose";

const userschema = new Schema(

    {
        username: {
            type: String,
            required: true
        },
        userpass: {
            type: String,
            required: true
        }
    },
    {
        timeseries: true
    }
);

const usermodel = model("users", userschema)


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

app.post("/postroute", async (req, res) => {

    const data = req.body

    const user = await usermodel(data)

    const created_user = await user.save()

    res.json({ userid: created_user._id })


})

// add it on the end only *

app.get("*", (req, res) => {
    res.render("notfound")
})



//server up mongo
mongoose.connect(uri).then(() => {

    console.log('database connected ', uri)

    app.listen(port, () => {

        console.log(`http://127.0.0.1:${port}/`)
        
    })
}).catch((err) => {
    console.log(err)
})

