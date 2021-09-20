import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'

const Wish = ({wid,index,productID,date,getOrderDetails}) => {
    const [value, setValue] = useState([])

    const getpbyId=async()=>{
        const res=await axios.get(`/pdt/get_product/${productID}`)
        // console.log(res.data)
        setValue(res.data)
    }
    useEffect(() => {
    getpbyId()
    }, [productID])

    const DeleteWish=async()=>{
        const res= await axios.delete(`/pdt/deletewish/${wid}`)
        if(res.data.status)
        {
            getOrderDetails()
        }
    }
    return (
        <>
            <tr key={index}>
                 <td>{index + 1}</td>
                <td >

                    {
                        new Date(date).toDateString()
                    }
                </td>
                
               
                <td>
                    <NavLink to={`/product/${value._id}`}>
                        <img src={value.image} alt={value.title} className="cart_Det" /> <br />
                        <small>{value.title}</small>
                    </NavLink>
                </td>
                <td>
                ₹ {
                        value.price
                    }
                </td> 
                <td>
                <button className="btn btn-warning" onClick={DeleteWish}>Delete</button>
                </td>




            </tr>


        </>
    )
}

export default Wish
