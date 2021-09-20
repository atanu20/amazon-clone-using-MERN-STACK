const router = require("express").Router();
const catTable=require('../models/Category')

router.post('/add_cat',async(req,res)=>{
    try{
       
        const exist=await catTable.findOne({category:req.body.category})
        if(exist)
        {
            res.send({msg:"Category already exist"})
        }
        else{
            const usedet=new catTable({category:req.body.category})
                
                 
               await usedet.save();
               res.status(201).send({status:true})
        }

    }
    catch(err)
    {
        console.log(err)
    }
})


router.get("/get_category",async(req,res)=>{
    try{
        const result=await catTable.find()
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
    }
})

// router.get("/get_category_limit",async(req,res)=>{
//     try{
//         const result=await catTable.find().limit(3)
//         // const result= categories.aggregate([{$sample: {size: 3}}]).exec();
//         // console.log(result)
//         res.send(result)
        
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// })

module.exports = router;