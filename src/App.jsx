import { FaHome } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import Auth from "./common/pages/Auth";
import LandingPage from "./common/pages/LandingPage";
import Contact from "./common/pages/Contact";
import Pnf from "./common/pages/Pnf";
import AdminHome from "./admin/pages/AdminHome";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSettings from "./admin/pages/AdminSettings";
import AllBooks from "./users/pages/AllBooks";
import Careers from "./users/pages/Careers";
import Profile from "./users/pages/Profile";
import ViewBook from "./users/pages/ViewBook";
import { useState, useEffect } from "react";
import PreLoader from "./common/pages/PreLoader";
import { ToastContainer } from "react-toastify";
import PaymentSuccess from "./users/pages/PaymentSuccess";
import PaymentError from "./users/pages/PaymentError";

function App() {

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 5000);
  })


  return (
    <>
      <Routes>
        {/* common */}
        <Route path="/" element={loader ? <PreLoader /> : <LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Pnf />} />
        {/* users */}
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewBook/:id" element={<ViewBook />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentError />} />
        {/* admin */}
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminBooks" element={<AdminBooks />} />
        <Route path="/adminCareers" element={<AdminCareers />} />
        <Route path="/adminSettings" element={<AdminSettings />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  )
}

export default App
