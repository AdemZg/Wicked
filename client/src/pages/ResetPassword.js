import Meta from "../components/Meta";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { resetPassword } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";


const ResetPassword = () => {
    const { isError, isSuccessPasswordChanged, passwordUpdatedUser } = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()
    const formik = useFormik({
      initialValues: {
        password: '',
        password2:''
      },
      validationSchema: object({
        password: string().required('Password is required'),
        password2: string().required('Please Confirm Your Password')
      }),
      onSubmit: values => {
        const user = { token: token, password: values.password, password2:  values.password2}
        dispatch(resetPassword(user))
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        },3000)
      },
    })
    useEffect(() => {
        if(isSuccessPasswordChanged && passwordUpdatedUser){
            setTimeout(() =>{
                navigate('/login')
            }, 2000)
        }
    },[isSuccessPasswordChanged])
  return (
    <div>
        <Meta title = 'Reset Password' />
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
                            <h3 className="text-center mb-3">Reset your password</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <input value={formik.values.password} onChange={formik.handleChange("password")} placeholder="Password" name="password" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}</div>
                                </div>
                                <div>
                                    <input value={formik.values.password2} onChange={formik.handleChange("password2")} placeholder="Confirm Password" name="password2" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password2 && formik.errors.password2 ? (<div>{formik.errors.password2}</div>) : null}</div>
                                </div>
                                {isError && !isLoading && <div style={{fontSize:'13px', color:'red'}} className="error">Passwords Do Not Much !</div>}
                                {isLoading ? (
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <CircularProgress style={{color:'gray'}} /> 
                                </div>
                                ) :(
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">Submit</button>
                                    </div>
                                </div>)}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword