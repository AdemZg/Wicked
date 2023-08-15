import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { resetState } from "../../features/color/colorSlice";
import { getCoupon, updateCoupon } from "../../features/coupons/couponSlice";

const UpdateCoupon = () => {
  const { isSuccess, isError, isLoading, dataCoupon, updatedCoupon } = useSelector((state) => state.coupons)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    if(isSuccess && updatedCoupon){
      setTimeout(() => {
        toast.success("Coupon Updated successfully")
      },100)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      },100)
    }
  }, [isSuccess, isError, isLoading, updatedCoupon])
  useEffect(() => {
    dispatch(getCoupon(id))
  }, [])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataCoupon?.name || '',
      expiry: '',
      discount: dataCoupon?.discount || ''
    },
    validationSchema: object({
      name: string().required('Coupon Name is Required'),
      expiry: date().required('Expiry Date is Required'),
      discount: number().required('Discount Percentage is Required'),
    }),
    onSubmit: values => {
      const data = { id: id, couponData: values }
      dispatch(updateCoupon(data))
      setTimeout(() => {
        dispatch(resetState())
        navigate('/coupons')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Coupon</h1>
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
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={formik.handleSubmit}>
                <div className="formInput" >
                  <input value={formik.values.name} placeholder="Coupon Name" onBlur={formik.handleBlur('name')} onChange={formik.handleChange('name')} name="name" type="text"/>
                  <div className="error">{formik.touched.name && formik.errors.name}</div>
                </div>
                <div className="formInput" >
                    <span style={{fontSize:'11px'}}>Expiry Date: &nbsp; {new Date(dataCoupon?.expiry).toLocaleDateString()}</span>
                  <input value={formik.values.expiry} placeholder="Expiry Date" onBlur={formik.handleBlur('expiry')} onChange={formik.handleChange('expiry')} name="expiry" type="date"/>
                  <div className="error">{formik.touched.expiry && formik.errors.expiry}</div>
                </div>
                <div className="formInput" >
                  <input value={formik.values.discount} placeholder="Discount (%)" onBlur={formik.handleBlur('discount')} onChange={formik.handleChange('discount')} name="discount" type="number"/>
                  <div className="error">{formik.touched.discount && formik.errors.discount}</div>
                </div>
                <div>
                  <button type="submit" className="btn-submit">Update Coupon</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoupon;