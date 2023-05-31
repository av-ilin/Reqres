import { useSelector } from "react-redux";

const RequireAuth = ({ children = <div>Not Found</div> }) => {
    const token = useSelector((state) => state.token);
    if (token) return children;
    return <div>Not Found</div>;
};

export default RequireAuth;
