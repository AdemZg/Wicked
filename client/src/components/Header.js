import { NavLink,Link, useNavigate } from "react-router-dom"
import { BsSearch} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getUserCart } from "../features/user/userSlice"
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { getProduct, getProducts } from "../features/products/productSlice"

const Header = () => {
  const dispatch = useDispatch()
  const { userCart, user } = useSelector((state) => state.auth)
  const { products } = useSelector((state) => state.products)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [totalAmount, setTotalAmount] = useState(null)
  const [paginate, setPaginate] = useState(true)
  const [productOpt, setProductOpt] = useState([])
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }
  useEffect(() => {
    if(user){
      dispatch(getUserCart())
    }
  },[user])
  useEffect(() => {
    let sum = 0
        userCart?.map((product) => {
            sum = sum + (product.price * product.quantity)
        })
        setTotalAmount(sum)
  }, [userCart])
  useEffect(() => {
    let data = []
    for (let i = 0; i < products?.length; i++) {
      data.push({
        id: i,
        product: products[i]?._id,
        name: products[i]?.title
      }) 
    }
    setProductOpt(data)
  },[products])
  useEffect(() => {
    let category = []
    for (let i = 0; i < products?.length; i++) {
      const index = products[i]
      category.push(index.category)
    }
    setCategories(category)
  }, [products])
  useEffect(() => {
    dispatch(getProducts({category}))
  }, [category])
  return (
    <div>
      <header style={{borderBottom:'2px solid white'}} className="header-upper py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2 ><Link to='/' className="text-white">Wicked</Link></h2>
            </div>
            <div className="col-5">
            <div className="input-group">
              <Typeahead minLength={2} onChange={(selected) => {
                navigate(`/product/${selected[0]?.product}`)
                dispatch(getProduct(selected[0]?.product))}} labelKey={"name"} options={productOpt} onPaginate={paginate} id="pagination-example"  placeholder="Search Products..." />
              <span className="input-group-text" id="basic-addon2"><BsSearch className="fs-6" /></span>
            </div>
            </div>
            <div className="col-5">
              <div style={{gap:'50px'}} className="header-upper-links d-flex align-items-center">
                <div>
                  <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/wishlist.svg" alt="whislist" />
                    <p className="mb-0">Favorite<br/>Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={!user ? "/login" : "/profile"} className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/user.svg" alt="" />
                    {user ? (
                      <div className="dropdown">
                      <button type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'transparent', border:'none', color:'white'}} className="mb-0">{user?.firstname}<br/>{user?.lastname}</button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li><Link className="dropdown-item text-white" to='/profile' >Account Details</Link></li>
                        <li><Link onClick={handleLogout} className="dropdown-item text-white">Logout</Link></li>
                      </ul>
                    </div>
                    ) : (
                      <p className="mb-0">Login<br/>Sign up</p>
                    )}
                  </Link>
                </div>
                { user && <div>
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                    <img src="/images/cart.svg" alt="" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">{userCart?.length}</span>
                      {userCart && userCart?.length !== 0 && <p className="mb-0">$ {totalAmount}</p>}
                    </div>
                  </Link>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/images/menu.svg" alt="" />
                    <span className="">Shop Categories</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("")}>All Products</li>
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("Laptop")}>Laptop</li>
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("Keyboard")}>Keyboard</li>
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("Mouse")}>Mouse</li>
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("Chair")}>Chair</li>
                        <li style={{cursor:"pointer"}} className="text-white dropdown-item" onClick={() => setCategory("Headset")}>Headset</li>
                  </ul>
                </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15 ">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/product'>Store</NavLink>
                    <NavLink to='/orders'>Orders</NavLink>
                    <NavLink to='/blogs'>Blogs</NavLink>
                    <NavLink to='/contact'>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header