import React from 'react'
import './Top_links.css'
import { NavLink } from 'react-router-dom'
import { TopLinks } from '../../data/topLinks'

const Top_links = () => {
    const amazonname=localStorage.getItem('AmazonUser')
    return (
        <>
        <div className="top_links">
            <div className="container">
                {
                    amazonname ? <h2 className="">Hi <span style={{color:'#F7B030'}}>{amazonname.split(' ')[0]}</span></h2>:
                    <h2 className="">Hi <span style={{color:'#F7B030'}}>User</span></h2>
                }
            
            <p>Top Links For You</p>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-6 mb-3 top-card">
                        <NavLink to="/">
                        <div className="card text-center p-2">
                            <img src="assets/top/Order_delivered.svg" alt="order" className="order_img" />
                            <p className="p-2">Your Orders</p>
                        </div>
                        </NavLink>
                    </div>
                    {
                        TopLinks?.map((val,ind)=>{
                            return(
                                <>
                                <div key={ind} className="col-lg-3 col-md-4 col-6 mb-3 top-card">
                        <NavLink to={"/category/"+val.url+"/"+val.id}>
                        <div className="card text-center p-2">
                            <img src={val.image} alt={val.category} className="order_img" />
                            <p className="p-2">{val.category}</p>
                        </div>
                        </NavLink>
                    </div>

                                </>
                            )
                        })
                    }
                    
                    
                    

                </div>
            </div>

        </div>
            
        </>
    )
}

export default Top_links
