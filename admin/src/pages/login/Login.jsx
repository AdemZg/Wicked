import "./login.scss"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { object, string } from 'yup';
import { login } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const dispatch = useDispatch()
  const  { user, isLoading, isSuccess, message }  = useSelector((state)=>state.auth)
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
      dispatch(login(values))
    },
  })
  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
    else{
      navigate('')
    }
  },[user, isLoading, isSuccess, message])
  return (
    <div className="login">
      <div className="loginContainer">
        <div className="card">
          <form className="form-control" onSubmit={formik.handleSubmit}>
                <div className="formInput">
                  <label>Email</label>
                  <input value={formik.values.email} onChange={formik.handleChange("email")} type='text' name="email" placeholder='Email' />
                  <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                  </div>
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input value={formik.values.password} onChange={formik.handleChange("password")} type="password" name="password" placeholder="Password" />
                  <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                </div>
              <button>login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login