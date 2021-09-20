import axios from 'axios'
import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router'
import { DataContext } from '../../context/DataContext'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

const Product = ({pid,image,title}) => {
   const his= useHistory()
   const AmazonUserId=localStorage.getItem('AmazonUserId')
   const {cart,setCart} = useContext(DataContext)

    const addCart=(id)=>{
            let GlobalCart={...cart}
            if(!GlobalCart.items){
                GlobalCart.items={}
            }
            if(GlobalCart.items[id])
            {
                GlobalCart.items[id]+=1;
            }
            else{
                GlobalCart.items[id] =1;
            }
            if(!GlobalCart.Totalitems)
            {
                GlobalCart.Totalitems=0
            }
            GlobalCart.Totalitems+=1

            setCart(GlobalCart)
            
    }
    // console.log(cart)
const notify=(msg)=>{
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
}

    const addWish=async(id)=>{
        // console.log(id)
        const res=await axios.post('/pdt/add_wishlist',{
            productID:id,
            userID:AmazonUserId
        })
if(res.data.status){
    notify("This Product added to Your wishlist")
}
else{
    notify("This Product already Present into Your wishlist")
}
        

    }
    return (
        <>
        <ToastContainer />
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                            
                            <div className="card p-3">
                                <img src={image} alt={title} className="prd_img" />
                                <div className="titel-up">
                                    <div className="title-b">
                                        <p>{title}</p>
                                    </div>
                                </div>
                                <div className="pro_action">
                                    <div className="ac_box">
                                        <div className="p_cart" onClick={()=>addCart(pid)}>
                                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                        </div>
                                        <div className="p_cart" onClick={()=>his.push(`/product/${pid}`)}>
                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                        </div>
                                        <div className="p_cart" onClick={()=>addWish(pid)}>
                                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        
                    </div>
            
        </>
    )
}

export default Product
