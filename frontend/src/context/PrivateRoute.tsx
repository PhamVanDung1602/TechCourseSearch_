import { useContext, useEffect } from "react";
import { LoginState } from "./LoginState";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isExpired } from "react-jwt";
import { PageState } from "./PageState";
import RequireUser from "./components/RequireUser";

export function isAuthenticated() {
  // Kiểm tra xem token có tồn tại và hợp lệ không
  const token = localStorage.getItem('token');
  const isMyTokenExpired = isExpired(token ?? '');
  return token !== null && !isMyTokenExpired;
}

const PrivateRoute = () => {
  const { isLoggedIn, updateLoginStatus } = useContext(LoginState);
  const { setCurrentPage } = useContext(PageState);

  const location = useLocation();
  const page = location.pathname;

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem('token');
      updateLoginStatus(false);
      setCurrentPage('/');
    }
  }, [isLoggedIn,setCurrentPage, updateLoginStatus]);

  return (isLoggedIn) ? <Outlet /> : <Navigate to={`${page}`} replace />;
};

const PrivateUserRoute = RequireUser(PrivateRoute);

export default PrivateUserRoute;