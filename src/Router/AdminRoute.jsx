import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Context/AuthContext";
import FullPageLoader from "../Shared/FullPageLoader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <FullPageLoader />;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
