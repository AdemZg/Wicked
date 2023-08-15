import { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux"
import { getUserWishlist, removeItem } from "../features/user/userSlice";
import { CircularProgress } from "@mui/material";
import { addToWishlist } from "../features/products/productSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    const dispatch = useDispatch()
    const { wishlist, user } = useSelector((state) => state.auth)
    const allProducts = wishlist?.wishlist
    const getAllWishlistProducts = () => {
        dispatch(getUserWishlist())
    }
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id))
        dispatch(removeItem(id))
        setTimeout(() => {
            toast.error("Product has been deleted from your wishlist !")
          },100)
    }
    useEffect(() => {
        if(user){
            getAllWishlistProducts()
        }
    }, [user])
  return (
    <div>
        <Meta title = 'Wishlist' />
        <BreadCrumb title='Wishlist'/>
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
        <div className="wishlist-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                {allProducts ? (
                <div className="row">
                    {allProducts?.map((product) => (
                    <div key={product._id} className="col-3">
                        <div className="wishlist-card position-relative">
                        <img onClick={() => removeFromWishlist(product?._id)} src="/images/cross.svg" alt="cross" className="position-absolute cross img-fluid"/>
                            <div className="wishlist-card-image bg-white">
                                <img width={200} className="img-fluid d-block mx-auto" src={product?.images[0].url ? product?.images[0].url : "/images/invalid.jpg"} alt="watch" />
                            </div>
                            <div className="py-3 px-3">
                                <h5 className="title">{product?.title}</h5>
                                <h6 className="priice">${product?.price}</h6>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <CircularProgress style={{color:'skyblue'}} /> 
                    </div>
                )}
                {allProducts?.length === 0 && (
                    <span style={{display:'flex', justifyContent:'center'}}>You don't Have Any Products Added To Your Wishlist</span>
                )}
            </div>
        </div>
    </div>
  )
}

export default Wishlist