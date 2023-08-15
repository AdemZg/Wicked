import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableEn from "../../components/datatable/DataTable-enquiry";

const Enquiry = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableEn />
      </div>
    </div>
  )
}

export default Enquiry