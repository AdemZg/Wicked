import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import StoreIcon from "@mui/icons-material/Store";
import PaletteIcon from '@mui/icons-material/Palette';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookIcon from '@mui/icons-material/Book';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";



const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const logoutDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("admin")
    window.location.reload()
  }
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Wicked</span>
        </NavLink>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
              <span>Customers</span>
            </li>
          </NavLink>
          <NavLink to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/blogs" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Blogs</span>
            </li>
          </NavLink>
          <NavLink to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingCartIcon className="icon" />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/coupons" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Coupons</span>
            </li>
          </NavLink>
          <NavLink to="/product-categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Product Categories</span>
            </li>
          </NavLink>
          <NavLink to="/blog-categories" style={{ textDecoration: "none" }}>
            <li>
              <WorkspacesIcon className="icon" />
              <span>Blog Categories</span>
            </li>
          </NavLink>
          <NavLink to="/brands" style={{ textDecoration: "none" }}>
            <li>
              <LabelImportantIcon className="icon" />
              <span>Brands</span>
            </li>
          </NavLink>
          <NavLink to="/colors" style={{ textDecoration: "none" }}>
            <li>
              <PaletteIcon className="icon" />
              <span>Colors</span>
            </li>
          </NavLink>
          <NavLink to="/enquiries" style={{ textDecoration: "none" }}>
            <li>
              <MarkAsUnreadIcon className="icon" />
              <span>Enquiries</span>
            </li>
          </NavLink>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <NavLink to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </NavLink>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
