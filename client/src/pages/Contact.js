import { useFormik } from "formik";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import {AiOutlineHome, AiOutlineMail} from 'react-icons/ai'
import {BiPhoneCall,BiInfoCircle} from 'react-icons/bi'
import { Link, useNavigate } from "react-router-dom";
import { number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createEnquiry } from "../features/contact/contactSlice";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const { isSuccess } = useSelector((state) => state.contact)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email:'',
      mobile:'',
      comment:''
    },
    validationSchema: object({
      name: string().required('Name is required'),
      email: string().email('Email Should be Valid').required('Email is Required'),
      mobile:number().required('Mobile Number is required'),
      comment:string().required('Comment is required'),
    }),
    onSubmit: values => {
      dispatch(createEnquiry(values))
      if(isSuccess){
        navigate('/')
      }
    },
  })
  return (
    <div>
      <Meta title = 'Contact' />
        <BreadCrumb title='Contact'/>
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
        <div className="contact-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <iframe className="border-0 w-100" title="my-place" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51757.486759399835!2d10.58294918103385!3d35.82832944597391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130275759ac9d10d%3A0x698e3915682cef7d!2sSousse!5e0!3m2!1sfr!2stn!4v1680083381392!5m2!1sfr!2stn" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="col-12 mt-5">
                <div className="contact-inner-wrapper d-flex justify-content-between">
                  <div>
                    <h3 className="contact-title mb-4">Contact</h3>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                      <div>
                        <input value={formik.values.name} onChange={formik.handleChange("name")} name="name" placeholder="Name" type="text" className="form-control" />
                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}</div>
                      </div>
                      <div>
                        <input value={formik.values.email} onChange={formik.handleChange("email")} name="email" placeholder="Email" className="form-control" />
                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}</div>
                      </div>
                      <div>
                        <input value={formik.values.mobile} onChange={formik.handleChange("mobile")} name="mobile" placeholder="Mobile Number" type="number" className="form-control" />
                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.mobile && formik.errors.mobile ? (<div>{formik.errors.mobile}</div>) : null}</div>
                      </div>
                      <div>
                        <textarea value={formik.values.comment} onChange={formik.handleChange("comment")} name="comment" placeholder="Comments" className="w-100 form-control"  cols="30" rows="4"></textarea>
                        <div style={{fontSize:'13px', color:'red'}} className="error">{formik.touched.comment && formik.errors.comment ? (<div>{formik.errors.comment}</div>) : null}</div>
                      </div>
                      <div>
                        <button type="submit" className="button border-0">Submit</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className="contact-title mb-4">Get in touch with us</h3>
                    <div>
                      <ul className="ps-0">
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <AiOutlineHome className="fs-5"/>
                          <address className="mb-0">AZE : Near village blastings, yolaa</address>
                        </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <BiPhoneCall className="fs-5" />
                          <Link>+216 89489562</Link>
                        </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <AiOutlineMail className="fs-5"/>
                          <Link>work@work.com</Link>
                          </li>
                        <li className="mb-3 d-flex gap-15 align-items-center">
                          <BiInfoCircle className="fs-5"/>         
                          <p className="mb-0"> Monday - Friday 10 AM- 8 PM</p>                                       
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact