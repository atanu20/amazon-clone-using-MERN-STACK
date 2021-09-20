import React,{useEffect, useState,useRef} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import './Account.css'
const MyAccount = () => {
    const [order, setOrder] = useState([])
    const timeout = useRef(null)
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
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Order Date</th>
                                        <th>Payment Method</th>
                                        <th>Order Status</th>
                                        <th>Amount</th>
                                        <th>Operation</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.map((val,ind)=>{
                                            return(
                                                <>
                                                <tr key={ind}>
                                        <td>{val._id}</td>
                                        <td >

                                            {
                                                new Date(val.date).toDateString()
                                            }
                                        </td>
                                        
                                        <td>{val.paymentmode}</td>
                                        <td>
                                            {
                                                val.deliverystatus
                                            }
                                        </td>
                                        <td>₹ {val.amount}</td>
                                        <td>
                                            <NavLink to={`/order-details/${val._id}`} className="btn btn-dark">View</NavLink>
                                        </td>



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

export default MyAccount
