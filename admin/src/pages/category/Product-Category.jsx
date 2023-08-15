import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { Link } from 'react-router-dom';
import DataTableC from '../../components/datatable/DataTable-category';

const ProductCategory = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableC />
      </div>
    </div>
  )
}

export default ProductCategory