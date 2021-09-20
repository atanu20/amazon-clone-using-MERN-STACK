import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import './AdminPagination.css'
import AdminTabel from './AdminTabel';

const AdminPagination = ({ data,getData}) => {
    const [pageNo, setPageNo] = useState(0)

    const perpage = 10;
    const pagevisit = pageNo * perpage;
    let orderdata;
    let boxno
   if(data)
   {
     orderdata = data.slice(pagevisit, pagevisit + perpage);
      boxno = Math.ceil(data.length / perpage)
   }
    
   
    const pageChange = ({ selected }) => {
        setPageNo(selected)
    }
    return (
        <>
            <div className="admin_pagination">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Date</th>
                                <th>Payment Method</th>
                                <th>Order Status</th>
                                <th>Amount</th>
                                <th>Operation</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderdata?.map((val, ind) => {
                                    return (
                                        <>
                                           <AdminTabel
                                           key={ind}
                                           oid={val._id}
                                           date={val.date}
                                           paymentmode={val.paymentmode}
                                           userid={val.userid}
                                           deliverystatus={val.deliverystatus}
                                           amount={val.amount}
                                           getData={getData}
                                           
                                           />
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={boxno}
                    onPageChange={pageChange}
                    containerClassName={"pagination"}
                    // previousLinkClassName={"prevbutton"}
                    // nextLinkClassName={"nextbutton"}
                    // disabledClassName={"pagedisable"}
                    activeClassName={"activebutton"}

                />
            </div>

        </>
    )
}

export default AdminPagination
