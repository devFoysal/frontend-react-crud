import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoutes = () => {
    const location = useLocation();


    return false
        ? <Outlet />
        : <Navigate to="/" replace state={{ from: location }} />;
}

export default PublicRoutes