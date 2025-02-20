
import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>; // ✅ Show a loading state
  }

  return user ? children : <Navigate to="/login" replace />; // ✅ Redirect if not logged in
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

