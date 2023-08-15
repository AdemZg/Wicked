import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableBlogCat from "../../components/datatable/DataTable-BlogCategory";


const BlogCategory = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableBlogCat />
      </div>
    </div>
  )
}

export default BlogCategory