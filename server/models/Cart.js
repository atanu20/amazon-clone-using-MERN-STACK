const mongoose =require("mongoose")

const orderScheme=new mongoose.Schema({
   
    userid:{
        type:String,
        require:true,
        trim:true
    },
    amount:{
        type:String,
        require:true,
        trim:true
    },
    paymentstatus:{
        type:String,
        require:true,
        trim:true
    },
    paymentmode:{
        type:String,
        require:true,
        trim:true
    },
    userEmail:{
        type:String,
        require:true,
        trim:true
    },
    paymentid:{
        type:String,
        require:true,
        trim:true
    },
    deliverystatus:{
        type:String,
        require:true,
        trim:true
    },
       
    date:{
        type:Date,
        default:Date.now
    }
})

const orderTable=new mongoose.model('order',orderScheme);
module.exports =orderTable