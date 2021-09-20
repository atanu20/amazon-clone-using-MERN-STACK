import React,{useEffect, useState,useRef} from 'react'
import { NavLink, useHistory,useParams } from 'react-router-dom'
import axios from 'axios'
import './Account.css'
const OrderDetails = () => {
    const [order, setOrder] = useState([])
    const timeout = useRef(null)
    const his= useHistory()
    const AmazonUserId=localStorage.getItem('AmazonUserId')
    const {id}=useParams()
   
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
        
        const res=await axios.get(`/order/getmy_order_det/${id}`)
        // console.log(res.data)
        setOrder(res.data)
    }

    useEffect(()=>{
       
       
        getOrderDetails()
    },[])
    if(!order.length)
    {
        return (
            <>
            <div className="container p-5">
           

               <h2>Data loading ...</h2>
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
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order Date</th>
                                        <th>Details</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.map((val,ind)=>{
                                            return(
                                                <>
                                                <tr key={ind}>
                                        <td>{ind+1}</td>
                                        <td >

                                            {
                                                new Date(val.date).toDateString()
                                            }
                                        </td>
                                        
                                        <td>
                                        <NavLink to={`/product/${val.product_id}`}>
              <img src={val.product_img} alt={val.product_title} className="cart_Det" /> <br />
              <small>{val.product_title}</small>
              </NavLink>
                                        </td>
                                        <td>
                                            {
                                                val.product_price
                                            }
                                        </td>
                                        <td>₹ {val.product_qty}</td>
                                       



                                    </tr>

                                                </>
                                            )
                                        })

                                    }
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
            </div>
        </div>
            
        </>
    )
}

export default OrderDetails
