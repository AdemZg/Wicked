import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableBrand from "../../components/datatable/DataTable-brand";

const Blog = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableBrand />
      </div>
    </div>
  )
}

export default Blog