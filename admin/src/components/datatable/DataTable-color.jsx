import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsColors } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors, removeItem, resetDeleteState } from "../../features/color/colorSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";

const DataTableColor = () => {
  const dispatch = useDispatch()
  const { colors, deleteMessage } = useSelector((state)=>state.colors)
  const [colorId, setColorId] = useState(null)
  useEffect(()=>{
    dispatch(getColors())
  },[])
  let allColors = []
  for( let i = 0; i < colors.length; i++ ){
    allColors.push({
        id: i+1,
        title: colors[i].title,
        _id: colors[i]._id
    })
}
useEffect(() => {
  if(deleteMessage){
    setTimeout(() => {
      toast.success("Category has been deleted successfully")
    },100)
  }
  dispatch(resetDeleteState())
}, [deleteMessage])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 542,
      renderCell: (params) => {
        return (
          <div className="cellAction">
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
    setColorId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeProCat = (colorId) => {
    dispatch(deleteColor(colorId))
    dispatch(removeItem(colorId))
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
            Manage Colors
        </div>
        <div className="datatableTitle">
            <Link to="/colors/new" className="link">
                Add New Color
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allColors}
        columns={userColumnsColors.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeProCat(colorId)}} title="Are you sure you want to delete this Color ?" hideModal={hideModal} open={open} top="Delete Color" />
    </div>
  );
}

export default DataTableColor