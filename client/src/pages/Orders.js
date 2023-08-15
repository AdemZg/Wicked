import { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from "@mui/x-data-grid"
import { getMyOrders } from '../features/user/userSlice'

const Orders = () => {
    const { orders } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyOrders())
    }, [])
    const userColumnsOrders = [
        { field: "id", headerName: "ID", width: 180 },
        {
          field: "totalPrice",
          headerName: "Total Amount",
          width: 400,
        },
        {
          field: "totalPriceAfterDiscount",
          headerName: "Total Amount After Discount",
          width: 400,
        },
        {
            field: "status",
            headerName: "Status",
            width: 250,
            renderCell: (params) => {
              return (
                <div className={`cellWithStatus ${params.row.status === 'Ordered' ? 'active' : 'pending'}`}>
                    {params.row.status}
                </div>
              );
            },
          },
      
      ];
        let orderRows = []
        for(let i = 0; i < orders?.length; i++){
            let obj = {}
            obj.id=i+1
            obj.totalPrice=orders[i]?.totalPrice
            obj.totalPriceAfterDiscount=orders[i]?.totalPriceAfterDiscount
            obj.status=orders[i]?.orderStatus
            orderRows.push(obj)
        }
      
  return (
    <div>
        <Meta title = 'My Orders' />
        <BreadCrumb title='My Orders'/>
        <section className="cart-wrapper py-5">
          <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h4 className='section-heading'>My Orders</h4>
                </div>
              <div className="col-12">
              <DataGrid
                className="datagrid"
                rows={orderRows}
                columns={userColumnsOrders}
                pageSize={9}
                rowsPerPageOptions={9}
                hideFooter={true}
            />
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Orders