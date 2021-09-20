import React,{useState,useEffect,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from "react-avatar"
import './Navbar.css'
import axios from 'axios'
import { DataContext } from '../../context/DataContext'

const path='http://localhost:4001/'

const color=['#a5e6a8','#ebbccc','#e6c0aa','#b2d1ed']

const Navbar = () => {
    const [show, setShow] = useState(false)
    const [cat, setCat] = useState([])
    const [products, setProducts] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    const { cart } = useContext(DataContext);
    
    const amazonname=localStorage.getItem('AmazonUser')
    

    const getcat=async()=>{
        const res=await axios.get('/catg/get_category')
        setCat(res.data)
        // console.log(res.data)
    }
    useEffect(() => {
        getcat()
    }, [])

const logout=()=>{
    localStorage.removeItem("AmazonUserId");
        localStorage.removeItem("AmazonEmail");
        localStorage.removeItem("AmazonUser");
        localStorage.removeItem("Amazontoken");
        
        window.location.reload()
}
const getData=async()=>{
    const res=await axios.get('/pdt/get_products')
    // console.log(res.data)
    setProducts(res.data.sort((p1, p2) => {
        return new Date(p2.date) - new Date(p1.date);
      }))
}


useEffect(() => {
getData()
}, [])

const InputHandel=(e)=>{
    setSearch(e.target.value)
    const newFilter = products.filter((value) => {
        return value.title.toLowerCase().includes(e.target.value.toLowerCase()) || value.description.toLowerCase().includes(search.toLowerCase()) ;
      });

      if (e.target.value==="") {
        //   console.log(search)
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
}

const cleardata=()=>{
    setFilteredData([]);
    setSearch("");
}
    return (
        <>
        <div className="fixed-top">

        
        <header className="" >
            <div className="header_wraper">
                <div className="leftnav">
                <i class="fa fa-bars text-white" aria-hidden="true" onClick={()=>setShow(!show)}></i>
               <div className="logo">
              <NavLink to="/">
              <img src={path +"assets/logo.png"} alt="logo" className="logoimg" />
               <span>Your Shop</span>
              </NavLink>
               </div>
                </div>
                <div className="centernav">
               
            <div class="input-group ">
                <input type="text" class="form-control" placeholder="Search Products" value={search} required onChange={InputHandel} />
                <div class="input-group-append">
                {!search ? (
            <button type="button" class="input-group-text btn"><i class="fa fa-search" aria-hidden="true"></i></button>
          ) : (
            <button type="button" class="input-group-text btn" onClick={cleardata}><i class="fa fa-times" aria-hidden="true"></i></button>
          )}
                    
                
                </div>
              </div>
          
                </div>
                <div className="rightnav">
                
                
                <button className="btn btn-light pr-3" onClick={logout}>Logout</button>
                <div className="cartnav">
                <NavLink to="/cart">
                <img src={path +"assets/shopping-cart.png"} alt="cart" className="cartimg" />
                <span className="cartspan">{
                    cart.Totalitems ? cart.Totalitems : 0
                
}</span>
                </NavLink>
                </div>
                
                </div>
            </div>
           
            

        </header>
        <div className="searchbar">
            <div className="header_bot_wraper">
            
            <div class="input-group ">
                <input type="text" class="form-control" placeholder="Search Products"  value={search} required onChange={InputHandel}  />
                <div class="input-group-append">
                    <button type="button" class="input-group-text btn"><i class="fa fa-search" aria-hidden="true"></i></button>
                
                </div>
              </div>
              
          
            </div>
        </div>
        </div>
        <div className="category">
            <div className="category_wraper">
                <div className="leftcat">
                    {
                        cat?.map((val,ind)=>{
                            return(
                                <>
                                <NavLink key={ind} to={"/category/"+val.category+"/"+val._id} className="catnav">{val.category} </NavLink>
                                </>
                            )
                        })
                    }
                    
                    {/* str.replace(/ /g, "+") */}
                    
                    {/* <NavLink to="/" className="catnav">Women's </NavLink>
                    <NavLink to={"/category/"+str.replace(/ /g, "+")+"/"+122} className="catnav">Jewelery</NavLink>
                    <NavLink to="/" className="catnav">Electronics</NavLink> */}
                </div>
                <div className="rightcat">
                    <marquee behavior="" direction="">
                    <small>Get 50% Offer In Every Products | Buy Now!!</small>
                    
                    </marquee>
                    

                </div>
            </div>
        </div>
        <div className="category_ph">
            {
                cat?.map((val,ind)=>{
                    return(
                        <>
                        <NavLink to={"/category/"+val.category+"/"+val._id} key={ind}>
           <div className="cat_imgbox" style={{
               backgroundColor:`${color[ind]}`
           }}>
               <img src={val.image} alt={val.category} className="catgimg" />
               <small>{val.category}</small>
           </div>
           </NavLink>

                        </>
                    )
                })
            }
           
           

        </div>

        {
            show && <div className="sidebar">
            <div className="top-box">
            <i class="fa fa-times" onClick={()=>setShow(!show)}></i>
            {
                amazonname ? <NavLink to="/account">
                <Avatar className="mr-2" name={amazonname} size="45" round={true} /> 
               &nbsp; Hi <span style={{color:'#F7B030'}}>{amazonname.split(' ')[0]}</span>
            </NavLink> : <NavLink to="/">
                     <img src={path +"assets/user.png"} alt="logo"  />
                    &nbsp; Hi <span style={{color:'#F7B030'}}>User</span>
                 </NavLink>
            }
             
                
            </div>
            <div className="alltab">
                 
                <NavLink to="/account" className="tab">
                <i class="fa fa-home" aria-hidden="true"></i>
                 <h5>Account</h5>
                </NavLink>
                <NavLink to="/wishlist" className="tab">
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                 <h5>Wishlist</h5>
                </NavLink>
                <NavLink to="/order-tracker" className="tab">
                <i class="fa fa-truck" aria-hidden="true"></i>
                 <h5>Order Tracker</h5>
                </NavLink>
                <NavLink to="/" className="tab">
                <i class="fa fa-cog" aria-hidden="true"></i>
                 <h5>Setting</h5>
                </NavLink>
                
                

                 
            </div>
 
         </div>
        }
        
        {filteredData.length != 0 && (
        <div className="auto_search">
        <div className="auto_box fixed-top">
             <div className="searchitems">
             {filteredData.slice(0, 25).map((value, key) => {
            return (
                <div className="searchitem" key={key}>
                {/* <NavLink to={`/product/${value._id}`}>
                <img src={value.image} alt="" className="serchimg" />
                <small className="pl-2">{value.title}</small>
                </NavLink> */}
                <a href={`/product/${value._id}`}>
                <img src={value.image} alt="" className="serchimg" />
                <small className="pl-2">{value.title}</small>
                </a>
            </div>
            );
          })}
                 
                 
             </div>
        </div>
    </div>
      )}

       


        </>
    )
}

export default Navbar
