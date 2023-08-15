import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { object, string } from 'yup';
import { useEffect } from "react";
import { registerUser } from "../features/user/userSlice";

const Signup = () => {
  const dispatch = useDispatch()
  const  { user, isLoading, isSuccess, message }  = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname:'',
      lastname:'',
      mobile:'',
      email: '',
      password:''
    },
    validationSchema: object({
      firstname: string().required('First Name is required'),
      lastname: string().required('Last Name is required'),
      email: string().email('Email Should be Valid').required('Email is Required'),
      mobile: string().required('Mobile Number is required'),
      password: string().required('Password is required')
    }),
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  })
  useEffect(()=>{
    if(isSuccess){
      navigate('/login')
    }
    else{
        navigate('')
    }
  },[user, isLoading, isSuccess, message])
  return (
    <div>
        <Meta title = 'Sign up' />
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Sign Up</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div className="d-flex">
                                    <div className="col-6">
                                        <input value={formik.values.firstname} onChange={formik.handleChange("firstname")} placeholder="First Name" name="firstname" type="text" className="form-control" />
                                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.firstname && formik.errors.firstname ? (<div>{formik.errors.firstname}</div>) : null}</div>
                                    </div>
                                    <div className="col-6">
                                        <input value={formik.values.lastname} onChange={formik.handleChange("lastname")} placeholder="Last Name" name="lastname" type="text" className="form-control" />
                                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.lastname && formik.errors.lastname ? (<div>{formik.errors.lastname}</div>) : null}</div>
                                    </div>
                                </div>
                                <div>
                                    <input value={formik.values.email} onChange={formik.handleChange("email")} placeholder="Email" name="email" type="email" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}</div>
                                </div>
                                <div>
                                    <input value={formik.values.mobile} onChange={formik.handleChange("mobile")} placeholder="Mobile Number" name="mobile" type="number" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.mobile && formik.errors.mobile ? (<div>{formik.errors.mobile}</div>) : null}</div>
                                </div>
                                <div>
                                    <input value={formik.values.password} onChange={formik.handleChange("password")} placeholder="Password" name="password" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}</div>
                                </div>
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">Sign up</button>
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

export default Signup