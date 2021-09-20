import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'



const Footer = () => {
    return (
        <>
        <div className="footer" style={{
            background:"linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('http://localhost:4001/assets/footer.jpg')",
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
        }}>
           <NavLink to="/products" className="btn btn-warning">Continue Shopping</NavLink>
            <h4 className="text-white p-3">Shop on the <span style={{color:'#F7B030'}}>Your Shop </span>| Fast, convenient and secure | Over 17 crore products in your pocket</h4>

        </div>
            
        </>
    )
}

export default Footer
