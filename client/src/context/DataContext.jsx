import React, { createContext ,useState ,useEffect } from 'react'
import { getCart,storeCart } from '../data/LocalStorage' 

export const DataContext=createContext()

const getLocalItmes = () => {
    let list = localStorage.getItem('cart');
    // console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return {};
    }
}

export const ConText=(props)=>{
    const [cart, setCart] = useState(getLocalItmes())
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
     }, [cart]);
     
    // useEffect(() => {
    //     getCart().then(cart => {
           
    //       setCart(JSON.parse(cart));
          
    //     });
    //     // console.log(cart)
    //   }, []);
      
    //   useEffect(() => {
    //       storeCart(JSON.stringify(cart));
    //   }, [cart]);

    
    
   

    return(
        <>
        <DataContext.Provider value={{cart,setCart}}>
        {props.children}
        </DataContext.Provider>

        </>
    )
}