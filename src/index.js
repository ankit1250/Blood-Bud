const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require('./models/user')
require('./db/mongoose')

const app = express()
const port  = process.env.port || 3000


const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath))

app.get('/Blood-Bud',(req,res)=>{
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
       
        
    }catch(e){
        res.status(500).send(e)
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
        
        res.redirect(302,'/Blood-Bud')
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log("server is running!")
})