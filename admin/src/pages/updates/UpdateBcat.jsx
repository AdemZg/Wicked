import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getBlogCat, resetState, updateBlogCat } from "../../features/blogCategory/blogCatSlice";

const UpdateBcat = () => {
  const { isSuccess, isError, isLoading, updatedBlogCat, BlogCatName } = useSelector((state) => state.BlogCats)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if(isSuccess && updatedBlogCat){
      setTimeout(() => {
        toast.success("Blog Category Updated successfully")
      },100)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      },100)
    }
  }, [isSuccess, isError, isLoading, updatedBlogCat])
  useEffect(() => {
    dispatch(getBlogCat(id))
  }, [BlogCatName])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogCatName || ''
    },
    validationSchema: object({
      title: string().required('Blog Category is Required'),
    }),
    onSubmit: values => {
      const data = { id: id, categoryData: values }
      dispatch(updateBlogCat(data))
      setTimeout(() => {
        dispatch(resetState())
        navigate('/blog-categories')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Blog Category</h1>
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
        <div className="bottom">
            <form onSubmit={formik.handleSubmit}>
                <div className="formInput" >
                  <input value={formik.values.title} placeholder="Blog Category" onBlur={formik.handleBlur('title')} onChange={formik.handleChange('title')} name="title" type="text"/>
                  <div className="error">{formik.touched.title && formik.errors.title}</div>
                </div>
                <div>
                  <button type="submit" className="btn-submit">Update Category</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBcat;