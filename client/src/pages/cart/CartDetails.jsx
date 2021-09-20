import React,{useEffect, useState,useRef,useContext} from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import axios from 'axios'
import { DataContext } from '../../context/DataContext';
const CartDetails = () => {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(DataContext);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");
    const AmazonEmail=localStorage.getItem('AmazonEmail')
const AmazonUserId=localStorage.getItem('AmazonUserId')
const AmazonUser=localStorage.getItem('AmazonUser')
    
    const [email, setEmail] = useState(AmazonEmail)
    const [phone, setPhone] = useState("")
    const [addr, setAddr] = useState("")
    const [yourAddress, setYourAddress] = useState([])
    const [inputAddres, setInputAddres] = useState("")
    const [showaddress,setShowaddress]=useState(false)
    const [payment, setPayment] = useState("")
    const [UserId,setUserId]= useState("")

    const his=useHistory()

   
    const timeout = useRef(null)
 const checkAuth=()=>{
    axios.get("/auth/isAuth",{
        headers:{
         "x-access-token":localStorage.getItem("Amazontoken")
        }
    }).then((response)=>{
     //  console.log()
     if(!response.data.login)
     {
         his.push("/login");
     }
    })
 
 }

 useEffect(()=>{
     timeout.current=setTimeout(checkAuth,10)
     return function(){
         if(timeout.current)
         {
             clearTimeout(timeout.current)
         }
     }
    
    

 },[])






 const getPro=()=>{
    //  console.log(JSON.stringify({ ids: Object.keys(cart.items)}))
     fetch('/pdt/get_cart_products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: Object.keys(cart.items)})
    }).then(res => res.json())
    .then(products => {
        setProducts(products)
        setShow(true)
    })
}

 useEffect(() => {
    if(cart.Totalitems>0) {
        getPro() 
    }   
}, [cart]);



const getQty = (productId) => {
    return cart.items[productId];
}
const getSum = (productId, price) => {
    const sum = price * getQty(productId);
   
    
    return sum;
}

let total=0;
useEffect(()=>{
    
        products.forEach(el => {

            
            total = total +( el.price * getQty(el._id) )
            // console.log(total)
        });
        setAmount(total)
    
    
},[products])

const getaddress=async ()=>{
    
   
    
       const res=await axios.get(`/auth/getaddress/${AmazonUserId}`)
      
       setYourAddress(res.data)
    //    console.log(res.data)

    }

    const onSub=async (e)=>{
        e.preventDefault()
       const data={
           userId:AmazonUserId,
           phone:phone,
           address:addr

       }
       const res= await axios.post('/auth/add_address',data)
       
        setShowaddress(false)
        
       
       getaddress()
        }



        useEffect(() => {
            if(cart.Totalitems>0) {
                getPro() 
                getaddress()
            } 
           
        }, []);

        const OnBuyNow=async (e)=>{
            e.preventDefault()
           
const data={
    userid:AmazonUserId,
    totalprice:amount,    
    paymentmode:payment,
    paymentemail:AmazonEmail,
    products:products,
    cart:cart
}
            
const res=await axios.post(`/order/add_order`,data)
//  console.log(res.data)

  if(res.data.success)
  {
     
     localStorage.setItem('Amazonlongid',res.data.payment_request.id)  
    //  setCart({})
    //  his.push(`/account`)
  }else{
      console.log("order not placed")
  }
  window.open(res.data.payment_request.longurl,'_self')
            
            }





            if(!cart.Totalitems && !show)
            {
                return(
                    <>
                    <div className="container p-5">
                        <div className="p-5">
                            <h3>Sorry!! There is no Cart Items</h3>
                            <button className="btn btn-warning" onClick={()=>his.push('/products')}>Continue Shopping</button>
                        </div>
            
                    </div>
            
                    </>
                )
            }
            




    return (
        <>
        <div className="cart cartdet">
            <div className="container">
            <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Details</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Total Amount</th>
          
          
         
        </tr>
      </thead>
      <tbody>
          {
              products?.map((val,ind)=>{
                  return(
                      <>
                       <tr>
          <td>
              <NavLink to={`/product/${val._id}`}>
              <img src={val.image} alt={val.title} className="cart_Det" /> <br />
              <small>{val.title}</small>
              </NavLink>
          </td>
          <td>  ₹ {val.price}</td>
          <td>{getQty(val._id)}</td>
          <td>₹ {getSum(val._id,val.price)}</td>
          
        </tr>

                      </>
                  )
              })
          }
     
       
        


      </tbody>
    </table>

  </div>

<div className="text-right p-3">
<h3>Sub Total : {amount}</h3>
                    <h4>Total Amount With Delivery : {
                        amount > 1000 ? amount  + 100 : amount                        }  </h4>
                    
</div>


            </div>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                    {
                                showaddress && (
                                    <>
                                    <div className="card">
                                <form onSubmit={onSub}>
                                    
                                    <div class="form-group">
                                        <label >Email:</label>
                                        <input type="text" class="form-control" name='email' placeholder="Enter Email" readOnly value={email}  onChange={(e)=>setEmail(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label >Phone:</label>
                                        <input type="tel" class="form-control" name='phone' placeholder="Enter Phone" value={phone}  onChange={(e)=>setPhone(e.target.value)} required />
                                    </div>

                                    <div class="form-group">
                                        <label >Full Address:</label>

                                        <textarea name="address" id="" class="form-control" rows="3" placeholder="Enter Full Address" value={addr}  onChange={(e)=>setAddr(e.target.value)} required></textarea>
                                    </div>



                                    <div class="text-center mb-5">
                                        <input type="submit" class="btn btn-warning pt-2 pb-2 pl-5 pr-5" value="Add Address" />
                                    </div>
                                </form>
                            </div>

                                    </>
                                )
                            }
                            
                    </div>
                    <div className="col-md-6 col-12 mx-auto mb-3">
                            <div className="card">
                                <h3>Add Recived Address</h3>
                                <br />
                                {
                                    yourAddress.length ? (
                                        <>
                                         <form onSubmit={OnBuyNow}>
                                   
                                   {
                                       yourAddress.map((val,ind)=>{
                                           return(
                                               <>
                                               <button type="button" className="btn btn-warning" onClick={()=>his.push(`/edit_address/${val._id}`)}>Edit Address</button>
                                                <div class="form-check ">
                               <label class="form-check-label p-1 mb-2">
                                                <input type="radio" class="form-check-input" name="address" value={val._id} onChange={(e)=>setInputAddres(e.target.value)} required />
                                   {AmazonUser}<br /> {AmazonEmail} <br /> {val.phone} <br /> {val.address}
                                   </label>
                           </div>
                                               </>
                                           )
                                       })
                                   }
                                  


                              

                           <h4>Choose payment option</h4>
                          
                          
                           <div class="form-check-inline">
                               <label class="form-check-label">
                                   <input type="radio" class="form-check-input" name="payment" value="online" onChange={(e)=>setPayment(e.target.value)} required />Online
                               </label>
                           </div>


                           <div class="text-center m-3">
                               <input type="submit" class="btn btn-warning pt-2 pb-2 pl-5 pr-5" value="Buy Now" />
                           </div>




                       </form>

                                        </>
                                    ):
                                    <button className="btn btn-warning" onClick={()=>setShowaddress(true)}>Add Address</button>
                                }
                               
                            </div>
                        </div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default CartDetails
