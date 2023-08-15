import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { userColumnsCoupons } from "../../datatablesource"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCoupon, getCoupons, removeItem, resetDeleteState } from "../../features/coupons/couponSlice.js"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import CustomModal from "../modal/Modal"

const DataTableCoupon = () => {
  const dispatch = useDispatch()
  const { coupons, deleteMessage } = useSelector((state)=>state.coupons)
  const [couponId, setCouponId] = useState(null)
  useEffect(()=>{
    dispatch(getCoupons())
  },[])
  let allCoupons = []
  for(let i = 0 ; i < coupons.length ; i++) {
    allCoupons.push({
      id: i+1,
      name: coupons[i].name,
      discount: coupons[i].discount,
      expiry: coupons[i].expiry,
      _id: coupons[i]._id
    })
  }
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Coupon has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 280,
      renderCell: (params) => {
        return (
          <div key={params.row.id} className="cellAction">
            <Link to={`/coupons/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
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
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true)
    setCouponId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeCoupon = (couponId) => {
    dispatch(deleteCoupon(couponId))
    dispatch(removeItem(couponId))
    setOpen(false)
  }
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
            Manage Coupons
        </div>
        <div className="datatableTitle">
            <Link to="/coupons/new" className="link">
                Add New Coupon
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allCoupons}
        columns={userColumnsCoupons.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeCoupon(couponId)}} title="Are you sure you want to delete this Coupon ?" hideModal={hideModal} open={open} top="Delete Coupon" />

    </div>
  );
};

export default DataTableCoupon