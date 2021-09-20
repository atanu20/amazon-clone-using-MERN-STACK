const mongoose =require("mongoose")

const wishScheme=new mongoose.Schema({
   
    productID:{
        type:String,
        require:true,
        trim:true
    },
    userID:{
        type:String,
        require:true,
        trim:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

const wishTable=new mongoose.model('wishlist',wishScheme);
module.exports =wishTable