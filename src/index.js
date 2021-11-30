const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require('./models/user')
const Request= require('./models/request')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')
require('./db/mongoose')

const app = express()
const port  = process.env.port || 3000


const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath))

app.get('/Blood-Bud',auth,(req,res)=>{
    res.render('home')
})

app.get('/register',(req,res)=>{
   res.render('register')
})

app.post('/register',async (req,res)=>{
    const userData = {
        name:req.body.name,
        email: req.body.email,
        userid:req.body.userid,
        password:req.body.password,
        age:req.body.age,
        blood_group:req.body.blood_group,
        phone:req.body.phone,
        state:req.body.state,
        pincode:req.body.pincode,
        city:req.body.city,
        aadhar:req.body.aadhar
    }
    
    try{
        const user = new User(userData)
        if(!user){
            return res.status(400).send("Invalid data")
        }
        // console.log(user)
        await user.save();
        const token = await user.generateAuthToken()
        res.cookie('access_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
        })
        res.redirect(201,'/Blood-Bud')
       
        
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/Blood-Bud/request',auth,async (req,res)=>{
    res.render('request')
})

app.post('/Blood-Bud/request',auth,async(req,res)=>{
    const requestInfo = {
        userId: req.user._id.toString(),
        userName: req.user.name,
        blood_type: req.body.BG,
        blood_bank: req.body.blood_bank
    }
    try{
        const request = new Request(requestInfo)
        if(!request){
            return res.status(403).send("Invalid request")
        }
        await request.save()
        res.redirect(201,'/Blood-Bud/request')
    }catch(e){
        res.status(500).send()
    }
})

app.get('/login', (req,res)=>{
    try{
        res.render('login',
           {msg:req.query.msg}
        )
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/login',async (req,res)=>{
    
    try{
        const user = await User.findByCredentials(req.body.userid,req.body.password)
        if(!user){
            return res.redirect('/login?msg=Invalid userid or password')
        }
        const token = await user.generateAuthToken()
        res.cookie('access_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=== "production",
        })
        res.redirect(302,'/Blood-Bud')
    }
    catch(e){
        res.status(500).send(e)
    }
})



app.get('/logout',auth,async (req,res)=>{
    try{
 
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.clearCookie('access_token')
        res.render('logout')
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
 })

app.get('/Blood-Bud/FAQs',auth,(req,res)=>{
    res.render('FAQ')
})

app.get('/Blood-Bud/user/history',auth,async (req,res)=>{
    const userid = req.user._id.toString()
    const requests =await Request.find({userId:userid})
    console.log(requests.length)
    res.render('history',{
        requests: requests
    })
})

app.listen(port,()=>{
    console.log("server is running!")
})