import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTableCoupon from "../../components/datatable/DataTable-coupon";

const Coupon = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DataTableCoupon />
      </div>
    </div>
  )
}

export default Coupon