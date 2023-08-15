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
import { resetState } from "../../features/blogCategory/blogCatSlice";
import { getProCat, updateProCat } from "../../features/productCategory/PcatSlice";

const UpdatePcat = () => {
  const { isSuccess, isError, isLoading, updatedProCat, ProCatName } = useSelector((state) => state.ProCats)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } =useParams()
  useEffect(() => {
    if(isSuccess && updatedProCat){
      setTimeout(() => {
        toast.success("Product Category Updated successfully")
      },100)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      },100)
    }
  }, [isSuccess, isError, isLoading, updatedProCat])
  useEffect(() => {
    dispatch(getProCat(id))
  }, [ProCatName])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: ProCatName || ''
    },
    validationSchema: object({
      title: string().required('Product Category is Required'),
    }),
    onSubmit: values => {
        const data = { id: id, categoryData: values }
      dispatch(updateProCat(data))
      setTimeout(() => {
        dispatch(resetState())
        navigate('/product-categories')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Product Category</h1>
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
                  <input value={formik.values.title} placeholder="Product Category" onBlur={formik.handleBlur('title')} onChange={formik.handleChange('title')} name="title" type="text"/>
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

export default UpdatePcat;