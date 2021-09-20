import React,{useState,useEffect,useRef} from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import './Auth.css'
import axios from 'axios'


const path='http://localhost:4001/'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status,setStatus]=useState(false)
    const [msg,setMsg]=useState("")
    const his=useHistory()
    const timeout = useRef(null)
  

    const checkAuth=()=>{
        axios.get("/auth/isAuth",{
            headers:{
             "x-access-token":localStorage.getItem("Amazontoken")
            }
        }).then((response)=>{
         //  console.log()
         if(response.data.login)
         {
             his.push("/");
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

    
    const onsub=async(e)=>{
        e.preventDefault()

        const data={
            name,
            email,
            password
        }
        const res=await axios.post("/auth/register", data);
        // console.log(res.data)
        if(res.data.msg)
        {
            setStatus(true)
          setMsg(res.data.msg)
        }
        else{
            his.push('/login')
        }
    }
   
    return (
        <>
            <div className="auth">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-10 col-12 mx-auto">
                        <div className="login_img">
                            <img src={path +"assets/logo.png"} alt="logo" className="logim" />
                            <small>Your Shop</small>
                        </div>
                        <div className="card p-3">
                            {
                                status && <div class="alert alert-warning alert-dismissible fade show">
                                <button type="button" class="close" data-dismiss="alert" onClick={()=> setStatus(false)}>&times;</button>
                               {msg}
                              </div>
                            }
                            <h3 className="text-center">Register Now</h3>
                            <form onSubmit={onsub}>
                            <div class="form-group">
  <label for="">Name:</label>
  <input type="text" class="form-control" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} required />
</div>
<div class="form-group">
  <label for="">Email:</label>
  <input type="email" class="form-control" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</div>
<div class="form-group">
  <label for="">Password:</label>
  <input type="password" class="form-control" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</div>
<button className="btn btn-warning btn-block">Register</button>
<br />
<div className="text-right">
<NavLink to="/login">Already Have an Acccount</NavLink>
</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default Register
