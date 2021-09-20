const router = require("express").Router();
const Insta = require("instamojo-nodejs");
const orderTable=require('../models/Cart')

const orderDetTable=require('../models/orderDetails')


const API_KEY = "test_c06b46e28e2a2b035498f4721c5";

const AUTH_KEY = "test_11139217a60baaae7ff95692cea";

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);


router.post("/add_order",async(req,res)=>{
    try{
        // orderTable
        
        const paymentemail=req.body.paymentemail
        const userid=req.body.userid;
        const amount=req.body.totalprice
        const products=req.body.products
        const cart=req.body.cart
let total=0;

if(amount>1000)
{
    total = amount+100
}
else{
    total =amount
}


        var insta = new Insta.PaymentData();

        const REDIRECT_URL = "http://localhost:4001/success";
     
                 insta.setRedirectUrl(REDIRECT_URL);
                 insta.send_email = "True";
                 insta.send_sms = "False";
                 insta.purpose = "Amazon Clone"; // REQUIRED
                 insta.amount = total;
                 insta.name = "user";
                 insta.email = paymentemail; // REQUIRED
                 Insta.createPayment(insta, async (error, response)=> {
                    if (error) {
                        console.log("something went wrong")
                      } else {

                        const responseData = JSON.parse( response );
			        //  const redirectUrl = responseData.payment_request.longurl;

                     

                     const order=new orderTable({
                        userid:userid,
                        userEmail:paymentemail,
                        amount:total,
                        paymentstatus:responseData.payment_request.status,
                        paymentmode:req.body.paymentmode,                        
                        paymentid:responseData.payment_request.id,
                        deliverystatus:"order placed"


                     })

                     const orderid=await order.save();
// console.log(orderid._id)
// console.log(products)
// console.log(cart)
for(let i=0;i<products.length;i++)
{
 
 

const data =await orderDetTable({
    order_id:orderid._id,
    product_id:products[i]._id,
    product_qty:cart.items[products[i]._id],
    product_price:products[i].price,
    product_img:products[i].image,
    product_title:products[i].title

})

await data.save()


}

res.send(response)
                        

                      }

                 })
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get("/paydetails/:pid",async(req,res)=>{
    try{
         const result=await orderTable.findOne({paymentid:req.params.pid})
             const ress= await orderTable.findByIdAndUpdate(result._id, { 
                paymentstatus:"done"

                

            },{ new: true });

            res.send({status:true})
    }
    catch(err)
    {
        console.log(err)
    }
})




router.get("/getmy_order/:uid",async(req,res)=>{
    try{
        const result=await orderTable.find({userid:req.params.uid , paymentstatus:"done"})
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get("/getmy_order_det/:oid",async(req,res)=>{
    try{
        
        const result=await orderDetTable.find({order_id:req.params.oid })
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get("/order-tracker/:oid",async(req,res)=>{
    try{
        
        const result=await orderTable.findById(req.params.oid)
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get("/all_order",async(req,res)=>{
    try{
        
        const result=await orderTable.find({paymentstatus:"done"})
        res.send(result)
    }
    catch(err)
    {
        console.log(err)
    }
})

router.post("/update_order",async(req,res)=>{
    try{
        const orderid=req.body.orderid
        const deliverystatus=req.body.deliverystatus
        // const result=await orderTable.find({paymentstatus:"done"})
        
        const ress= await orderTable.findByIdAndUpdate(orderid, { 
            deliverystatus:deliverystatus

           

       },{ new: true });

        res.send(ress)
    }
    catch(err)
    {
        console.log(err)
    }
})




module.exports=router