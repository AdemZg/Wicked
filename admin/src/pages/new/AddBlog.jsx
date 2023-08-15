import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import BackupIcon from '@mui/icons-material/Backup';
import { deleteImage, upload } from "../../features/upload/uploadSlice";
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CircularProgress } from "@mui/material";
import { getBlogCats } from "../../features/blogCategory/blogCatSlice";
import { createBlog, resetState } from "../../features/blog/blogSlice";


const AddB = () => {
  const { BlogCats } = useSelector((state) => state.BlogCats)
  const { isSuccess, isError, isLoading, createdBlog } = useSelector((state) => state.blogs)
  const imageState = useSelector((state) => state.images.images)
  const loadingImage = useSelector((state) => state.images.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let allImages = []
  imageState.forEach(image => {
    allImages.push({
      public_id: image.public_id,
      url: image.url
    })
  })
  useEffect(()=>{
    dispatch(getBlogCats())
  },[])
  useEffect(()=>{
    formik.values.images = allImages
  },[allImages])
  useEffect(() => {
    if(isSuccess && createdBlog){
      setTimeout(() => {
        toast.success("Blog Added successfully")
      },100)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      },100)
    }
  }, [isSuccess, isError, isLoading, createdBlog])
  const formik = useFormik({
    initialValues: {
      title: '',
      category:'',
      description:'',
      images: ''
    },
    validationSchema: object({
      title: string().required('Title is Required'),
      description: string().required('Description is required'),
      category: string().ensure().required('Category is required'),
    }),
    onSubmit: values => {
      dispatch(createBlog(values))
      formik.resetForm()
      setTimeout(() => {
        dispatch(resetState())
        navigate('/blogs')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Blog</h1>
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
                  <input value={formik.values.title} placeholder="Blog Title" onBlur={formik.handleBlur('title')} onChange={formik.handleChange('title')} name="title" type="text"/>
                  <div className="error">{formik.touched.title && formik.errors.title}</div>
                </div>
                <div className="formInput">
                  <select name="category" value={formik.values.category}  onBlur={formik.handleBlur('category')} onChange={formik.handleChange('category')}>
                    <option>Select Category</option>
                    {BlogCats.map((i,j)=>{
                      return(
                        <option key={j} value={i.title}>{i.title}</option>
                      )
                    })}
                  </select>
                  <div className="error">{formik.touched.category && formik.errors.category}</div>
                </div>
                <div className="dragzone">
                <div className="react-quill">
                  <div style={{height:'120px'}}>
                    <ReactQuill placeholder="Description" style={{width:1320, height:'78px'}} name="description" theme="snow" value={formik.values.description} onChange={formik.handleChange('description')} />
                  </div>
                  <div className="error">{formik.touched.description && formik.errors.description}</div>
                </div>
                <div>
                  <Dropzone onDrop={(acceptedFiles) => dispatch(upload(acceptedFiles)) }>
                    {({getRootProps, getInputProps}) => (
                      <section style={{backgroundColor: 'white', border: '1px solid lightgray' ,borderRadius:'10px' , padding:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <div style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>
                            <BackupIcon style={{ color: "gray" }} fontSize="large" />
                          </div>
                          <p>Click Here To Upload Images</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <div className="show-images">
                    {loadingImage && (
                      <div style={{margin:'auto'}}>
                        <CircularProgress style={{color:'gray'}} />
                      </div>
                      )}
                    {imageState.map((image,k) => { return (
                      <div key={k} style={{position:'relative'}}>
                        <img style={{width:'121px', borderRadius:'5px', objectFit:'cover' }} src={image.url} alt="add" />
                        <AiFillCloseCircle onClick={()=>dispatch(deleteImage(image.public_id))}  style={{position:'absolute', right:'3px', top:'3px', color:'white', cursor:'pointer'}}/>
                      </div>
                      )})}
                  </div>
                </div>
                </div>
                <div>
                  <button type="submit" className="btn-submit">Add Blog</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddB;