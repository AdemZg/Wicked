import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { Link } from 'react-router-dom';
import DataTablePro from "../../components/datatable/DataTable-product";

const Product = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTablePro />
      </div>
    </div>
  )
}

export default Product