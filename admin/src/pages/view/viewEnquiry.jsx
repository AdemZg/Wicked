import "./View.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteEnquiry, getEnquiry, resetDeleteState, resetState, updateEnquiry } from "../../features/enquiry/enquirySlice";
import CustomModal from "../../components/modal/Modal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const ViewEnquiry = () => {
  const { dataEnquiry, deleteMessage, updatedStatus} = useSelector((state) => state.enquiries)
  const [result, setResult] = useState(dataEnquiry?.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getEnquiry(id))
  }, [id])
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Enquiry has been deleted successfully")
        navigate('/enquiries')
      },100)
    }
  }, [deleteMessage])
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeEnquiry = (id) => {
    dispatch(deleteEnquiry(id))
    setOpen(false)
  }
  const setStatus = (enqStatus) => {
    const data = { id: id, status: enqStatus}
    dispatch(updateEnquiry(data))
    setResult(enqStatus)
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <h1>Enquiry Details</h1>
        </div>
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
        <div className="middle">
          <div className="left">
            <div onClick={() => showModal()} className="deleteButton">Delete</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                style={{width:'200px', height:'200px', objectFit:'cover'}}
                src="https://p1.hiclipart.com/preview/444/382/414/frost-pro-for-os-x-icon-set-now-free-contacts-male-profile-png-clipart.jpg"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{dataEnquiry?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{dataEnquiry?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{dataEnquiry?.mobile}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Comment:</span>
                  <span className="itemValue">{dataEnquiry?.comment}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{result}</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'10px'}} className="detailItem">
                  <span className="itemKey">Change Status:</span>
                  <select onChange={(e) => setStatus(e.target.value)} defaultValue={dataEnquiry?.status}>
                    <option value="Submitted">Submitted</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal performAction={() => {removeEnquiry(id)}} title="Are you sure you want to delete this Enquiry ?" hideModal={hideModal} open={open} top="Delete Enquiry" />
    </div>
  );
};

export default ViewEnquiry;