import { useState } from 'react'
import { Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './layouts/Header'
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import Productv2Page from './pages/Productv2Page';
import Footer from './layouts/Footer';
import ManageAccount from './pages/ManageAccount';
import { BreadcrumbsDefault } from './layouts/BreadcrumbsDefault';
import NotFoundPage from './pages/NotFoundPage';
import ProductList from './pages/ProductList';
import ProductRoutes from './routes/ProductRoutes';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import UserCart from './pages/UserCart';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/slices/authSlice';
import UserShipment from './components/User/UserShipment';
import UserRoutes from './routes/UserRoutes';
import Dashboard from './components/Staff/Dashboard';
import ManageUser from './components/Admin/ManageUser';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';



function App() {
  const user = useSelector(selectUser)
  return (
    <>
     <Header/>
     <div className="pt-28">
      {/* <BreadcrumbsDefault/> */}
     <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/manage-account/*" element={<UserRoutes />} />
          <Route path="/productv2" element={<Productv2Page />} />
          <Route path="/product/*" element={<ProductRoutes />} />
          <Route path="/cart" element={user ? <UserCart/> : <Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipment" element={<UserShipment />} />
        
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-user" element={<ManageUser />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          
     </Routes>
     </div>
     <Footer/>
    </>
  )
}

export default App
