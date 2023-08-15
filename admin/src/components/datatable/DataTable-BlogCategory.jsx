import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsBlogcats } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogCat, getBlogCats, removeItem, resetDeleteState } from "../../features/blogCategory/blogCatSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";

const DataTableBlogCat = () => {
  const dispatch = useDispatch()
  const { BlogCats, deleteMessage } = useSelector((state)=>state.BlogCats)
  const [blogCatId, setBlogCatId] = useState(null)
  useEffect(()=>{
    dispatch(getBlogCats())
  },[])
  let allBlogCats = []
  for(let i = 0 ; i < BlogCats.length ; i++) {
    allBlogCats.push({
      id: i+1,
      title: BlogCats[i].title,
      _id: BlogCats[i]._id
    })
  }
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Category has been deleted successfully")
      },10)
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
            <Link to={`/blog-categories/${params.row._id}`} style={{ textDecoration: "none" }}>
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
    setBlogCatId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeProCat = (blogCatId) => {
    dispatch(deleteBlogCat(blogCatId))
    dispatch(removeItem(blogCatId))
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
            Manage Blog Categories
        </div>
        <div className="datatableTitle">
            <Link to="/blog-categories/new" className="link">
                Add New Category
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allBlogCats}
        columns={userColumnsBlogcats.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeProCat(blogCatId)}} title="Are you sure you want to delete this Category ?" hideModal={hideModal} open={open} top="Delete Category" />
    </div>
  );
};

export default DataTableBlogCat;