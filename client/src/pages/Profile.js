import { useFormik } from "formik"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import { object, string } from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Avatar } from "@mui/material"
import { changePassword, resetLoginError, resetPasswordError, updateUser } from "../features/user/userSlice"
import { ToastContainer } from "react-toastify"


const Profile = () => {
  const { user, loginError, passwordError } = useSelector((state) => state.auth)
  const fullName = user?.firstname + ' ' + user?.lastname
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
    const formik = useFormik({
        initialValues: {
          currentPassword:'',
          password:'',
          password2:''
        },
        validationSchema: object({
          password: string().required('Password is required'),
          password2: string().required('Please Confirm Your Password')
        }),
        onSubmit: values => {
            dispatch(changePassword(values))
        },
      })
      const formik2 = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: user?.firstname || '',
          lastname: user?.lastname || '',
          mobile: user?.mobile || '',
          email: user?.email || '',
        },
        validationSchema: object({
          firstname: string().required('First Name is required'),
          lastname: string().required('Last Name is required'),
          email: string().email('Email Should be Valid').required('Email is Required'),
          mobile: string().required('Mobile Number is required'),
        }),
        onSubmit: values => {
          dispatch(updateUser(values))
        },
      })
      function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
useEffect(() => {
    dispatch(resetLoginError())
    dispatch(resetPasswordError())
}, [])
  return (
    <div>
        <Meta title = 'My Profile' />
        <BreadCrumb title='My Profile'/>
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
        <div className="cart-wrapper home-wrapper-2 py-3">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
              <div style={{width:'1000px',display:'flex',gap:'280px'}} className="auth-card">
                <div>
                <div className="left">
            <h4 className="section-heading mb-2">Account Details</h4>
            <div className="item px-2">
                <div className="details">
                <div>
            <div className="d-flex gap-30 mb-2 align-items-center mt-3">
            <Avatar style={{width:'50px', height:'50px'}}  {...stringAvatar(fullName)} />
                <h1 className="itemTitle">{user?.firstname + " " + user?.lastname}</h1>
            </div>
                {!active &&<span onClick={() => {
                    setOpen(false)
                    setActive(true)}}  style={{marginLeft:'10px', color:'#0096FF', cursor:'pointer', fontWeight:'500'}} className="form-display">Update Details</span>}
                <div className="detailItem mt-2">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ user?.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">password:</span>
                  <span className="itemValue">***********</span>
                  {!open &&<span onClick={() => {
                    setOpen(true)
                    setActive(false)}}  style={{marginLeft:'10px', color:'#0096FF', cursor:'pointer', fontWeight:'500'}} className={ "form-display"}>Change Password</span>}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+216 { user?.mobile }</span>
                </div>
                </div>
              </div>
            </div>
          </div>
                </div>
                        {open && (
                        <div className="mt-3">
                            <h3 className="text-center mb-3">Change Your Password</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div style={{width:'350px'}}>
                                    <input value={formik.values.currentPassword} onChange={formik.handleChange("currentPassword")} placeholder="Current Password" name="password" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.currentPassword && formik.errors.currentPassword ? (<div>{formik.errors.currentPassword}</div>) : null}</div>
                                </div>
                                <div style={{width:'350px'}}>
                                    <input value={formik.values.password} onChange={formik.handleChange("password")} placeholder="Password" name="password" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}</div>
                                </div>
                                <div style={{width:'350px'}}>
                                    <input value={formik.values.password2} onChange={formik.handleChange("password2")} placeholder="Confirm Password" name="password2" type="password" className="form-control mt-1" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.password2 && formik.errors.password2 ? (<div>{formik.errors.password2}</div>) : null}</div>
                                </div>
                                {passwordError && <div style={{fontSize:'13px', color:'red'}} className="error">Invalid Credentials</div>}
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">Submit</button>
                                        <span style={{ fontSize:'15px', marginLeft:'20px', color:'gray', cursor:'pointer',fontWeight:'700'}} onClick={() => setOpen(false)}>Cancel</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        )}
                        {active &&<div className="mt-3">
                            <h3 className="text-center mb-3">Change Your Account Details</h3>
                            <form onSubmit={formik2.handleSubmit} className="d-flex flex-column gap-15">
                            <div className="d-flex">
                                    <div className="col-6">
                                        <input value={formik2.values.firstname} onChange={formik2.handleChange("firstname")} placeholder="First Name" name="firstname" type="text" className="form-control" />
                                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik2.touched.firstname && formik2.errors.firstname ? (<div>{formik2.errors.firstname}</div>) : null}</div>
                                    </div>
                                    <div className="col-6">
                                        <input value={formik2.values.lastname} onChange={formik2.handleChange("lastname")} placeholder="Last Name" name="lastname" type="text" className="form-control" />
                                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik2.touched.lastname && formik2.errors.lastname ? (<div>{formik2.errors.lastname}</div>) : null}</div>
                                    </div>
                                </div>
                                <div>
                                    <input value={formik2.values.email} onChange={formik2.handleChange("email")} placeholder="Email" name="email" type="email" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik2.touched.email && formik2.errors.email ? (<div>{formik2.errors.email}</div>) : null}</div>
                                </div>
                                <div>
                                    <input value={formik2.values.mobile} onChange={formik2.handleChange("mobile")} placeholder="Mobile Number" name="mobile" type="number" className="form-control" />
                                    <div style={{fontSize:'13px', color:'red'}} className="error">{formik2.touched.mobile && formik2.errors.mobile ? (<div>{formik2.errors.mobile}</div>) : null}</div>
                                </div>
                                {loginError && <div style={{fontSize:'13px', color:'red'}} className="error">Email or Mobile Already Exist</div>}
                                <div>
                                    <div className=" mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button type="submit" className="button border-0">Submit</button>
                                        <span style={{ fontSize:'15px', marginLeft:'20px', color:'gray', cursor:'pointer',fontWeight:'700'}} onClick={() => {
                                            setActive(false)
                                            setOpen(false)}}>Cancel</span>
                                    </div>
                                </div>
                            </form>
                        </div>}
                    </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile