import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { get_user } from "../helper";

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null);
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

    }, []);

    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn") === "true");
        if (isLoggedIn) {
            async function checkUser() {
                try {
                    const user = await get_user();
                    setUserId(user.data.user._id);
                } catch (error) {
                    console.error("Error checking user:", error);
                    setLoggedIn(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("loggedIn");
                }
            }

            checkUser();
        }

    }, [isLoggedIn, location.pathname])

    function handleLogOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedIn")
        setLoggedIn(false)
    }

    const links = [
        {
            'name': 'Home',
            'to': '/'
        },
        {
            'name': 'Sneakers',
            'to': 'sneakers'
        }
    ]


    function renderLinks() {
        return (
            <div className="flex flex-col h-screen border-l-2 lg:flex-row lg:h-max lg:border-l-0">
                <ul className="items-center inline-block border-b-2 lg:ml-9 lg:flex lg:border-b-0">
                    {isOpen &&
                        <div className="py-3 border-b-2">
                            <svg className="w-8 h-8 ml-auto mr-2 cursor-pointer" onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                    }
                    {links.map((link, index) => (
                        <li key={index} onClick={() => isMobile && setIsOpen(prevState => !prevState)} className="my-5 font-bold mx-14 lg:py-6 lg:my-0 lg:text-secondary-300 md:mx-36 lg:mx-6">
                            <NavLink className={({ isActive }) => isActive ? "border-b-[3px] border-primary-200 text-black lg:py-6" : null} to={link.to}>{link.name}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between mx-4 mt-3 jus lg:mt-0">
                    <div>
                        {isLoggedIn ? <NavLink onClick={() => isMobile && setIsOpen(prevState => !prevState)} to={`/user/${userId}`} className={({ isActive }) => isActive ? "text-black" : "text-secondary-300"}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-3 lg:mr-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        </NavLink> :
                            <span onClick={() => isMobile && setIsOpen(prevState => !prevState)} className="mr-6 font-semibold text-primary-200 cursor-pointer"><NavLink to="login">Login</NavLink></span>}
                    </div>
                    <div>
                        {isLoggedIn ? <Link onClick={() => isMobile && setIsOpen(prevState => !prevState)} to="/"><span onClick={handleLogOut} className="text-primary-200 font-semibold cursor-pointer">Log Out</span></Link> : <span onClick={() => isMobile && setIsOpen(prevState => !prevState)} className="text-primary-200 font-semibold cursor-pointer"><NavLink to="signup">Sign Up</NavLink></span>}
                    </div>
                </div>
            </div>
        )
    }

    function handleClick() {
        setIsOpen(prevState => !prevState)
    }

    return (
        <nav className="fixed z-50 uppercase bg-white w-full flex items-center justify-between px-5 font-normal border lg:px-16 font-body">
            <NavLink to="/"><img className="py-4 lg:py-0" src="/images/navbar/logo.svg" /></NavLink>
            <div className={isOpen ? "inline-block absolute top-0 bg-white h-screen right-0" : "hidden lg:inline-flex"}>
                {renderLinks()}
            </div>
            <div className="lg:hidden">
                <svg onClick={handleClick} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </nav>
    )
}