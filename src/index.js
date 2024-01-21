const express = require("express")
const Collection = require("./mongo")

const app = express()
const path = require("path")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcryptjs = require("bcryptjs")

const {engine} = require('express-handlebars')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


const templatePath = path.join(__dirname,"../templates")
const publicPath = path.join(__dirname,"../public")
const imagePath = path.join(__dirname, "../images")
console.log(publicPath);

app.set('view engine','hbs')
app.set("views",templatePath)
app.use(express.static(publicPath))

app.use(express.static("public")); 

app.get("/static", (req, res) => { 
    res.render("static"); 
}); 
  
// Route to display dynamic src images 
app.get("/dynamic", (req, res) => { 
    imageList = []; 
    imageList.push({ src: "icons/flask.png", name: "flask" }); 
    imageList.push({ src: "icons/javascript.png", name: "javascript" }); 
    imageList.push({ src: "icons/react.png", name: "react" }); 
    res.render("dynamic", { imageList: imageList }); 
}) 

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})


async function hashPass(password){
    const res = await bcryptjs.hash(password,10)
    return res
}
async function compare(userPass,hashPass){
    const res = await bcryptjs.compare(userPass,hashPass)
    return res
}


app.get("/",(req,res)=>{
    if(req.cookies.jwt){
        const verify=jwt.verify(req.cookies.jwt,"helloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapp")
    res.render("login",{name:verify.name})
    }

    else{
        res.render("signup")
    }

})

app.post("/signup",async(req,res)=>{
    try{
        const check=await Collection.findOne({name:req.body.name})

        if(check){
            res.send("user already exist")
        }

        else{
            const token=jwt.sign({name:req.body.name},"helloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapphelloandwelcometomyapp")

            res.cookie("jwt",token,{
                maxAge:600000,
                httpOnly:true
            })

            const data={
                name:req.body.name,
                password:await hashPass(req.body.password),
                token:token
            }

            await Collection.insertMany([data])

            res.render("home",{name:req.body.name})
        }
    }
    catch{

        res.send("wrong details")

    }
})
app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/home",(req,res)=>{
    res.render("home")
})
app.get("/6day",(req,res)=>{
    res.render("6day")
})
app.get("/5day",(req,res)=>{
    res.render("5day")
})
app.get("/4day",(req,res)=>{
    res.render("4day")
})
app.get("/3day",(req,res)=>{
    res.render("3day")
})
app.get("/exercises",(req,res)=>{
    res.render("exercises")
})
app.get("/progresstrack",(req,res)=>{
    res.render("progresstrack")
})
app.get("/push",(req,res)=>{
    res.render("push")
})
app.get("/gym",(req,res)=>{
    res.render("gym")
})
app.get("/calisthenics",(req,res)=>{
    res.render("calisthenics")
})
app.get("/abdominals",(req,res)=>{
    res.render("abdominals")
})
app.get("/obliques",(req,res)=>{
    res.render("obliques")
})
app.get("/chest",(req,res)=>{
    res.render("chest")
})
app.get("/store",(req,res)=>{
    res.render("store")
})
app.get("/Profile",(req,res)=>{
    res.render("Profile")
})
app.get("/more",(req,res)=>{
    res.render("more")
})
app.get("/brucelee_challenge",(req,res)=>{
    res.render("brucelee_challenge")
})
app.get("/bruceleeroutine",(req,res)=>{
    res.render("bruceleeroutine")
})
app.get("/arnold_challenge",(req,res)=>{
    res.render("arnold_challenge")
})
app.get("/conor_challenge",(req,res)=>{
    res.render("conor_challenge")
})
app.get("/bmr",(req,res)=>{
    res.render("bmr")
})
app.get("/biceps",(req,res)=>{
    res.render("biceps")
})
app.get("/shoulder",(req,res)=>{
    res.render("shoulder")
})
app.get("/cardio",(req,res)=>{
    res.render("cardio")
})
app.get("/challenges",(req,res)=>{
    res.render("challenges")
})
app.get("/pull",(req,res)=>{
    res.render("pull")
})
app.get("/legs",(req,res)=>{
    res.render("legs")
})
app.get("/rest",(req,res)=>{
    res.render("rest")
})
app.get("/fullbody",(req,res)=>{
    res.render("fullbody")
})
app.get("/upperbody",(req,res)=>{
    res.render("upperbody")
})
app.get("/lowerbody",(req,res)=>{
    res.render("lowerbody")
})
app.get("/cablecrunches",(req,res)=>{
    res.render("cablecrunches")
})
app.get("/abcrunchmachine",(req,res)=>{
    res.render("abcrunchmachine")
})
app.get("/hanginglegraises",(req,res)=>{
    res.render("hanginglegraises")
})
app.get("/declinecrunches",(req,res)=>{
    res.render("declinecrunches")
})
app.get("/toetobar",(req,res)=>{
    res.render("toetobar")
})
app.get("/quads",(req,res)=>{
    res.render("quads")
})
app.get("/calves",(req,res)=>{
    res.render("calves")
})
app.get("/traps",(req,res)=>{
    res.render("traps")
})
app.get("/lats",(req,res)=>{
    res.render("lats")
})
app.get("/hamstring",(req,res)=>{
    res.render("hamstring")
})
app.get("/butt",(req,res)=>{
    res.render("butt")
})
app.get("/lowerback",(req,res)=>{
    res.render("lowerback")
})
app.get("/triceps",(req,res)=>{
    res.render("triceps")
})
app.get("/forearms",(req,res)=>{
    res.render("forearms")
})
app.get("/abs_cal",(req,res)=>{
    res.render("abs_cal")
})
app.get("/obliq_cal",(req,res)=>{
    res.render("obliq_cal")
})
app.get("/chest_cal",(req,res)=>{
    res.render("chest_cal")
})
app.get("/shoulder_cal",(req,res)=>{
    res.render("shoulder_cal")
})
app.get("/biceps_cal",(req,res)=>{
    res.render("biceps_cal")
})
app.get("/glutes_cal",(req,res)=>{
    res.render("glutes_cal")
})

app.post("/login",async(req,res)=>{
    try{
        const check=await Collection.findOne({name:req.body.name})
        const passCheck=await compare(req.body.password,check.password)

        if(check && passCheck){
            res.cookie("jwt",check.token,{
                maxAge:600000,
                httpOnly:true
            })

            res.render("home",{name:req.body.name})
        }

        else{
            res.send("wrong details")
        }
    }
    catch{

        res.send("wrong details")

    }
})



app.listen(2000,()=>{
    console.log("port connected")
})