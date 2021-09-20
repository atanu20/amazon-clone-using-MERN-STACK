const mongoose =require("mongoose")

const AddressScheme=new mongoose.Schema({
   
    userId:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        require:true,
        trim:true

    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

const AddressTable=new mongoose.model('address',AddressScheme);
module.exports =AddressTable