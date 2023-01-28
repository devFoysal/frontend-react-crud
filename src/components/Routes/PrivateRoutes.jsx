import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ user }) => {
    const location = useLocation();


    return user
        ? <Outlet />
        : <Navigate to="/signin" replace state={{ from: location }} />;
}

export default PrivateRoutes