import Layout from "./hoc/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Products from "./pages/Products";
import DashboardProducts from "./pages/Dashboard/Products";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import DashboardLayout from "./hoc/DashboardLayout";
import PublicRoutes from "./components/Routes/PublicRoutes";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      {/* {auth && (
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<PrivateRoutes />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<DashboardProducts />} />
            </Route>
          </Routes>
        </DashboardLayout>
      )} */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

    </>

  );
}

export default App;
