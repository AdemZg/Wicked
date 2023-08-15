import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { userColumnsOrders } from "../../datatablesource"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteOrder, getOrders, removeItem, resetDeleteState } from "../../features/order/orderSlice"
import { ToastContainer, toast } from "react-toastify"
import CustomModal from "../modal/Modal"

const DataTableOrder = () => {
  const dispatch = useDispatch()
  const { orders, deleteMessage } = useSelector((state)=>state.orders)
  const [orderId, setOrderId] = useState(null)
  useEffect(()=>{
    dispatch(getOrders())
  },[])
  let allOrders = []
  for(let i = 0 ; i < orders.length ; i++) {
    allOrders.push({
      id: i+1,
      date: orders[i].createdAt,
      name: orders[i].orderBy.firstname + " " + orders[i].orderBy.lastname,
      amount: "$ " + orders[i].paymentIntent.amount,
      status: orders[i].paymentIntent.status,
      _id: orders[i]._id,
      userId: orders[i].orderBy._id
    })
  }
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Order has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true)
    setOrderId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
    dispatch(removeItem(orderId))
    setOpen(false)
  }
  const actionColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 222,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status === 'Cash on Delivery' ? 'active' : 'pending'}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 280,
      renderCell: (params) => {
        return (
          <div key={params.row.id} className="cellAction">
            <Link to={`/orders/${params.row.userId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
            onClick={() => showModal(params.row._id)}
              className="deleteButton"
            >
              Delete
            </div>
          </div>
        );
      },
    },

  ];
  return (
    <div className="datatable">
      <ToastContainer
          position="top-right"
          autoClose={250}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      <div className="title-content">
        <div className="datatableTitle">
            Manage Orders
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allOrders}
        columns={userColumnsOrders.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeOrder(orderId)}} title="Are you sure you want to delete this Order ?" hideModal={hideModal} open={open} top="Delete Order" />
    </div>
  );
};

export default DataTableOrder;