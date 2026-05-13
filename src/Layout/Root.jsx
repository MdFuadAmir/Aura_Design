import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return (
    <div className="theme-transition overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
