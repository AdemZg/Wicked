import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Colors from "../components/Colors";
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../features/products/productSlice";
import { CircularProgress } from "@mui/material";

const Store = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState("")
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sort, setSort] = useState("")
  const [grid,setGrid] = useState(4)
  const [active,setActive] = useState(4)
  const gridActive = (num) => {
    setGrid(num)
    setActive(num)
  }
  const getAllProducts = () => {
    dispatch(getProducts({sort,tag,brand,category,minPrice,maxPrice}))
  }
  useEffect(() => {
    getAllProducts()
  }, [sort,tag,brand,category,minPrice,maxPrice])
  useEffect(() => {
    let newBrands = []
    let category = []
    let tag = []
    for (let i = 0; i < products?.length; i++) {
      const index = products[i]
      newBrands.push(index.brand)
      category.push(index.category)
      tag.push(index.tags)
    }
    setBrands(newBrands)
    setCategories(category)
    setTags(tag)
  }, [products])
  const handleRefect = () => {
    setCategory("")
    setBrand("")
    setSort("")
    setMinPrice("")
    setMaxPrice("")
    setTag("")
  }
  return (
  <div>
    <Meta title = 'Our Store' />
        <BreadCrumb title='Our Store'/>
        <div className="store-wrapper home-wrapper-2 py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-3">
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Shop By Categories</h3>
                  <div>
                    <ul className="ps-0">
                        <li className="text-dark" onClick={handleRefect}>All Products</li>
                        <li onClick={() => setCategory("Laptop")}>Laptop</li>
                        <li onClick={() => setCategory("Keyboard")}>Keyboard</li>
                        <li onClick={() => setCategory("Mouse")}>Mouse</li>
                        <li onClick={() => setCategory("Chair")}>Chair</li>
                        <li onClick={() => setCategory("Headset")}>Headset</li>
                    </ul>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Filter By</h3>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label" htmlFor="">In Stock ({products?.length})</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label" htmlFor="">Out of Stock (0)</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex gap-10">
                    <div className="form-floating ">
                      <input onChange={(e) => setMinPrice(e.target.value) } type="number" class="form-control" id="floatingInput" placeholder="From" />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating ">
                      <input onChange={(e) => setMaxPrice(e.target.value) } type="number" class="form-control" id="floatingInput1" placeholder="To" />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Product Tags</h3>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10"> 
                    {tags && [...new Set(tags)].map((tag,index) => (
                        <span style={{ cursor:'pointer' }} onClick={() => setTag(tag)} key={index} className="badge bg-light text-secondary rounded-3 py-2 px-3">{tag}</span>
                      ))}
                  </div>
                </div>
                <div className="filter-card mb-3">
                  <h3 className="filter-title">Shop By Brand</h3>
                  <div>
                    <ul className="ps-0">
                        <li onClick={() => setBrand("Asus")}>Asus</li>
                        <li onClick={() => setBrand("HP")}>HP</li>
                        <li onClick={() => setBrand("Lenovo")}>Lenovo</li>
                        <li onClick={() => setBrand("Razor")}>Razor</li>
                        <li onClick={() => setBrand("Logitech")}>Logitech</li>
                        <li onClick={() => setBrand("Simple Deluxe")}>Simple Deluxe</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="filter-sort-grid mb-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-10">
                      <p className="mb-0 w-50">Sort By:</p>
                      <select onChange={(e) => setSort(e.target.value)} defaultValue={"best-selling"} className="form-control form-select" name="" id="">
                        <option value="title">Alphabetically, A-Z</option>
                        <option value="-title">Alphabetically, Z-A</option>
                        <option value="price">Price, low to high</option>
                        <option value="-price">Price, high to low</option>
                        <option value="createdAt">Date, old to new</option>
                        <option value="-createdAt">Date, new to old</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center gap-10">
                      <p className="totalproducts mb-0">{products.length}</p>
                      <div className="d-flex gap-10 align-items-center grid">
                        <img onClick={()=>gridActive(3)} className={active === 3 ?" active d-block img-fluid" : "d-block img-fluid"} src="/images/gr4.svg" alt="grid" />
                        <img onClick={()=>gridActive(4)} className={active === 4 ?" active d-block img-fluid" : "d-block img-fluid"} src="/images/gr3.svg" alt="grid" />
                        <img onClick={()=>gridActive(6)} className={active === 6 ?" active d-block img-fluid" : "d-block img-fluid"} src="/images/gr2.svg" alt="grid" />
                        <img onClick={()=>gridActive(12)} className={active === 12 ?" active d-block img-fluid" : "d-block img-fluid"} src="/images/gr.svg" alt="grid"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="products-list pb-5">
                  {products ? (
                    <div className="d-flex flex-wrap gap-10">
                    {products?.map((product, index) => (
                      <ProductCard key={index} product={product} grid={grid} />
                    ))}
                  </div>
                  ) : (
                    <div style={{display:'flex', justifyContent:'center'}}>
                      <CircularProgress style={{color:'skyblue'}} />
                    </div>
                  )}
              </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Store