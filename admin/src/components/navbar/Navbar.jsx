import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useSelector } from "react-redux";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector((state)=>state.auth)
  const { dispatch } = useContext(DarkModeContext);
  const fullName = user?.firstname + ' ' + user?.lastname
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <span>{user?.firstname + " " + user?.lastname}</span>
          </div>
          <div className="item">
            <Avatar  {...stringAvatar(fullName)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
