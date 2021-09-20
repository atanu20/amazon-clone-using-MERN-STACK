const router = require("express").Router();
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const bcrypt = require('bcrypt');
const userDetailsTable=require('../models/userDetails')
const AddressTable =require('../models/Address')



router.post("/register", async (req,res)=>{
   
    try{
        const exist=await userDetailsTable.findOne({email:req.body.email})
        if(exist)
        {
            res.send({msg:"email already exist"})
        }
        else{
            const password=req.body.password;
            bcrypt.hash(password,saltRounds,async (err,hash)=>{
                const usedet=new userDetailsTable({name:req.body.name,email:req.body.email,password:hash})
                
                 
               await usedet.save();
            res.status(201).send({status:true})
            })

            
        }
        

    }catch(err){
        console.log(err)
    }
})

router.post("/login",async(req,res)=>{
    try{
     const email=req.body.email;
     const password=req.body.password;
     const exist=await userDetailsTable.findOne({email:email})
     
     if(exist)
     {
     
         bcrypt.compare(password, exist.password,  (errr,response)=>{
             if(response)
             {
                
                const id=exist._id;
             
                const token=jwt.sign({id},"atanu_amazon_clone",{
                    expiresIn:60*60*24,
                })
             
                res.status(200).send({login:true,token:token,name:exist.name,userID:exist._id,userEmail:exist.email})
                 // res.send({login:true,username:exist.username})
 
             }
             else{
              res.send({login:false,msg:"Wrong Password"});
             
             }
         })
         
     }else{
         res.send({login:false,msg:"invalid email"})
     }
 
 
    }catch(err){
     console.log(err)
    }
 })

 const verifyJwt=(req,res,next)=>{
    const token=req.headers["x-access-token"]

    if(!token)
    {
        res.send({login:false,msg:"need token"});
    }
    else{
        jwt.verify(token,'atanu_amazon_clone',(err,decoded)=>{
            if(err)
            {
                res.send({login:false,msg:"need to token"});
            }
            else{
                req.userID=decoded.id;
                next();
            }
        })
    }
}

router.get("/isAuth",verifyJwt,(req,res)=>{
    res.send({login:true,msg:"done"});
})


router.post("/add_address",async (req,res)=>{
    try{
        const data=new AddressTable(req.body)
        await data.save();
        res.send({status:true})
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get('/getaddress/:uid',async(req,res)=>{
    try{
        const data=await AddressTable.find({userId:req.params.uid})
        
        res.send(data)
    }
    catch(err)
    {
        console.log(err)
    }

})
router.post('/edit_address',async(req,res)=>{
    try{
        const ress= await AddressTable.findByIdAndUpdate(req.body.addressId, { 
            phone:req.body.phone,
            address:req.body.address,
            

        },{ new: true });
        res.send({status:true})
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router;