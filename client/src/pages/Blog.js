import BlogCard from "../components/BlogCard";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux"
import { getBlogs } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Blog = () => {
    const dispatch = useDispatch()
    const { blogs, isLoading, isError } = useSelector((state) => state.blogs)
    const getAllBlogs = () => {
        dispatch(getBlogs())
    }
    useEffect(() => {
        getAllBlogs()
    }, [])
  return (
    <div>
        <Meta title = 'Blogs' />
        <BreadCrumb title='Blogs'/>
        <div className="blog-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Find By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                <li>Watch</li>
                                <li>Tv</li>
                                <li>Camera</li>
                                <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        {blogs && (
                        <div className="row">
                            {blogs?.map((blog) => (
                                <div key={blog?._id} className="col-6 mb-3">
                                    <BlogCard blog={blog} />
                                </div> 
                            ))}
                        </div>
                        )}
                        {isLoading && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <CircularProgress style={{color:'skyblue'}} /> 
                        </div>
                        )}   
                        {isError && (
                        <span style={{display:'flex', justifyContent:'center'}}>Something went wrong !</span>
                        )}                             
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blog