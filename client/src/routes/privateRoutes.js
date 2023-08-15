import { Navigate } from "react-router-dom";


export const PrivateRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    return getTokenFromLocalStorage?.token ? children : (<Navigate to='/login' replace={true}/>)
}