const router=require('express').Router()
const productsTable=require('../models/Products')
const wishTable=require('../models/Wishlist')

router.post("/add_products",async(req,res)=>{
    try{
        const data=new productsTable(req.body)


        await data.save();
        res.status(201).send({status:true})
    }
    catch(err){
        console.log(err)
    }
})

router.get("/get_products_limit",async(req,res)=>{
    try{
        const data=await productsTable.find().limit(8)


       
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})
router.get("/get_products/:catid",async(req,res)=>{
    try{
        const catid=req.params.catid
        const data=await productsTable.find({category:catid})


       
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/get_products",async(req,res)=>{
    try{
        
        const data=await productsTable.find()


       
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/get_product/:pid",async(req,res)=>{
    try{
        const id=req.params.pid
        const data=await productsTable.findById(id)


    //    console.log(data)
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})


router.post('/get_cart_products',async(req,res)=>{
    try{
        let documents;
        // console.log(req.body.ids)
        
            documents = await productsTable.find({
                _id: { $in: req.body.ids },
            })
        
         res.json(documents);
    }
    catch(err){
        console.log(err)
    }
})

router.get('/sort/:price',async(req,res)=>{
    try{
        
       
        const price=req.params.price;

        if(price==='200'){
            const documents = await productsTable.find({ price: { $lte: 200 }})

            res.json(documents);
    
        }
        else if(price==='200_500')
        {
            const documents = await productsTable.find({ price: { $gt: 200 ,  $lte: 500  }})

            res.json(documents);
        }
        else if(price==='500_1000')
        {
            const documents = await productsTable.find({ price: { $gt: 500  }})

            res.json(documents);
        }


           
        
         
    }
    catch(err){
        console.log(err)
    }
})


router.get('/sort_cat/:price/:pid',async(req,res)=>{
    try{
        
       
        const price=req.params.price;
        const pid=req.params.pid;

        if(price==='200'){
            const documents = await productsTable.find({ category:pid,price: { $lte: 200 }})

            res.json(documents);
    
        }
        else if(price==='200_500')
        {
            const documents = await productsTable.find({ category:pid,price: { $gt: 200 ,  $lte: 500  }})

            res.json(documents);
        }
        else if(price==='500_1000')
        {
            const documents = await productsTable.find({category:pid, price: { $gt: 500  }})

            res.json(documents);
        }


           
        
         
    }
    catch(err){
        console.log(err)
    }
})


router.post("/add_wishlist",async(req,res)=>{
    try{
        const documents = await wishTable.find({productID:req.body.productID , userID: req.body.userID})
        // console.log(documents.length)
        if(documents.length)
        {
            res.send({status:false})
        }
        else{
            const data=new wishTable(req.body)


        await data.save();
        res.status(201).send({status:true})
        }

        
    }
    catch(err){
        console.log(err)
    }
})

router.get("/get_wishlist/:uid",async(req,res)=>{
    try{
        const uid=req.params.uid;
        const data=await wishTable.find({userID:uid})
        res.json(data);
    }
    catch(err){
        console.log(err)
    }
})
router.delete("/deletewish/:id",async(req,res)=>{
    try{
        const id=req.params.id;
    const data=await wishTable.findByIdAndRemove({ _id: id})
    res.json({status:true});
    }
    catch(err){
        console.log(err)
    }  
})


module.exports=router