import React,{useRef,useEffect,useContext} from 'react'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'
import { DataContext } from '../../context/DataContext';

const Success = () => {
    const {setCart } = useContext(DataContext);
    const his=useHistory()
    const Amazonlongid=localStorage.getItem('Amazonlongid')
    const timeout = useRef(null)
    const loc=useLocation()
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


     useEffect(() => {
        setCart({})
        const paydet=async()=>{
           // console.log(loc.search)
           const str=loc.search;
           const myArr = str.split("=");
         const pyid=myArr[myArr.length-1];
        //  console.log(pyid)
       if(Amazonlongid === pyid)
       {
        const res=  await axios.get(`/order/paydetails/${pyid}`)
        //    console.log(his)
        // console.log(res)

       }
           
         
        }
        paydet()
       
    }, [])


    return (
        <>
        <div className="success">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <h3>Thank You for Your Payment!! You will get your order within 5 days</h3>
                        <button className="btn btn-warning" onClick={()=>his.push('/products')}>Continue Shopping</button>
                    </div>
                </div>
            </div>

        </div>

            
        </>
    )
}

export default Success
