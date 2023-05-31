import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children = <div>Not Found</div> }) => {
    const token = useSelector((state) => state.token);
    if (!token) return <Navigate to="/sign-in" replace />;
    return children;
};

export default RequireAuth;
