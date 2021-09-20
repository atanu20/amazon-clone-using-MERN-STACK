import axios from 'axios'
import React from 'react'
import { io } from "socket.io-client";

const AdminTabel = ({ getData,oid, date,userid,    paymentmode, deliverystatus, amount }) => {

    const [status, setStatus] = React.useState("")
    const socket = React.useRef();

const inputHandel=async(e)=>{

    setStatus(e.target.value)
    const obj={
        orderid:oid,
        deliverystatus:e.target.value

    }
// console.log(userid)
    socket.current = io("http://localhost:7000");  
       socket.current.emit("sendUpdate", {
        
        receiverid:userid,
        receiverorderid:oid,
       
      });

    const res=await axios.post('/order/update_order',obj)
    if(res.data)
    {
        getData()
    }
    
}



    return (
        <>
            <tr key={oid}>
                <th>{oid}</th>

                <td >

                    {
                        new Date(date).toDateString()
                    }
                </td>

                <td>{paymentmode}</td>
                <td>
                    {
                       deliverystatus
                    }
                </td>
                <td>₹ {amount}</td>
                <th>
                    <div class="form-group">

                        <select class="form-control" value={deliverystatus} onChange={inputHandel} >
                            {/* <option value="" selected disabled hidden>Ch</option> */}
                            <option value="order placed">order placed</option>
                            <option value="order shipped">order shipped</option>
                            <option value="out for delivery">out for delivery</option>
                            <option value="order delivered">order delivered</option>
                        </select>
                    </div>
                </th>

            </tr>

        </>
    )
}

export default AdminTabel
