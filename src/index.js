const path = require('path')
const express = require('express')
const hbs = require('hbs')
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

app.listen(port,()=>{
    console.log("server is running!")
})