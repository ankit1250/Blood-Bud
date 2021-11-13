const path = require('path')
const express = require('express')
const hbs = require('hbs')
const blood_banks = require('./utils/blood_bank')
const request = require('request')
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
app.get('/blood_banks',(req,res)=>{
    const url = "https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15?api-key=579b464db66ec23bdd00000129d0b4eb7b284a5e69258ef4eb5b37a5&format=json&offset=0&limit=100&filters["+req.query.key+"]="+req.query.value

    if(!req.query.value){
        res.send("Please enter any location")
    }
    else{
        request({url,json:true},(error,{body})=>{
            if(error){
                res.send("Error")
            }else{
                res.send(body.records)
            }
        })
    }
})
app.listen(port,()=>{
    console.log("server is running!")
})