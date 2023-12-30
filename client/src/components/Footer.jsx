import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const [hideFooter, setHideFooter] = useState(true);

  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    if (currentUrl !== "/") {
      setHideFooter(false);
    } else {
        setHideFooter(true)
    }
  }, [currentUrl]);

  return (
    !hideFooter && (
      <footer className="flex z-20 bg-white justify-center py-3 border-2 lg:py-6 font-body">
        Made with ❤️ by
        <span className="font-bold text-primary-200">
          <Link to="https://harshithrao.vercel.app/">&nbsp;Harshith Rao</Link>
        </span>
      </footer>
    )
  );
}
