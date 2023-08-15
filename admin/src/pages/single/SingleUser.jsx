import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import ListUser from "../../components/table/UserOrderTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../features/customers/customerSlice";
import { useEffect } from "react";
import { Avatar, CircularProgress } from "@mui/material";

const SingleUser = () => {
const dispatch= useDispatch()
  const { wantedUser, isLoading } = useSelector((state) => state.customers)
  const { id } = useParams()
  const fullName =  wantedUser?.firstname + ' ' + wantedUser?.lastname 
  useEffect(() => {
    dispatch(getUser(id))
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
              {wantedUser ? (
                <div className="details">
                <h1 className="itemTitle">{ wantedUser.firstname + ' ' + wantedUser.lastname }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ wantedUser.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{ wantedUser.mobile }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{ wantedUser.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Blocked:</span>
                  <span className="itemValue">{ wantedUser.isBlocked === false ? 'No' : ' Yes' }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered on:</span>
                  <span className="itemValue">{ new Date(wantedUser.createdAt).toDateString() }</span>
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
        <h1 className="title">Last Transactions</h1>
          <ListUser/>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
