import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import HomeTable from "../../components/table/HomeTable"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMonthlyOrders } from "../../features/auth/authSlice";
import { getUsers } from "../../features/customers/customerSlice";

const Home = () => {
  const dispatch = useDispatch()
  const { dataWanted } = useSelector((state) => state.auth)
  const { customers } = useSelector((state)=>state.customers)
  const { orders } = useSelector((state)=>state.orders)
  useEffect(()=>{
    dispatch(getUsers())
  },[])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget size={customers?.length} type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <HomeTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
