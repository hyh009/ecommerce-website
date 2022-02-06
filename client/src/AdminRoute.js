import { Navigate } from "react-router-dom";
import { AdminTopbar, AdminSidebar } from "./components";

const AdminRoute = ({ isLogged }) => {
  return isLogged ? (
    <div>
      <AdminTopbar />
      <AdminSidebar />
    </div>
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoute;
