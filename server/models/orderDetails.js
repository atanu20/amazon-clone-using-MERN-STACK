const mongoose =require("mongoose")

const orderDetScheme=new mongoose.Schema({
   
    order_id:{
        type:String,
        require:true,
        trim:true
    },
    product_id:{
        type:String,
        require:true,
        trim:true
    },
    product_qty:{
        type:String,
        require:true,
        trim:true
    },
    product_price:{
        type:String,
        require:true,
        trim:true
    },
    product_img:{
        type:String,
        require:true,
        trim:true
    },
    product_title:{
        type:String,
        require:true,
        trim:true
    },
    
       
    date:{
        type:Date,
        default:Date.now
    }
})

const orderDetTable=new mongoose.model('orderDetail',orderDetScheme);
module.exports =orderDetTable