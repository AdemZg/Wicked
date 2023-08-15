import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import {HiOutlineArrowLeft} from 'react-icons/hi';
import { getBlog } from "../features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const SingleBlog = () => {
    const dispatch = useDispatch()
    const { wantedBlog, isLoading, isError } = useSelector((state) => state.blogs)
    const { id } = useParams()
    const getSingleBlog = () => {
        dispatch(getBlog(id))
    }
    useEffect(() => {
        getSingleBlog()
    }, [])
  return (
    <div>
        <Meta title={wantedBlog?.title} />
        <BreadCrumb title={wantedBlog?.title}/>
        <div className="blog-wrapper home-wrapper-2 py-5">
            {wantedBlog && (
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link className="d-flex align-items-center gap-10" to='/blogs'><HiOutlineArrowLeft className="fs-5"/>Go Back to Blogs</Link>
                            <h3 className="title">{wantedBlog?.title}</h3>
                            <div style={{width:'100%',height:'700px', margin:'auto'}}>
                                <img style={{height:'650px', width:'100%' ,objectFit:'cover', borderRadius:'10px'}} className="img-fluid my-4" src={wantedBlog?.images[0].url ? wantedBlog?.images[0].url : "/images/blog-1.jpg"} alt="" />
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: wantedBlog?.description}}></p>
                        </div>
                    </div>
                    <div className="col-9">

                    </div>
                </div>
            </div>
            )}
            {isLoading && (
            <div style={{display:'flex', justifyContent:'center'}}>
                <CircularProgress style={{color:'skyblue'}} /> 
            </div>
            )}   
            {isError && (
            <span style={{display:'flex', justifyContent:'center'}}>Couldn't get Blog !</span>
            )}    
        </div>
    </div>
  )
}

export default SingleBlog