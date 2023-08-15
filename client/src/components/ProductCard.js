import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addToWishlist } from "../features/products/productSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Heart from "react-heart"
import { useEffect, useState } from "react";
import { getUserWishlist } from "../features/user/userSlice";


const ProductCard = ({grid, product}) => {
    const { wishlist,user } = useSelector((state) => state.auth)
    const allProducts = wishlist?.wishlist
    let all = []
    for(let i = 0; i < allProducts?.length; i++) {
        all.push(allProducts[i]?._id)
    }
    let result = all.includes(product?._id)
    if(all.length === 0) result = false
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const addToWishlistProduct = (id) => {
        dispatch(addToWishlist(id))
        setTimeout(() => {
            if(!result){
                setActive(true)
                toast.success("Product has been added to your wishlist !")
            }
            else{
                setActive(false)
                toast.error("Product has been deleted from your wishlist !")
            }
          }, 1000)
    }
    const getAllWishlistProducts = () => {
        dispatch(getUserWishlist())
    }
    useEffect(() => {
        if(user){
            getAllWishlistProducts()
        }
    }, [user])
    const manageHeart = () => {
        setTimeout(() => {
            getAllWishlistProducts()
        }, 1000)
        addToWishlistProduct(product._id)
    }
  return (
    <div className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3 mb-2"}`}>
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
        <div style={{height: `${grid === 12 ? '300px' : grid === 6 ? '540px' : grid === 4 ? '380px' : '370px'}`}} to={`/product/${product?._id}`} className="product-card position-relative">
            <div className={"wishlist-icon position-absolute"}>
                <div style={{width:'1rem'}}>
                    <Heart onClick={() => manageHeart()} isActive={result ? result : active}/>
                </div>
            </div>
            <div style={{width: grid === 12 ? '250px' : grid === 4 ? '300px' : '400px', height: grid === 6  ? '270px' : '200px', paddingRight:'20px'}} className="product-image">
                <img style={{objectFit:'contain', width: location.pathname === "/" ? "180px" : '', height:'100%'}}  src={product?.images[0].url ? product?.images[0].url : "/images/invalid.jpg"} alt="product" />
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', paddingRight: grid === 12 ? '20px': '0px'}} className="product-details">
                <h6 style={{height:'10px'}} className="brand">{product?.brand}</h6>
                <h5 style={{height:'40px'}} className="product-title">{product?.title.substr(0,40) + "..."}</h5>
                <ReactStars style={{height:'30px'}} count={5} value={product?.totalRating} size={18} edit={false} activeColor="#ffd700"/>
                <p style={{height:'70px'}} className={grid === 12 ? "description" : grid === 6 ? "description mt-2" : "d-none"} dangerouslySetInnerHTML={{ __html: product?.description.substr(0,120) + "..."}}></p>
                <p style={{height:'20px', color:'crimson'}} className="price">${product?.price}</p>
            </div>
            <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                    <Link to={`/product/${product?._id}`}><img src="/images/view.svg" alt="view" /></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard