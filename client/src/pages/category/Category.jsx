import React,{useEffect, useState,useRef} from 'react'
import { useHistory, useParams } from 'react-router'
import Products from '../../component/products/Products'
import axios from 'axios'

import './Category.css'

const Category = () => {
const {id}=useParams()
const [pdata, setPdata] = useState([])
const [select, setSelect] = useState("")

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


const getdata=async()=>{
    const res=await axios.get(`/pdt/get_products/${id}`)
    setPdata(res.data.sort((p1, p2) => {
        return new Date(p2.date) - new Date(p1.date);
      }))
}

useEffect(() => {
   getdata()
   setSelect("all")
}, [id])

const sortData= async (sort)=>{
    const res=await axios.get(`/pdt/sort_cat/${sort}/${id}`)
    setPdata(res.data)
}


    const sortHandel=(e)=>{
        const sort=e.target.value
        setSelect(sort)
        if(sort==='all')
        {
            getdata()
        }
        else {
            sortData(sort)
        }

       }

    return (
        <>
            <div className="category-page">
                
                <div className="container-fluid">
                <div className="filter ml-auto">
                       <div class="form-group">
                            
                            <select class="form-control" value={select} onChange={sortHandel} >
                            <option  value="all">All</option>
                        <option  value="200">less then 200</option>
                        <option  value="200_500">200-500</option>
                        <option  value="500_1000">500-1000</option>
                            </select>
                        </div>
                      
                    </div>
                       
                    <Products pdata={pdata} />

                </div>
            </div>

        </>
    )
}

export default Category
