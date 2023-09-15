import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {Outlet} from "react-router-dom"
const MasterLayout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className={`z-50 ${isSticky ? "sticky top-0 bg-white transition-all duration-1000" : ""}`}>
        <Header />
      </div>
      <Outlet/>
    </div>
  )
}

export default MasterLayout
