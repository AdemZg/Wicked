import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { array, number, object, string } from 'yup';
import { Select } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";
import { getProCats } from "../../features/productCategory/PcatSlice";
import { getColors } from "../../features/color/colorSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import BackupIcon from '@mui/icons-material/Backup';
import { deleteImage, upload } from "../../features/upload/uploadSlice";
import { AiFillCloseCircle } from 'react-icons/ai';
import { createProduct, resetState } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CircularProgress } from "@mui/material";

const AddP = () => {
  const { brands } = useSelector((state) => state.brands)
  const { ProCats } = useSelector((state) => state.ProCats)
  const { colors } = useSelector((state) => state.colors)
  const { isSuccess, isError, isLoading, createdProduct } = useSelector((state) => state.products)
  const  imageState  = useSelector((state) => state.images.images)
  const loadingImage = useSelector((state) => state.images.isLoading)
  const [color, setColor] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let colorOptions = []
  colors.forEach(color => {
    colorOptions.push({
      label: color.title,
      value: color._id
    })
  })
  let allImages = []
  imageState.forEach(image => {
    allImages.push({
      public_id: image.public_id,
      url: image.url
    })
  })
  useEffect(() => {
    if(isSuccess && createdProduct){
      setTimeout(() => {
        toast.success("Product Added successfully")
      }, 500)
    }
    else if(isError) {
      setTimeout(() => {
        toast.error('Something went wrong')
      }, 500)
    }
  }, [isSuccess, isError, isLoading, createdProduct])
  useEffect(()=>{
    dispatch(getBrands())
    dispatch(getProCats())
    dispatch(getColors())
  },[])
  useEffect(()=>{
    formik.values.color = color ? color : ''
    formik.values.images = allImages
  },[color])
  const handleColors = (e) => {
    setColor(e)
  }
  const formik = useFormik({
    initialValues: {
      title: '',
      quantity:'',
      brand:'',
      category:'',
      tags:'',
      price:'',
      description:'',
      images: ''
    },
    validationSchema: object({
      title: string().required('Title is Required'),
      description: string().required('Description is required'),
      quantity: number().required('Quantity is required'),
      price: number().required('Price is required'),
      brand: string().ensure().required('Brand is required'),
      category: string().ensure().required('Category is required'),
      tags: string().ensure().required('Tag is required'),
      color: array().min(1, "Pick at least one color").required('Colors are required'),
    }),
    onSubmit: values => {
      dispatch(createProduct(values))
      formik.resetForm()
      setColor(null)
      setTimeout(() => {
        dispatch(resetState())
        navigate('/products')
      },2000)
    },
  })
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Product</h1>
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
                  <input value={formik.values.title} placeholder="Product Title" onBlur={formik.handleBlur('title')} onChange={formik.handleChange('title')} name="title" type="text"/>
                  <div className="error">{formik.touched.title && formik.errors.title}</div>
                </div>
                <div className="formInput" >
                  <input name="quantity" value={formik.values.quantity} onBlur={formik.handleBlur('quantity')} placeholder="Quantity" onChange={formik.handleChange('quantity')} type="number"/>
                  <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>
                </div> 
                <div className="formInput">
                  <select name="category" value={formik.values.category}  onBlur={formik.handleBlur('category')} onChange={formik.handleChange('category')}>
                    <option>Select Category</option>
                    {ProCats.map((i,j)=>{
                      return(
                        <option key={j} value={i.title}>{i.title}</option>
                      )
                    })}
                  </select>
                  <div className="error">{formik.touched.category && formik.errors.category}</div>
                </div>
                <div className="formInput">
                  <select name="tags" value={formik.values.tags}  onBlur={formik.handleBlur('tags')} onChange={formik.handleChange('tags')}>
                    <option disabled value=''>Select Tags</option>
                    <option value='featured'>Featured</option>
                    <option value='popular'>Popular</option>
                    <option value='special'>Special</option>
                  </select>
                  <div className="error">{formik.touched.tags && formik.errors.tags}</div>
                </div>
                <div className="formInput">
                  <select name="brand" value={formik.values.brand} onBlur={formik.handleBlur('brand')} onChange={formik.handleChange('brand')}>
                    <option >Select Brand</option>
                    {brands.map((k,p)=>{
                      return(
                        <option key={p} value={k.title}>{k.title}</option>
                      )
                    })} 
                  </select>
                  <div className="error">{formik.touched.brand && formik.errors.brand}</div>
                </div>
                <div className="multi-select">
                  <Select style={{width: '100%' }} mode="multiple" allowClear placeholder="Select Colors" defaultValue={color} onChange={(i) => handleColors(i)} options={colorOptions} />
                  <div className="error">{formik.touched.color && formik.errors.color}</div>
                </div>
                <div className="formInput" >
                  <input name="price" value={formik.values.price} onBlur={formik.handleBlur('price')} onChange={formik.handleChange('price')}  placeholder="Price" type="number"/>
                  <div className="error">{formik.touched.price && formik.errors.price}</div>
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
                  <button type="submit" className="btn-submit">Add Product</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddP;