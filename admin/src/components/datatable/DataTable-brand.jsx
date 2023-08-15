import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsBrands } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, removeItem, resetDeleteState } from "../../features/brand/brandSlice";
import { deleteBrand } from "../../features/brand/brandSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";


const DataTableBrand = () => {
  const dispatch = useDispatch()
  const { brands, deleteMessage } = useSelector((state)=>state.brands)
  const [brandId, setBrandId] = useState(null)
  useEffect(()=>{
    dispatch(getBrands())
  },[])
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Category has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  let allBrands = []
  for( let i = 0; i < brands.length; i++ ){
    allBrands.push({
        id: i+1,
        title: brands[i].title,
        _id: brands[i]._id
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
            <Link to={`/brands/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div onClick={() => showModal(params.row._id)}
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
    setBrandId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeBrand = (brandId) => {
    dispatch(deleteBrand(brandId))
    dispatch(removeItem(brandId))
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
            Manage Brands
        </div>
        <div className="datatableTitle">
            <Link to="/brands/new" className="link">
                Add New Brand
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allBrands}
        columns={userColumnsBrands.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeBrand(brandId)}} title="Are you sure you want to delete this Brand ?" hideModal={hideModal} open={open} top="Delete Brand" />
    </div>
  );
}

export default DataTableBrand