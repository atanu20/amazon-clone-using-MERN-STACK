import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'

import { DataContext } from '../../context/DataContext';

const CartItem = ({pid,image,title,price,handleDelete,increment,decrement,getQty,getSum}) => {
    const { cart, setCart } = useContext(DataContext);




    
    return (
        <>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 cartitem">
                        <div className="card p-2">
                            <img src={image} alt={title} className="cart_img" />
                            <div className="p-2">
                               <NavLink to={`/product/${pid}`}> <small>{title}</small></NavLink>
                              
                            </div>
                            <div className="price_cart">
                               <small> price: ₹ {price} x {getQty(pid)}</small>
                               <small> ₹ {getSum(pid,price)}</small>
                            </div>
                            <div className="price_cart pt-2">
                                <button className="btn btn-danger" onClick={()=>handleDelete(pid)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                <div className="pr-3">
                                    <div className="row">
                                    <button className="btn btn-danger" onClick={()=>decrement(pid)}><i class="fa fa-minus" aria-hidden="true"></i></button>
                                    <input className="input_cart pl-2" type="text" value={getQty(pid)} readOnly size="5"/>
                                    <button className="btn btn-danger" onClick={()=>increment(pid)}><i class="fa fa-plus" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
        </>
    )
}

export default CartItem
