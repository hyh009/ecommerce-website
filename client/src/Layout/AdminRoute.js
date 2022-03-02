import { Navigate } from "react-router-dom";
import { AdminTopbar, AdminSidebar } from "../components";

const AdminRoute = ({ isLogged }) => {
  return isLogged ? (
    <div>
      <AdminTopbar />
      <AdminSidebar />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
