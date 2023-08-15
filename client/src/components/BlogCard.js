import { Link } from "react-router-dom"

const BlogCard = ({blog}) => {
  let date = new Date(blog?.createdAt).toUTCString()
  return (
      <div className="blog-card">
        <div style={{height:'300px'}} className="card-image">
          <img style={{height:'300px', objectFit:'cover'}} className="img-fluid" src={blog?.images[0].url ? blog?.images[0].url : "/images/blog-1.jpg"} alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{blog?.title}</h5>
          <p dangerouslySetInnerHTML={{ __html: blog?.description.substr(0,70)+"..."}} className="description"></p>
          <Link to={`/blog/${blog?._id}`} className='button'>Read More</Link>
        </div>
      </div>
  )
}

export default BlogCard