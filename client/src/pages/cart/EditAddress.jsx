import React,{useState,useEffect,useRef} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const EditAddress = () => {
const AmazonEmail=localStorage.getItem('AmazonEmail')
    const AmazonUserId=localStorage.getItem('AmazonUserId')
    const [email, setEmail] = useState(AmazonEmail)
    const [phone, setPhone] = useState("")
    const [addr, setAddr] = useState("")
    const timeout = useRef(null)
    const his= useHistory()


   const {id}= useParams()


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



 const getaddress=async ()=>{
    const res=await axios.get(`/auth/getaddress/${AmazonUserId}`)
    
     setPhone(res.data[0].phone)
     setAddr(res.data[0].address)
//   console.log(res.data)
//     setYourAddress(res.data)

 }
 useEffect(() => {
    getaddress()
 }, [])



    const onSub= async(e)=>{
        e.preventDefault()
        const data={
            
            phone:phone,
            address:addr,
            addressId:id
        }
       
        const res=await axios.post(`/auth/edit_address`,data)
        his.push("/cart-details")
         
        }

    return (
        <>
        <div className="cart">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-8 col-12 mx-auto"> 
                    <div className="card p-3">
                        <h3 className="text-center p-2">Edit Address</h3>
                                <form onSubmit={onSub}>
                                    
                                    <div class="form-group">
                                        <label >Email:</label>
                                        <input type="text" class="form-control" name='email' readOnly placeholder="Enter Email" value={email}  onChange={(e)=>setEmail(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label >Phone:</label>
                                        <input type="tel" class="form-control" name='phone' placeholder="Enter Phone" value={phone}  onChange={(e)=>setPhone(e.target.value)} required />
                                    </div>

                                    <div class="form-group">
                                        <label >Full Address:</label>

                                        <textarea name="address" id="" class="form-control" rows="3" placeholder="Enter Full Address" value={addr}  onChange={(e)=>setAddr(e.target.value)} required></textarea>
                                    </div>



                                    <div class="text-center mb-5">
                                        <input type="submit" class="btn btn-warning pt-2 pb-2 pl-5 pr-5" value="Edit Address" />
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

export default EditAddress
