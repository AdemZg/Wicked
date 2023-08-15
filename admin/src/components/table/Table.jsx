import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderByUserId } from "../../features/order/orderSlice";
import { CircularProgress } from "@mui/material";



const List = () => {
  const dispatch= useDispatch()
  const { wantedOrder } = useSelector((state) => state.orders)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getOrderByUserId(id))
  },[id])
  let all = []
  for(let i = 0; i < wantedOrder?.products.length; i++){
    all.push({
      id: i+1,
      title: wantedOrder?.products[i].product.title,
      brand: wantedOrder?.products[i].product.brand,
      category: wantedOrder?.products[i].product.category,
      color: wantedOrder?.products[i].color,
      quantity: wantedOrder?.products[i].count,
      price: wantedOrder?.products[i].product.price,
      amount: wantedOrder?.products[i].product.price * wantedOrder?.products[i].count,
    })
  }
  return (
    <div>
      {wantedOrder ? (
      <TableContainer component={Paper} className="table">
          <div>
            <div className="detailItem">
          <span className="itemKey">Total Amount:</span>
          <span className="itemValue">$ {wantedOrder.paymentIntent.amount}</span>
        </div>
        <div className="detailItem">
          <span className="itemKey">Payment Method:</span>
          <span className="itemValue">{wantedOrder.paymentIntent.status}</span>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Product</TableCell>
              <TableCell className="tableCell">Brand</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell">Color</TableCell>
              <TableCell className="tableCell">Quantity</TableCell>
              <TableCell className="tableCell">Product Price</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {all.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="tableCell">{product.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {product.title}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{product.brand}</TableCell>
                <TableCell className="tableCell">{product.category}</TableCell>
                <TableCell className="tableCell">{product.color}</TableCell>
                <TableCell className="tableCell">{product.quantity}</TableCell>
                <TableCell className="tableCell">$ {product.price}</TableCell>
                <TableCell className="tableCell">$ {product.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </TableContainer>
      ) : (
        <div style={{display:'flex', justifyContent:'center'}}>
          <CircularProgress style={{color:'gray'}} />
        </div>
      )}
    </div>
  );
};

export default List;
