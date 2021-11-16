const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/Blood_Bank',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    userid:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    blood_group:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true,
        validate(value){
          if(!validator.isMobilePhone(value)){
              throw new Error('Phone no. is not valid')
          }
        }
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:Number,
        reqiured:true        
    },
    city:{
        type:String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    },
    history:{
        type:String
    }
})

userSchema.statics.findByCredentials = async (userid,password)=>{
    try{

        const user = await User.findOne({userid})
        if(!user){
                throw new Error("Unable to login")
        }
    
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error("Unable to login")
        }
    }catch(e){
        return null
    }

    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User