const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://ankit123:898686@cluster0.y60mi.mongodb.net/Blood_Bank?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const donateSchema = mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name:{
       type:String,
       required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile_no:{
        type:Number,
        required:true
    },
    alt_mobile:{
        type:Number
    },
    blood_bank:{
        type:String,
        required:true
    },
    blood_type:{
        type:String,
        required:true
    },
    donateStatus:{
        type:String,
        default:"Not Approved",
        required:true
    },
    
},{timestamps:true})

const Donate  = new mongoose.model('Donate',donateSchema)
module.exports = Donate