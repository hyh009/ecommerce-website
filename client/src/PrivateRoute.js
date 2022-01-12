import { Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const PrivateRoute = ({ isLogged }) => {
  return isLogged ? (
    <div>
      <Nav position="static" />
      <Sidebar />
      <Footer background="#f0eeee" />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
