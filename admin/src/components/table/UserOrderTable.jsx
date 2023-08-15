import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUserOrders } from "../../features/order/orderSlice";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ListUser = () => {
    const dispatch= useDispatch()
    const { isLoading, userOrders } = useSelector((state) => state.orders)
    const { id } = useParams()
    useEffect(() => {
        dispatch(getAllUserOrders(id))
    },[id])
  return (
    <div>
      {userOrders ? (
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Products</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
              <TableCell className="tableCell"> {order.products.length}</TableCell>
              <TableCell className="tableCell">{new Date(order.createdAt).toUTCString()}</TableCell>
              <TableCell className="tableCell">$ {order.paymentIntent.amount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${order.paymentIntent.status}`}>{order.paymentIntent.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
      ) : (
        <CircularProgress style={{color:'gray'}} />
      )}
        
    </div>
  );
};

export default ListUser;
