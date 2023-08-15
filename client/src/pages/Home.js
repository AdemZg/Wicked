import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProductCard from "../components/SpecialProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { getProducts } from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const loadingProduct = useSelector((state) => state.products.isLoading)
  const { blogs, isLoading, isError } = useSelector((state) => state.blogs)
    const getAllBlogs = () => {
        dispatch(getBlogs())
    }
    const getAllProducts = () => {
      dispatch(getProducts())
    }
    useEffect(() => {
        getAllBlogs()
        getAllProducts()
    },[])
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="main-banner py-3 position-relative">
                <img className="img-fluid rounded" src="/images/main-banner.jpg" alt="mainbanner" />
                <div className="main-banner-content position-absolute">
                  <h4>Super charged for pros</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>FROM $999.00 or <br/> $41.62/mo.</p>
                  <Link className="button mt-4">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="small-banner py-2 position-relative">
                  <img className="img-fluid rounded" src="/images/catbanner-01.jpg" alt="mainbanner" />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sale</h4>
                    <h5>Laptops Max</h5>
                    <p>FROM $999.00 or <br/> $41.62/mo.</p>
                  </div>
                </div>
                <div className="small-banner py-2 position-relative">
                  <img className="img-fluid rounded" src="/images/catbanner-02.jpg" alt="mainbanner" />
                  <div className="small-banner-content position-absolute">
                    <h4>new arrival</h4>
                    <h5>iPhone 14 Max</h5>
                    <p>FROM $999.00 or <br/> $41.62/mo.</p>
                  </div>
                </div>
                <div className="small-banner py-2 position-relative">
                  <img className="img-fluid rounded" src="/images/catbanner-03.jpg" alt="mainbanner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>FROM $999.00 or <br/> $41.62/mo.</p>
                  </div>
                </div>
                <div className="small-banner py-2 position-relative">
                  <img className="img-fluid rounded" src="/images/catbanner-04.jpg" alt="mainbanner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro</h5>
                    <p>FROM $999.00 or <br/> $41.62/mo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex gap-15 align-items-center"><img src="/images/service.png" alt="services" /><div className="d-flex flex-column "><h6>Free Shipping</h6><p className="mb-0">Fromm all orders over $5</p></div></div>
                <div className="d-flex gap-15 align-items-center"><img src="/images/service-02.png" alt="services" /><div className="d-flex flex-column "><h6>Daily Surprise Offers</h6><p className="mb-0">Shop with an expert</p></div></div>
                <div className="d-flex gap-15 align-items-center"><img src="/images/service-03.png" alt="services" /><div className="d-flex flex-column "><h6>Support 24/7</h6><p className="mb-0">Shop with an expert</p></div></div>
                <div className="d-flex gap-15 align-items-center"><img src="/images/service-04.png" alt="services" /><div className="d-flex flex-column "><h6>Affordable Prices</h6><p className="mb-0">Get Factory Default Price</p></div></div>
                <div className="d-flex gap-15 align-items-center"><img src="/images/service-05.png" alt="services" /><div className="d-flex flex-column "><h6>Secure Payments</h6><p className="mb-0">100% Protected</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          {products && (
          <div className="row">
            <h3 className="section-heading">Featured Collection</h3>
            <div className="row">
              {products.map((product, index) => {
                  if(product.tags === "featured") return <ProductCard product={product} key={index} />
                })}
            </div>
          </div>
          )}
          {loadingProduct && (
              <div style={{display:'flex', justifyContent:'center'}}>
                <CircularProgress style={{color:'skyblue'}} /> 
            </div>
            )}
        </div>
      </section>
      <div className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          {products && (
            <div className="row">
              <h3 className="section-heading">Special Products</h3>
              <div className="row">
                {products.map((product, index) => {
                  if(product.tags === "special") return <SpecialProductCard product={product} key={index} />
                })}
              </div>
            </div>
            )}
            {loadingProduct && (
              <div style={{display:'flex', justifyContent:'center'}}>
                <CircularProgress style={{color:'skyblue'}} /> 
            </div>
            )}
        </div>
      </div>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            {products && (
            <div className="row">
              <h3 className="section-heading">Our Popular Products</h3>
              <div className="row">
                {products.map((product, index) => {
                  if(product.tags === "popular") return <ProductCard product={product} key={index} />
                })}
              </div>
            </div>
            )}
            {loadingProduct && (
              <div style={{display:'flex', justifyContent:'center'}}>
                <CircularProgress style={{color:'skyblue'}} /> 
            </div>
            )}
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <img className="mx-4" src="/images/brand-01.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-02.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-03.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-04.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-05.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-06.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-07.png" alt="brand" />
                  <img className="mx-4" src="/images/brand-08.png" alt="brand" />
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            {blogs && (
            <div className="row">
            <h3 className="section-heading">Our Lastest News</h3>
              <div className="row">
              {blogs?.map((blog, index) => {
                if(index < 3) return (
                  (
                    <div key={index} className="col-4 mb-3">
                      <BlogCard blog={blog} />
                    </div> 
                  )
                )
              })}
              </div>
            </div>
            )}
            {isLoading && (
              <div style={{display:'flex', justifyContent:'center'}}>
                <CircularProgress style={{color:'skyblue'}} /> 
              </div>
            )}   
            {isError && (
              <span style={{display:'flex', justifyContent:'center'}}>Something went wrong !</span>
            )}  
          </div>
      </section>
    </>
  )
}

export default Home