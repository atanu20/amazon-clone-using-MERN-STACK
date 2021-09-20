const mongoose =require("mongoose")

const productsDetailsScheme=new mongoose.Schema({
   
    title:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        require:true,
        
        trim:true

    },
    price:{
        type:Number,
        require:true,
        
    },
    image:{
        type:String,
        require:true,
        trim:true
    },
    category:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const productsDetailsTable=new mongoose.model('product',productsDetailsScheme);
module.exports =productsDetailsTable