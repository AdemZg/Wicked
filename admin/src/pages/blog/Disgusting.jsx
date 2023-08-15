import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { Link } from 'react-router-dom';
import DataTableB from '../../components/datatable/DataTable-blog';

const Blog = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableB />
      </div>
    </div>
  )
}

export default Blog