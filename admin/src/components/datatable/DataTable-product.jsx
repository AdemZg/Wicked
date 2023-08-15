import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsProduct } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, removeItem, resetDeleteState } from "../../features/product/productSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";


const DataTablePro = () => {
    const dispatch = useDispatch()
    const { products, deleteMessage } = useSelector((state)=>state.products)
    const [productId, setProductId] = useState(null)
    useEffect(()=>{
      dispatch(getProducts())
    },[])
    let allProducts = []
    for(let i = 0 ; i < products.length ; i++) {
      allProducts.push({
        id: i+1,
        title: products[i].title,
        brand: products[i].brand,
        category: products[i].category,
        sold: products[i].sold,
        quantity: products[i].quantity,
        price: "$ "+products[i].price,
        _id: products[i]._id
      })
    }
    useEffect(() => {
      if(deleteMessage){
        setTimeout(() => {
          toast.success("Product has been deleted successfully")
        },100)
      }
      dispatch(resetDeleteState())
    }, [deleteMessage])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/products/id" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={`/products/${params.row._id}`} style={{ textDecoration: "none" }}>
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
    setProductId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeProduct = (productId) => {
    dispatch(deleteProduct(productId))
    dispatch(removeItem(productId))
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
            Manage Products
        </div>
        <div className="datatableTitle">
            <Link to="/products/new" className="link">
                Add New Product
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allProducts}
        columns={userColumnsProduct.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeProduct(productId)}} title="Are you sure you want to delete this Product ?" hideModal={hideModal} open={open} top="Delete Product" />
    </div>
  );
};

export default DataTablePro;