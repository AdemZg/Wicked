import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import { forgotPasswordToken } from "../features/user/userSlice";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: object({
        email: string().email('Email Should be Valid').required('Email is Required'),
      }),
      onSubmit: values => {
        dispatch(forgotPasswordToken(values))
      },
    })
  return (
    <div>
        <Meta title = 'Forgot Password' />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss 
          draggable
          theme="light"
        />
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset Your Password</h3>
                            <p className="text-center mt-2 mb-3">We will send you an email to reset your password</p>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <input value={formik.values.email} onChange={formik.handleChange("email")} placeholder="Email" name="email" type="email" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}</div>
                                </div>
                                <div>
                                    <div className=" mt-3 d-flex flex-column justify-content-center align-items-center gap-15">
                                        <button className="button border-0" type="submit">Submit</button>
                                        <Link to='/login'>Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword