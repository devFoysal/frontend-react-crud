import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();


    return false
        ? <Outlet />
        : <Navigate to="/signin" replace state={{ from: location }} />;
}

export default PrivateRoutes