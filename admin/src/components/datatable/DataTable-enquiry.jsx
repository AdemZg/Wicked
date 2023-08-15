import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsEnq } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquiry, getEnquiries, removeItem, resetDeleteState, updateEnquiry } from "../../features/enquiry/enquirySlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "../modal/Modal";



const DataTableEn = () => {
  const dispatch = useDispatch()
  const { enquiries, deleteMessage } = useSelector((state)=>state.enquiries)
  const [enquiryId, setEnquiryId] = useState(null)
  useEffect(()=>{
    dispatch(getEnquiries())
  },[])
  let allEnq = []
  for(let i = 0 ; i < enquiries.length ; i++) {
    allEnq.push({
        id: i+1,
        name: enquiries[i].name,
        email: enquiries[i].email,
        mobile: enquiries[i].mobile,
        status: enquiries[i].status,
        _id: enquiries[i]._id,
    })
  }
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Enquiry has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  const actionColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <select  defaultValue={params.row.status ? params.row.status : "Submitted"} onChange={(e) => setStatus(e.target.value, params.row._id) }>
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/enquiries/${params.row._id}`} style={{ textDecoration: "none" }}>
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
  const setStatus = (EnqStatus, EnqId) => {
    const data = {id: EnqId, status: EnqStatus}
    dispatch(updateEnquiry(data))
  }
  const [open, setOpen] = useState(false);
  const showModal = (id) => {
    setOpen(true)
    setEnquiryId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeEnquiry = (enquiryId) => {
    dispatch(deleteEnquiry(enquiryId))
    dispatch(removeItem(enquiryId))
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
            Manage Enquiries
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allEnq}
        columns={userColumnsEnq.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeEnquiry(enquiryId)}} title="Are you sure you want to delete this Enquiry ?" hideModal={hideModal} open={open} top="Delete Enquiry" />
    </div>
  );
};

export default DataTableEn;