import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import Product from "./pages/product/Product";
import Order from "./pages/order/Order"
import Blog from "./pages/blog/Disgusting";
import Enquiry from "./pages/enquiries/Enquiry"
import AddP from "./pages/new/AddProduct";
import Brand from "./pages/brand/Brand";
import AddBrand from "./pages/new/AddBrand";
import Color from "./pages/color/Color";
import ProductCategory from "./pages/category/Product-Category";
import BlogCategory from "./pages/category/Blog-Category";
import AddBcat from "./pages/new/AddBcat";
import AddPcat from "./pages/new/AddPcat";
import AddColor from "./pages/new/AddColor";
import AddB from "./pages/new/AddBlog";
import Coupon from "./pages/coupon/Coupon";
import AddCoupon from "./pages/new/AddCoupon";
import UpdateProduct from "./pages/updates/UpdateProduct";
import UpdateBlog from "./pages/updates/UpdateBlog";
import UpdateBrand from "./pages/updates/UpdateBrand";
import UpdateCoupon from "./pages/updates/UpdateCoupon";
import UpdatePcat from "./pages/updates/UpdatePcat";
import UpdateBcat from "./pages/updates/UpdateBcat";
import ViewEnquiry from "./pages/view/viewEnquiry";
import SingleUser from "./pages/single/SingleUser";
import Profile from "./pages/profile/Profile";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const  { user }  = useSelector((state)=>state.auth)
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}  />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":id" element={<SingleUser />} />
            </Route>
            <Route path="/products">
              <Route index element={<Product />} />
              <Route path=":id" element={<UpdateProduct />} />
              <Route
                path="new"
                element={<AddP />}
              />
            </Route>
              <Route path="/brands">
                <Route index element={<Brand />} />
                <Route path=":id" element={<UpdateBrand />} />
                <Route
                  path="new"
                  element={<AddBrand />}
                />
            </Route>
            <Route path="/coupons">
                <Route index element={<Coupon />} />
                <Route path=":id" element={<UpdateCoupon />} />
                <Route
                  path="new"
                  element={<AddCoupon />}
                />
            </Route>
            <Route path="/orders">
                <Route index element={<Order />} />
                <Route path=":id" element={<Single />} />
            </Route>
            <Route path="/enquiries">
                <Route index element={<Enquiry />} />
                <Route path=":id" element={<ViewEnquiry />} />
            </Route>
            <Route path="/product-categories">
                <Route index element={<ProductCategory />} />
                <Route path=":id" element={<UpdatePcat />} />
                <Route
                  path="new"
                  element={<AddPcat />}
                />
            </Route>
            <Route path="/blog-categories">
                <Route index element={<BlogCategory />} />
                <Route path=":id" element={<UpdateBcat />} />
                <Route
                  path="new"
                  element={<AddBcat />}
                />
            </Route>
            <Route path="/colors">
                <Route index element={<Color />} />
                <Route
                  path="new"
                  element={<AddColor />}
                />
            </Route>
            <Route path="/blogs">
                <Route index element={<Blog />} />
                <Route path=":id" element={<UpdateBlog />} />
                <Route
                  path="new"
                  element={<AddB />}
                />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
