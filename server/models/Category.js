const mongoose =require("mongoose")

const catScheme=new mongoose.Schema({
   
    category:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        require:true,
        trim:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

const catTable=new mongoose.model('category',catScheme);
module.exports =catTable