import React,{useState,useEffect,useRef} from 'react'
import Products from '../../component/products/Products'

import SliderHome from '../../component/slider/SliderHome'
import Top_links from '../../component/top_links/Top_links'
import Footer from '../../component/footer/Footer'
import './Home.css'
import axios from 'axios'
import {useHistory } from 'react-router-dom'



const Home = () => {

    const [pdata, setPData] = useState([])
    const timeout = useRef(null)
    const his=useHistory()
    

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


     
     const getdata=async()=>{
         const res=await axios.get('/pdt/get_products_limit')
         setPData(res.data)
     }
     useEffect(() => {
         getdata()
     }, [])
   
    return (
        <>
        <SliderHome/>
        <Top_links/>
        
        <Products pdata={pdata}/>
        <Footer/>

            
        </>
    )
}

export default Home
