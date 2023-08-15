import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumnsBlog } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs, removeItem, resetDeleteState } from "../../features/blog/blogSlice";
import CustomModal from "../modal/Modal";
import { ToastContainer, toast } from "react-toastify";

const DataTableB = () => {
  const dispatch = useDispatch()
  const { blogs, deleteMessage } = useSelector((state)=>state.blogs)
  const [blogId, setBlogId] = useState(null)
  useEffect(()=>{
    dispatch(getBlogs())
  },[])
  let allBlogs = []
  for(let i = 0 ; i < blogs?.length ; i++) {
    allBlogs.push({
      id: i+1,
      title: blogs[i].title,
      category: blogs[i].category,
      author:blogs[i].author,
      views: blogs[i].numViews,
      _id: blogs[i]._id
    })
  }
  useEffect(() => {
    if(deleteMessage){
      setTimeout(() => {
        toast.success("Blog has been deleted successfully")
      },100)
    }
    dispatch(resetDeleteState())
  }, [deleteMessage])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/blogs/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={`/blogs/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="updateButton">Update</div>
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
    setBlogId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }
  const removeBlog = (blogId) => {
    dispatch(deleteBlog(blogId))
    dispatch(removeItem(blogId))
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
            Manage Blogs
        </div>
        <div className="datatableTitle">
            <Link to="/blogs/new" className="link">
                Add New Blog
                </Link>
            </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={allBlogs}
        columns={userColumnsBlog.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <CustomModal performAction={() => {removeBlog(blogId)}} title="Are you sure you want to delete this Blog ?" hideModal={hideModal} open={open} top="Delete Blog" />
    </div>
  );
};

export default DataTableB;