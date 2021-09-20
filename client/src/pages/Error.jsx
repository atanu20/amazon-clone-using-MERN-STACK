import React,{useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
const Error = () => {
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


    return (
        <>
        <div className="error">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 mx-auto">
                        <h1>404 Error !! Page Not Found</h1>
                        <button className="btn btn-danger mt-3" onClick={()=>his.push('/')}>Back to Home</button>

                    </div>
                </div>


            </div>
        </div>
            
        </>
    )
}

export default Error