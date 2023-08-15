import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderByUserId } from "../../features/order/orderSlice";
import { Avatar, CircularProgress } from "@mui/material";

const Single = () => {
  const dispatch= useDispatch()
  const { wantedOrder, isLoading } = useSelector((state) => state.orders)
  const { id } = useParams()
  const fullName = wantedOrder?.orderBy.firstname + ' ' + wantedOrder?.orderBy.lastname
  useEffect(() => {
    dispatch(getOrderByUserId(id))
  }, [id])
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
            <Avatar style={{padding: '10px', fontSize:'30px'}}  {...stringAvatar(fullName)} />
              {wantedOrder ? (
                <div className="details">
                <h1 className="itemTitle">{ wantedOrder.orderBy.firstname + ' ' + wantedOrder.orderBy.lastname }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ wantedOrder.orderBy.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{ wantedOrder.orderBy.mobile }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Blocked:</span>
                  <span className="itemValue">{ wantedOrder.orderBy.isBlocked === false ? 'No' : ' Yes' }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered on:</span>
                  <span className="itemValue">{ new Date(wantedOrder.orderBy.createdAt).toDateString() }</span>
                </div>
              </div>
              ) : (
                <CircularProgress style={{color:'gray'}} />
              )}
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Order Details</h1>
          <List  />
        </div>
      </div>
    </div>
  );
};

export default Single;
