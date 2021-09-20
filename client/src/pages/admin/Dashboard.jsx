import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router';
import AdminPagination from '../../component/paginate/AdminPagination';
import './admin.css'


const Dashboard = () => {
    const [login, setLogin] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const [data, setData] = React.useState([]);
// const his=useHistory()

    const getData=async()=>{
        const res=await axios.get("/order/all_order")
        setData(res.data.sort((p1, p2) => {
            return new Date(p2.date) - new Date(p1.date);
          }))
    }
React.useEffect(() => {
    getData()
    
}, [])



    const handelINput=(e)=>{
        setEmail(e.target.value)
        setPassword(e.target.value)
    }
    const onsub=(e)=>{
        e.preventDefault()

        if(email === "atanuj625@gmail.com" && password==="atanuj625@gmail.com")
        {
            setLogin(true)
        }
        else{
            setShow(true)
            setMsg("Invalid User")
        }

    }
//     if(!data)
//     {
//         return (
//             <>
//             <div className="dashboard">
//                            <div className="container-fluid p-5">
//                                <div className="row">
// <h2>loading...</h2>
//                                </div>
//                                </div>
//                                </div>


//             </>
//         )
//     }
    return (
        <>
        <div className="admin">
            {
                !login ?  <div className="admin_login">
                <div className="admin_login_box p-2">
                    {
                        show && <div class="alert alert-danger alert-dismissible fade show">
                        <button type="button" class="close" data-dismiss="alert" onClick={()=>setShow(false)}>&times;</button>
                        {msg}
                      </div>
                    }
                    <h3 className="text-center p-2">Admin Login</h3>
                    <form onSubmit={onsub}>
                    
        <div class="form-group">
          <label for="">Password:</label>
          <input type="password" class="form-control" placeholder="Enter Password" value={password} onChange={handelINput} required  />
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-warning">Login</button>
        </div>
                    </form>
                </div>
                   </div> : (
                       <>
                       <div className="dashboard">
                           <div className="container-fluid p-5">
                               <div className="row">
                                   <h3>Hi <span style={{color:'#F7B030'}}> <strong>Admin</strong>
                                   </span></h3>
                                   <br /><br />
                                   
                               </div>
                               <div className="row">
                                   {
                                      data?   <AdminPagination data={data}  getData={getData} /> : "loading..."
                                   }
                              

                               </div>
                               
                           </div>

                       </div>

                       </>
                   )
            }
          
        </div>
            
        </>
    )
}

export default Dashboard
