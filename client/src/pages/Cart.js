import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteProductFromCart, getUserCart, removeCartProduct, updateProductQuantityFromCart } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";

const Cart = () => {
    const { user, userCart, isLoading } = useSelector((state) => state.auth)
    const [productDetails, setProductDetails] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if(user){
            dispatch(getUserCart())
        }
    }, [productDetails, totalAmount, user])
    const deleteCartProduct = (id) => {
        dispatch(deleteProductFromCart(id))
        dispatch(removeCartProduct(id))
    }
    useEffect(() => {
        if(productDetails) {
            dispatch(updateProductQuantityFromCart(productDetails))
        }
    }, [productDetails])
    useEffect(() => {
        let sum = 0
        userCart?.map((product) => {
            sum = sum + (product.price * product.quantity)
        })
        setTotalAmount(sum)
    } ,[userCart])
  return (
    <div>
        <Meta title = 'Cart' />
        <BreadCrumb title='Cart'/>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss 
          draggable
          theme="light"
        />
        <section className="cart-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                {userCart ? (
                    <div className="row">
                    <div className="col-12">
                        {userCart?.length !==0 && (<div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>)}
                        {userCart?.map((product, index) => (
                            <div key={index} className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center">
                            <div className="gap-30 cart-col-1 d-flex align-items-center">
                                <div className="w-25">
                                    <img className="img-fluid" src={product?.productId?.images[0]?.url} alt="product" />
                                </div>
                                <div className="w-75">
                                    <p>{product?.productId?.title}</p>
                                    <div><ul className="colors ps-0"><p>Color: </p><li style={{backgroundColor: product?.color?.title}} ></li></ul></div>
                                </div>
                            </div>
                            <div className="cart-col-2">
                                <h5 className="price">${product?.price}</h5>
                            </div>
                            <div className="cart-col-3 d-flex gap-30 align-items-center">
                                <div><input onChange={(e) => setProductDetails({id: product?._id, quantity: e.target.value})} value={productDetails?.id === product?._id && productDetails?.quantity ? productDetails?.quantity : product?.quantity} min={1} max={10} className="form-control" type="number" /></div>
                                <div><AiFillDelete onClick={() => deleteCartProduct(product?._id)} style={{'cursor':'pointer'}} className="text-danger fs-5"/></div>
                            </div>
                            <div className="cart-col-4">
                                <h5 className="price">$ {productDetails?.id === product?._id && (product?.price * productDetails?.quantity) ? (product?.price * productDetails?.quantity) : (product?.price * product?.quantity)}</h5>
                            </div>
                        </div>
                        ))}
                    </div>
                    {userCart?.length === 0 ? (
                        <span className="text-center mt-3">You Have No Products Added To Your Cart !</span>
                    ) : (
                        <div className="col-12 py-2 mt-5">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <Link to='/product' className='button'>Continue Shopping</Link>
                                <div className="d-flex flex-column align-items-end">
                                    <h4>Subtotal: $ {totalAmount && totalAmount !== 0 && totalAmount}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to='/checkout' className="button">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                ) : isLoading ? (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <CircularProgress style={{color:'skyblue'}} /> 
                </div>
                ) : (
                    <span>Something went wrong !</span>
                )}
            </div>
        </section>
    </div>
  )
}

export default Cart