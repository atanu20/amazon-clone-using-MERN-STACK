import axios from 'axios'
import React, { useRef,useState, useEffect,useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { DataContext } from '../../context/DataContext'

const ProductDetails = () => {
    const { id } = useParams()
    const [pdata, setPdata] = useState([])
    // const [qtydetails, setQtydetails] = useState("1")
    const [isAdding, setIsAdding] = useState(false);
   const {cart,setCart} = useContext(DataContext)

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


    const getPBYId = async () => {
        const res = await axios.get(`/pdt/get_product/${id}`)
        setPdata(res.data)
    }
    useEffect(() => {
        getPBYId()
    }, [id])





const AddToCart=()=>{
    

    let GlobalCart={...cart}
    if(!GlobalCart.items){
        GlobalCart.items={}
    }
    if(GlobalCart.items[id])
    {
        GlobalCart.items[id] += 1;
    }
    else{
        GlobalCart.items[id] = 1;
    }
    if(!GlobalCart.Totalitems)
    {
        GlobalCart.Totalitems = 0
    }
    
        GlobalCart.Totalitems += 1
    

    setCart(GlobalCart)
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false);
    }, 1000);
    


    // console.log(cdata)
}


// console.log(cart)


    if(!pdata.title)
    {
        return(
            <>
            <h3 className="p-5 text-center">Loading...</h3>
            </>
        )
    }
    return (
        <>
            <div className="category-page">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 col-12 mb-3">
                            <img src={pdata.image} alt={pdata.title} className="pd_img" />

                        </div>
                        <div className="col-md-6 col-12 mb-3">
                            <h3>{pdata.title}</h3>
                            <hr />
                            <h5>Price : <span style={{ color: '#F7B030' }}>₹ {pdata.price}</span></h5>
                            <p>{pdata.description}</p>

                           

                            {/* <div className="row p-3">
                               
                                <div class="form-group w-50">
                                    <label htmlFor="">Qty:</label>
                                    <select class="form-control" onChange={(e)=>setQtydetails(e.target.value)}>

                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>



                            </div> */}

                            <div className="text-right">
                                <button className={isAdding ?"btn btn-success dis" : "btn btn-warning"}   onClick={AddToCart}>{isAdding ? "Adding..." :"Add To Cart" } </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ProductDetails
