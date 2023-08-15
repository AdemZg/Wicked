import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableColor from "../../components/datatable/DataTable-color";

const Category = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableColor />
      </div>
    </div>
  )
}

export default Category