import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";

const SpecialProductCard = ({product}) => {
  return (
    <div className="col-6">
        <div className="special-product-card mb-3">
            <div className="d-flex justify-content-between">
                <div style={{margin:'auto', paddingRight:'30px'}}>
                    <img height={400} width={400} src={product?.images[0].url ? product?.images[0].url : "/images/invalid.jpg"} className="img-fluid" alt="watch" />
                </div>
                <div className="special-product-content">
                    <h6 className="brand">{product?.brand}</h6>
                    <h5 className="title">{product?.title}</h5>
                    <ReactStars count={5} value={product?.totalRating} size={18} edit={false} activeColor="#ffd700"/>
                    <p className="price">
                        <span className="red-p">${product?.price}</span> &nbsp; <strike>$200</strike>
                    </p>
                    <div className="discount-till d-flex align-items-center gap-10">
                        <p className="mb-0"><b>5</b> Days</p>
                        <div className="d-flex gap-1">
                            <span className="badge   bg-danger">01</span>:
                            <span className="badge   bg-danger">20</span>:
                            <span className="badge   bg-danger">20</span>
                        </div>
                    </div>
                    <div className="prod-count my-3">
                        <p style={{fontSize:'13px', color:'gray'}}>Products: {product?.quantity}</p>
                        <div style={{height:'8px'}} className="progress">
                            <div className="progress-bar" role="progressbar" 
                            style={{width: product?.quantity / product?.quantity + product?.sold * 100 +"%", backgroundColor:'#FF5733'}} 
                            aria-valuenow={product?.quantity / product?.quantity + product?.sold * 100} 
                            aria-valuemin={product?.quantity} 
                            aria-valuemax={product?.sold + product?.quantity}>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',justifyContent:'end'}}>
                        <Link to={`/product/${product?._id}`} style={{padding:'10px 10px' ,fontSize:'13px'}} className='button'>View</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialProductCard