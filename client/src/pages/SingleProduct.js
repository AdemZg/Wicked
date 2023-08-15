import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb"
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from 'react-image-magnify';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Colors from "../components/Colors";
import { TbGitCompare } from 'react-icons/tb'
import { MdContentCopy } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getProduct, getProducts, rateProduct } from "../features/products/productSlice";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Heart from "react-heart";
import { addToCart, getUserCart, getUserWishlist } from "../features/user/userSlice";

const SingleProduct = () => {
    const { products, wantedProduct, isSuccess, isLoading, rating } = useSelector((state) => state.products)
    const { wishlist, userCart, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const img = wantedProduct?.images[0]?.url ? wantedProduct?.images[0]?.url : "/images/invalid.jpg"
    const [star, setStar] = useState(null)
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(false)
    const [commentError, setCommentError] = useState(false)
    const [orderedProduct, setOrderedProduct] = useState(true)
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const allProducts = wishlist?.wishlist
    let all = []
    for(let i = 0; i < allProducts?.length; i++) {
        all.push(allProducts[i]?._id)
    }
    let result = all.includes(wantedProduct?._id)
    if(all.length === 0) result = false
    const [active, setActive] = useState(false)
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
    const rateThisProduct = () => {
        const data = { prodId : id, star:star, comment: comment }
        if(!star){
            setError(true)
            return false
        }
        else if(!comment){
            setCommentError(true)
            return false
        }
        else{
            setError(false)
            setComment(false)
            dispatch(rateProduct(data))
            setOpen(false)
            toast.success("You Have Successfully Submited Your Review, Thank you !")
        }
    }
    const getAllWishlistProducts = () => {
        dispatch(getUserWishlist())
    }
    const getCart = () => {
        dispatch(getUserCart())
    }
    const copyToClipboard = (text) => {
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
      const getSingleProduct =  () => {
        dispatch(getProduct(id))
        dispatch(getProducts())
      }
      const manageHeart = () => {
        setTimeout(() => {
            getAllWishlistProducts()
        }, 1000)
        addToWishlistProduct(wantedProduct?._id)
    }   
    const addProductToCart = () => {
        if(color === null){
            toast.error('Please choose a color')
            return false
        }
        else{
            const cart = { productId: id, color: color, quantity: quantity, price: wantedProduct?.price}
            dispatch(addToCart(cart))
            setTimeout(() => {
                getCart()
            },500)
        }
    } 
      useEffect(() => {
        getSingleProduct()
        if(user){
            getAllWishlistProducts()
        }
      }, [id, user]) 
      useEffect(() => {
        if(user){
            getCart()
        }
      },[user])
      useEffect(() => {
        for(let i = 0; i < userCart?.length; i++) {
            if(userCart[i]?.productId?._id === id){
                setAlreadyAdded(true)
            }
        }
      }, [userCart])
  return (
    <div>
        <Meta title = {wantedProduct?.title} />
        <BreadCrumb title={wantedProduct?.title}/>
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
        <div className="main-product-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                {isSuccess ? (
                <div className="row all">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                            <ReactImageMagnify style={{padding:'10px'}} {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: img
                                },
                                largeImage: {
                                    src: img,
                                    width: 1200,
                                    height: 1800
                                }
                            }} />                           
                             </div>
                             <div className={wantedProduct?.images?.length === 1 ? "other-product-images d-flex flex-wrap gap-15 justify-content-center d-none" : "other-product-images d-flex flex-wrap gap-15 justify-content-center"}>
                             {wantedProduct?.images && wantedProduct?.images?.map((image) => (
                                <div key={image.public_id} style={{width:'180px', height:'180px'}}><img className="img-fluid" src={image?.url ? image?.url : "/images/invalid.jpg"} alt="" /></div>
                                ))}
                             </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3>{wantedProduct?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">${wantedProduct?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars count={5} value={wantedProduct?.totalRatings} size={17} edit={false} activeColor="#ffd700"/>
                                    <p className="mb-0 nreviews">(2 Reviews)</p>
                                </div>
                                <a className="text-decoration-underline mt-2" onClick={()=>setOpen(true)} href="#review">Write a Review</a>
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="mb-0 product-heading">Brand :</h3>
                                    <p className="mb-0 product-data">{wantedProduct?.brand}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="mb-0 product-heading">Category :</h3>
                                    <p className="mb-0 product-data">{wantedProduct?.category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="mb-0 product-heading">Tags :</h3>
                                    <p className="mb-0 product-data">{wantedProduct?.tags}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className="mb-0 product-heading">Availability :</h3>
                                    <p className="mb-0 product-data">In Stock</p>
                                </div>
                                {!alreadyAdded && (
                                <div className="d-flex gap-10 flex-column mt-2 my-3">
                                    <h3 className="mb-0 product-heading">Color :</h3>
                                    <Colors setColor={setColor} colors={wantedProduct?.color} />
                                </div>
                                )}
                                <div className="d-flex flex-column gap-10 my-3">
                                    {!alreadyAdded && (
                                    <>
                                        <div className="d-flex gap-15 align-items-center">
                                            <h3 className="mb-0 product-heading">Quantity :</h3>
                                            <div>
                                                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" min={1} max={10} type="number" style={{'width':'70px'}} />
                                            </div>
                                        </div>
                                    </>
                                    )}
                                    <div className="d-flex justify-content-end">
                                        {!alreadyAdded ? (
                                            <button onClick={() => addProductToCart()} type="submit" className="button border-0">Add to cart</button>
                                        ) : (
                                            <button onClick={() => navigate('/cart')} className="button border-0">Go To Cart</button>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-30 my-4">
                                    <div>
                                    <div style={{cursor:'pointer'}} className="d-flex gap-10 align-items-center">
                                        <div style={{width:'1rem'}}>
                                            <Heart onClick={() => manageHeart()} isActive={result ? result : active}/>
                                        </div>
                                        <p style={{color:'#777777', fontSize:'14px'}} className="mb-0">{!result ? "Add To Wishlist" : "Product Added To Your Wishlist"}</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="d-flex gap-10 flex-column mt-5">
                                    <h3 className="mb-0 product-heading">Shipping & Returns :</h3>
                                    <p className="mb-0 product-data">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ex nobis quo facilis, iusto quae enim omnis, illo repellat rem aspernatur sit neque explicabo eos cupiditate! Quis dolores officiis maxime.</p>
                                </div>
                                <div className="d-flex gap-15 mt-3">
                                    <h3 className="mb-0 product-heading">Copy Product Link :</h3>
                                    <MdContentCopy style={{'cursor':'pointer'}} onClick={()=>{
                                        toast.success("Product Link Has Been Copied !")
                                        copyToClipboard(window.location.href)
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : isLoading ? (
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <CircularProgress style={{color:'skyblue'}} /> 
                    </div>
                ) : (
                    <span>Something went wrong !</span>
                )}
            </div>
        </div>
        <section className="description-wrapper py-2 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Description</h3>
                        <div className="description-inner-wrapper"> 
                            <p dangerouslySetInnerHTML={{ __html: wantedProduct?.description  }} className="mb-0"></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="review" className="reviews-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                    <h3 className="section-heading">Reviews</h3>
                        <div className=" reviews-inner-wrapper">
                        <div className="reviews-head d-flex justify-content-between align-items-end">
                            <div>
                                <h4 className="mb-2">Customer Reviews</h4>
                                <div className="d-flex gap-10 align-items-center">
                                    <ReactStars count={5} value={wantedProduct?.totalRatings} size={17} edit={false} activeColor="#ffd700"/>
                                    <p className="mb-0">Based on 2 Reviews</p>
                                </div>
                            </div>
                            {orderedProduct && (                            
                            <div>
                                <Link onClick={()=>setOpen(!open)} className="text-dark text-decoration-underline">Write a Review</Link>
                            </div>
                            )}
                        </div>
                        {open && (
                        <div className="reviews-form">
                        <h4 className="mb-2 mt-4">Write a Review</h4>
                        <form action="" className="d-flex flex-column gap-15">
                            <div>
                                <ReactStars onChange={(e) => setStar(e)} count={5} value={star} size={24} edit={true} activeColor="#ffd700"/>
                            </div>
                            {error && (<span style={{fontSize:'13px', color:'red'}} className="error">Please Make Sure You Rate This Product Before You Submit</span>)}
                            <div>
                                <textarea onChange={(e) => setComment(e.target.value)} placeholder="Comments" className="w-100 form-control" name="" id="" cols="30" rows="4"></textarea>
                            </div>
                            {commentError && (<span style={{fontSize:'13px', color:'red'}} className="error">Please Make Sure You Rate This Product Before You Submit</span>)}
                            <div className="d-flex justify-content-end">
                                <button type="button" onClick={rateThisProduct} className="button border-0">Submit Review</button>
                            </div>
                        </form>
                        </div>)}
                        {wantedProduct?.ratings?.length === 0 ? (
                            <div className="mt-3 d-flex justify-content-center">
                                <span className="mt-3">No Ratings for this Product</span>
                            </div>
                        ) : (
                        <div className="reviews">
                            {wantedProduct?.ratings?.map((rating, index) =>(
                            <div key={index} className="review">
                                <div className="d-flex gap-10 align-items-center mt-4">
                                    <h6>Leon Shadell</h6>
                                    <ReactStars count={5} value={rating?.star} size={17} edit={false} activeColor="#ffd700"/>
                                </div>
                                <p className="mt-1">{rating?.comment}</p>
                            </div>
                            ) ) }
                        </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="popular-wrapper pb-5 pt-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <h3 className="section-heading">Our Popular Products</h3>
              {products ? (
            <div className="row">
                {products?.map((product) => {
                    if(product?.tags === "popular" && product?._id !== id) return <ProductCard key={product._id} product={product} />
                })}
            </div>
              ) : isLoading ? (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <CircularProgress style={{color:'skyblue'}} /> 
                </div>
              ) : (
                <span>Couldn't get Products</span>
              ) }
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleProduct