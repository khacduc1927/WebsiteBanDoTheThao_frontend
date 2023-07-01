import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Basket, Error, Login, Register, Account, Search, ViewProductList, ViewProductSingle, ViewCategoryProductList, ViewBrandProductList } from "./views/index";
import { Navbar, Footer } from "./components/common/index";
import { route } from "./constants/index";
import { useAuthContext } from './context/authContext';
import ProtectedRoute from './routers/ProtectedRoute';
import PublicRoute from './routers/PublicRoute';
import Confirm from './views/basket/Confirm';
import ChangeInformation from './views/account/ChangeInformation';
import ChangePassword from './views/account/ChangePassword';


function App() {
  const { authData } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Protected routes */}
          <Route element={<ProtectedRoute authData={authData} />}>
            <Route path="account" element={<Account />} />
            <Route path="basket" element={<Basket />} />
            <Route path="confirm" element={<Confirm />} />
            <Route path="changeinformation" element={<ChangeInformation />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path={route.HOME} element={<Home />} />
            <Route path={route.HOME_ALT} element={<Home />} />
            <Route path={route.ERROR} element={<Error />} />
            <Route path={route.LOGIN} element={<Login />} />
            <Route path={route.REGISTER} element={<Register />} />
            <Route path={route.SINGLE_PRODUCT + ":id"} element={<ViewProductSingle />} />
            <Route path={route.CATEGORY_PRODUCTS + ":categoryKey"} element={<ViewCategoryProductList />} />
            <Route path={route.BRAND_PRODUCTS + ":brandKey"} element={<ViewBrandProductList />} />
            <Route path={route.ACCOUNT} element={<Account />} />
            <Route path={route.SEARCH_PRODUCT + ":searchKey"} element={<Search />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
