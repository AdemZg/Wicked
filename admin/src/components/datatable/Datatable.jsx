import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, removeItem, resetDeleteState } from "../../features/customers/customerSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";

const Datatable = () => {
  const dispatch = useDispatch()
  const { customers, deleteMessage } = useSelector((state)=>state.customers)
  const [userId, setUserId] = useState(null)
  useEffect(()=>{
    dispatch(getUsers())
  },[])
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Customer has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  let users = []
  for(let i = 0 ; i < customers.length ; i++) {
    if(customers[i].role !== 'admin') {
      let obj={}
      obj.id=i+1
      obj.name=customers[i].firstname+' '+customers[i].lastname
      obj.email=customers[i].email
      obj.mobile=customers[i].mobile
      obj.blocked=customers[i].isBlocked
      obj._id=customers[i]._id
      users.push(obj)
    }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 242,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
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
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true)
    setUserId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeUser = (userId) => {
    dispatch(deleteUser(userId))
    dispatch(removeItem(userId))
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
      <div className="datatableTitle">
        Manage Customers
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeUser(userId)}} title="Are you sure you want to delete this Customer ?" hideModal={hideModal} open={open} top="Delete Customer" />
    </div>
  );
};

export default Datatable;