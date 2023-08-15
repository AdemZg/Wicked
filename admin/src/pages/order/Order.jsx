import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableB from '../../components/datatable/DataTable-blog';
import DataTableOrder from '../../components/datatable/DataTable-order';

const Product = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableOrder />
      </div>
    </div>
  )
}

export default Product