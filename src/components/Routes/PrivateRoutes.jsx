import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoutes = () => {
    const location = useLocation();
    const cookies = new Cookies();
    return (cookies.get('isAuthenticated') && cookies.get('isAuthenticated') === 'true')
        ? <Outlet />
        : <Navigate to="/signin" replace state={{ from: location }} />;
}

export default PrivateRoutes