import React from 'react'
import { NavLink } from 'react-router-dom'
import Product from './Product'
import './Products.css'


const Products = ({pdata}) => {
   
    return (
        <>
            <div className="products">
                <div className="container-fluid">
                    <h4 className="p-3">Top <span style={{ color: '#F7B030' }}>Products</span> For You</h4>
                    <div className="row">
                        {
                            pdata?.map((val,ind)=>{
                                return(
                                    <>
                                    <Product
                                    key={ind}
                                    pid={val._id}
                                    image={val.image}
                                    title={val.title}
                                    
                                    
                                    />
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

export default Products
