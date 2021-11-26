const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Blood_Bank',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const requestSchema = new mongoose.Schema({
   
    userId:{
        type:String,
        required:true
    },
    userName:{
       type:String,
       required:true
    },
    blood_bank:{
        type:String,
        required:true
    },
    blood_type:{
        type:String,
        required:true
    },
    requestStatus:{
        type:String,
        default:"Not Approved",
        required:true
    }
})
const Request = new mongoose.model('Request',requestSchema)
module.exports = Request