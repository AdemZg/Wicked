import { Link, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { loginUser, resetLoginError } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const Login = () => {
    const dispatch = useDispatch()
    const  { user, isSuccess, loginError }  = useSelector((state)=>state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const formik = useFormik({
      initialValues: {
        email: '',
        password:''
      },
      validationSchema: object({
        email: string().email('Email Should be Valid').required('Email is Required'),
        password: string().required('Password is required')
      }),
      onSubmit: values => {
        dispatch(loginUser(values))
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        },3000)
      },
    })
    useEffect(() => {
      setTimeout(() => {
        if(isSuccess && user) {
          navigate('/')
          window.location.reload()
        }
      }, 2000)
      dispatch(resetLoginError())
    }, [isSuccess])
  return (
    <div>
        <Meta title = 'Login' />
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Login</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <input value={formik.values.email} onChange={formik.handleChange("email")} placeholder="Email" name="email" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}</div>
                                </div>
                                <div>
                                    <input value={formik.values.password} onChange={formik.handleChange("password")} placeholder="Password" name="password" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}</div>
                                </div>
                                {loginError && !isLoading && (<span style={{fontSize:'13px', color:'red'}} className="error">Invalid Credentials</span>)}
                                {!isLoading ? (
                                <div>
                                    <Link to='/forgot-password'>Forgot Password?</Link>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">Login</button>
                                        <Link to='/signup' className="button signup">Sign Up</Link>
                                    </div>
                                </div>
                                ) : (
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <CircularProgress style={{color:'gray'}} /> 
                                </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login