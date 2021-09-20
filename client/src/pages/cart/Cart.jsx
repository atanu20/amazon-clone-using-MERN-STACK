import React,{useEffect, useState,useRef,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import './Cart.css'
import CartItem from './CartItem'
import axios from 'axios'
import { useHistory } from 'react-router'
import { DataContext } from '../../context/DataContext'

const Cart = () => {
    const his=useHistory()
    const timeout = useRef(null)
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(DataContext);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState("");


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

useEffect(() => {
    if(cart.Totalitems>0) {
        getPro() 
    } 
}, []);

// console.log(products)

const handleDelete = (productId) => {
    const _cart = {...cart};
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.Totalitems -= qty;
    setCart(_cart);
    const updatedProductsList = products.filter((product) => product._id !== productId);
    setProducts(updatedProductsList);
}

const increment = (productId) => {
    const existingQty = cart.items[productId];
    if (existingQty === 5) {
        alert("Quantity never be greater than 5")
        return;
   }
    const _cart = {...cart};
    _cart.items[productId] = existingQty + 1;
    _cart.Totalitems += 1;
    setCart(_cart);
}

const decrement = (productId) => {
    const existingQty = cart.items[productId];
   if (existingQty === 1) {
    alert("Quantity never be less than 1")
        return;
   }
    const _cart = {...cart};
    _cart.items[productId] = existingQty - 1;
    _cart.Totalitems -= 1;
    setCart(_cart);
}

const getQty = (productId) => {
    return cart.items[productId];
}
const getSum = (productId, price) => {
    const sum = price * getQty(productId);
   
    
    return sum;
}

// const getSum = ( price,qty) => {
//     const sum=price*qty
//     total += sum;
    
// }

// console.log(Object.keys(cart.items).length)
let total=0;
useEffect(()=>{
    
        products.forEach(el => {

            
            total = total +( el.price * getQty(el._id) )
            // console.log(total)
        });
        setAmount(total)
    
    
},[products])
// console.log(total)

if(!cart.Totalitems && !products.length )
{
    return(
        <>
        <div className="container p-5">
            <div className="p-5">
                <h3>Sorry!! There are no Cart Items</h3>
                <button className="btn btn-warning" onClick={()=>his.push('/products')}>Continue Shopping</button>
            </div>

        </div>

        </>
    )
}





    return (
        <>
        <div className="cart">
            <div className="container-fluid">
                <h3 className="p-2">Your <span style={{color:'#F7B030'}}>Cart</span> Items</h3>
                <div className="row">
                    {
                        products?.map((val,ind)=>{
                            return(
                                <>
                               
                            <CartItem
                            key={ind}
                            image={val.image}
                            title={val.title}
                            pid={val._id}
                            price={val.price}
                            handleDelete={handleDelete}
                            increment={increment}
                            decrement={decrement}
                            getQty={getQty}
                            getSum={getSum}
                            
                            />













                                </>
                            )
                        })
                    }
                    
                   
                    
                </div>
                <div className="text-right p-3">
                    <h3>Sub Total : {amount}</h3>
                    <h4>Total Amount With Delivery : {
                        amount > 1000 ? amount  + 100 : amount                        }  </h4>
                    <NavLink to="/cart-details" className="btn btn-warning">Continue</NavLink>
                    
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Cart
