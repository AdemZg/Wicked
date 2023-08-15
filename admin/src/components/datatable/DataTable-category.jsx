import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsPcats } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProCat, getProCats, removeItem, resetDeleteState } from "../../features/productCategory/PcatSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";

const DataTableC = () => {
  const dispatch = useDispatch()
  const { ProCats, deleteMessage } = useSelector((state)=>state.ProCats)
  const [proCatId, setproCatId] = useState(null)
  useEffect(()=>{
    dispatch(getProCats())
  },[])
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Category has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  let allProCats = []
  for(let i = 0 ; i < ProCats.length ; i++) {
    allProCats.push({
      id: i+1,
      title: ProCats[i].title,
      _id: ProCats[i]._id
    })
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 542,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/product-categories/${params.row._id}`} style={{ textDecoration: "none" }}>
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
    setproCatId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeProCat = (proCatId) => {
    dispatch(deleteProCat(proCatId))
    dispatch(removeItem(proCatId))
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
            Manage Product Categories
        </div>
        <div className="datatableTitle">
            <Link to="/product-categories/new" className="link">
                Add New Category
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allProCats}
        columns={userColumnsPcats.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeProCat(proCatId)}} title="Are you sure you want to delete this Category ?" hideModal={hideModal} open={open} top="Delete Category" />
    </div>
  );
};

export default DataTableC;