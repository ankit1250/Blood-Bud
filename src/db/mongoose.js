const mongoose = require('mongoose')

mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})