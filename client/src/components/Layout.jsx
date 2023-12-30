import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {

    return(
        <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}