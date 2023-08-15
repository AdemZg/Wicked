import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { createBrand, resetState } from "../../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddBrand = () => {
  const { isSuccess, isError, isLoading, createdBrand } = useSelector((state) => state.brands)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if(isSuccess && createdBrand){
      setTimeout(() => {
        toast.success("Brand Added successfully")
      }, 100)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      }, 100)
    }
  }, [isSuccess, isError, isLoading, createdBrand])
  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: object({
      title: string().required('Brand is Required'),
    }),
    onSubmit: values => {
      dispatch(createBrand(values))
      formik.resetForm()
      setTimeout(() => {
        dispatch(resetState())
        navigate('/brands')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Brand</h1>
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
                  <input value={formik.values.title} placeholder="Brand" onBlur={formik.handleBlur('title')} onChange={formik.handleChange('title')} name="title" type="text"/>
                  <div className="error">{formik.touched.title && formik.errors.title}</div>
                </div>
                <div>
                  <button type="submit" className="btn-submit">Add Brand</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;