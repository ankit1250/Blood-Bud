const User = require("../models/user")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const auth = async (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(403).redirect('/login')
    }
    try{
        const decoded = jwt.verify(token,'myhppavilion')
        const user =await User.findOne({_id: decoded._id,'tokens.token':token})
        if(!user){
            return res.redirect('/login')
        }
        req.token = token
        req.user= user
        next()
    }
    catch(e){
        
        res.status(503).redirect('/login')
    }
}
module.exports= auth