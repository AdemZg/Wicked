import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { getLoggedInAdmin } from "../../features/customers/customerSlice";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFormik } from "formik";
import { object, string } from "yup";

const Profile = () => {
const dispatch= useDispatch()
  const { loggedInAdmin } = useSelector((state) => state.customers)
  const fullName = loggedInAdmin?.firstname + ' ' + loggedInAdmin?.lastname
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getLoggedInAdmin())
  },[])
  const formik = useFormik({
    initialValues: {
      firstname:'',
      lastname:'',
      mobile:'',    
      email: '',
      password:''
    },
    validationSchema: object({
      email: string().email('Email Should be Valid').required('Email is Required'),
      password: string().required('Password is required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values))
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
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
            <Avatar style={{padding: '10px', fontSize:'30px'}}  {...stringAvatar(fullName)} />
              {loggedInAdmin ? (
                <div style={{display:'flex', gap:'400px'}} className="details">
                <div>
                <h1 className="itemTitle">{ loggedInAdmin?.firstname + ' ' + loggedInAdmin?.lastname }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ loggedInAdmin?.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">password:</span>
                  <span className="itemValue">***********</span>
                  <span onClick={() => setOpen(true)} style={{marginLeft:'10px', color:'#0096FF', cursor:'pointer', fontWeight:'500'}} className={ open ? "form-display" : "itemValue"}>Change Password</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{ loggedInAdmin?.mobile }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admin Since:</span>
                  <span className="itemValue">{ new Date(loggedInAdmin?.createdAt).toDateString() }</span>
                </div>
                </div>
                {open && (
                  <div className="transitions">
                  <form className="form-control" onSubmit={formik.handleSubmit}>
                      <div className="formInput">
                          <input value={formik.values.email} onChange={formik.handleChange("email")} type='text' name="email" placeholder='Current Password' />
                          <div className="error">
                          {formik.touched.email && formik.errors.email ? (
                              <div>{formik.errors.email}</div>
                          ) : null}
                          </div>
                      </div>
                      <div className="formInput">
                          <input value={formik.values.password} onChange={formik.handleChange("password")} type="password" name="password" placeholder="New Password" />
                          <div className="error">
                          {formik.touched.password && formik.errors.password ? (
                              <div>{formik.errors.password}</div>
                          ) : null}
                          </div>
                      </div>
                      <div className="formInput">
                          <input value={formik.values.password} onChange={formik.handleChange("password")} type="password" name="password" placeholder="Confirm Password" />
                          <div className="error">
                          {formik.touched.password && formik.errors.password ? (
                              <div>{formik.errors.password}</div>
                          ) : null}
                          </div>
                      </div>
                      <div>
                        <button>Change Password</button>
                        <span style={{ fontSize:'15px', marginLeft:'20px', color:'#0096FF', cursor:'pointer',fontWeight:'700'}} onClick={() => setOpen(false)}>Cancel</span>
                      </div>
                  </form>
              </div>
                )}
              </div>
              ) : (
                <CircularProgress style={{color:'gray'}} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile