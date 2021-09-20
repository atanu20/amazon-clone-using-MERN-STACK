import React,{useEffect, useState,useRef} from 'react'
import {  useHistory } from 'react-router-dom'
import axios from 'axios'
import { io } from "socket.io-client";

const OrderTracker = () => {

    const [order, setOrder] = useState([])
    const [orderId, setOrderId] = useState("")
    const [socketorderId, setSocketOrderId] = useState([])
    const [orderIdData, setOrderIdData] = useState([])
    const timeout = useRef(null)
    const socket = useRef();
    const his= useHistory()
    const AmazonUserId=localStorage.getItem('AmazonUserId')
   
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
    const getOrderDetails=async()=>{
        
        const res=await axios.get(`/order/getmy_order/${AmazonUserId}`)
        // console.log(res.data)
        setOrder(res.data.sort((p1, p2) => {
            return new Date(p2.date) - new Date(p1.date);
          }))
    }

    useEffect(()=>{
       
       
        getOrderDetails()
    },[])



const OrderHandel=async(e)=>{
    setOrderId(e.target.value)
    const res=await axios.get(`/order/order-tracker/${e.target.value}`)
    
    setOrderIdData(res.data)
}
// console.log(socketorderId)
const socketOrder=async(oid)=>{
   
    const res=await axios.get(`/order/order-tracker/${oid}`)
    // console.log(res.data)
     setOrderIdData(res.data)
}








useEffect(() => {
    socket.current = io("http://localhost:7000/");

}, []);
useEffect(() => {
  socket.current?.emit("addUser", AmazonUserId);
  socket.current?.on("getUsers", async (users) => {
    //  console.log(users)
  });
  socket.current?.on("getUpdate", (data) => {
    // console.log(data)
    if (data) {
        // console.log(data.receiverorderid + "hi" )
        
        
        if( AmazonUserId === data.receiverid )
        {
            setSocketOrderId({
                receiverid:data.receiverid,
                receiverorderid:data.receiverorderid
            })
        }
    }

   });
}, []);

useEffect(() => {
    if(socketorderId)
    {
        if(socketorderId.receiverorderid === orderId)
  {
    socketOrder(socketorderId.receiverorderid)
  }

    }
  
    
}, [socketorderId])







    if(!order.length)
    {
        return (
            <>
            <div className="container p-5">
           

               <h2>You Not Yet Placed Any Order</h2>
               <button className="btn btn-warning" onClick={()=>his.push('/products')}>Continue Shopping</button>
            </div>

            </>
        )
    }
    return (
        <>
         <div className="account">
            <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-9 col-12 mx-auto">
                    <div className="card p-3">
                        <h3 className="text-center p-2">Track Your Order</h3>
                        <div class="form-group">
  
  <select class="form-control" value={orderId} onChange={OrderHandel}>
  <option value="" selected disabled hidden>Choose OrderId</option>
      {
          order?.map((val,ind)=>{
              return(
                  <>
                  <option key={ind} value={val._id}>{val._id}</option>

                  </>
              )
          })
      }
    
   
  </select>
</div>
                    </div>
                </div>


            </div>
            </div>
            {
                orderId && <div className="container mt-5">
                <div className="row">
                    <div className="col-12 mx-auto">
                    <div className="card p-3">
                    <h5>Order Id <span style={{color:'#F7B030'}}>{orderId}</span></h5>
                    <h5>Delivery Date: <span style={{color:'#F7B030'}}>{new Date(new Date(orderIdData.date).getTime() + 432000000).getDate()}/{new Date(new Date(orderIdData.date).getTime() + 432000000).getMonth()+1}/{new Date(new Date(orderIdData.date).getTime() + 432000000).getFullYear()}</span></h5>
                    <br /><br />
                    {
                        orderIdData.deliverystatus ==="order placed" && <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Processed</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104246/u1AzR7w_nb1zxm.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Order Shipped</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104235/TkPm63y_jkz3b0.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Out for delivery</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Order Delivered</p>
                            </div>

                        </div>
                    </div>
                    }
                    {
                        orderIdData.deliverystatus ==="order shipped" && <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Processed</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104246/u1AzR7w_nb1zxm.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Shipped</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104235/TkPm63y_jkz3b0.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Out for delivery</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Order Delivered</p>
                            </div>

                        </div>
                    </div>
                    }

{
                        orderIdData.deliverystatus ==="out for delivery" && <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Processed</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104246/u1AzR7w_nb1zxm.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Shipped</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104235/TkPm63y_jkz3b0.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Out for delivery</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-circle-o " aria-hidden="true"></i></span> Order Delivered</p>
                            </div>

                        </div>
                    </div>
                    }
                    {
                        orderIdData.deliverystatus ==="order delivered" && <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Processed</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104246/u1AzR7w_nb1zxm.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Shipped</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104235/TkPm63y_jkz3b0.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Out for delivery</p>
                            </div>

                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card p-2 text-center">
                                <img src="https://res.cloudinary.com/du9emrtpi/image/upload/v1632104225/9nnc9Et_u0nq7m.png" alt="" className="trackimg" />
                                <p> <span style={{color:'#F7B030'}}><i class="fa fa-check-circle-o " aria-hidden="true"></i></span> Order Delivered</p>
                            </div>

                        </div>
                    </div>
                    }






                    

                    </div>
                    </div>

                </div>
            </div>
            }
            </div>
            
        </>
    )
}

export default OrderTracker
