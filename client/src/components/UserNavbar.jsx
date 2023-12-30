import React, { useEffect, useState } from "react";
import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import { getCart, get_user } from "../helper";

export async function loader() {
    const user = await get_user()
    if (user == null) {
        return redirect("/login?message=You have to log in!!")
    }
    const carts = await getCart(user.data.user._id)
    return { user, carts }
}

export default function UserNavbar() {
    const [total, setTotal] = useState(0)
    const [toggle, setToggle] = useState(false)
    let { user, carts } = useLoaderData()
    const userId = user.data.user._id
    carts = carts.data

    useEffect(() => {
        if (carts) totalBill();
    }, [toggle]);

    async function totalBill() {
        let total = 0
        const carts = await getCart(userId)
        if(carts.data) {
            carts.data.map(cart => total += cart.bill)
            setTotal(total)
        } else {
            setTotal(0)
        }
    }

    return (
        <div className="mt-12 lg:mt-16 font-body">
            <div className="flex flex-col py-5 bg-orange-100 bg-opacity-50 px-5 lg:px-16">
                <span className="text-2xl md:text-4xl font-bold pb-1">Heyy, <span className="text-primary-200 border-b-2 border-primary-200">{user.data.user.name.charAt(0).toUpperCase() + user.data.user.name.slice(1)}</span> !</span>
                <span className="text-md md:text-lg mt-1 md:mt-3 pb-1">Total cost of items in your cart is: <span className="text-primary-200 font-bold border-b-2 text-xl md:text-2xl border-primary-200">${total}</span></span>
            </div>
            <nav className="px-16 font-body text-lg my-5 text-gray-500 flex justify-center md:justify-start">
                <NavLink end className={({ isActive }) => isActive ? "text-black" : null} to="."><span className="mx-3">Cart</span></NavLink>
                <NavLink className={({ isActive }) => isActive ? "text-black" : null} to="orders"><span className="mx-3">Orders</span></NavLink>
            </nav>
            <Outlet context={[total, toggle, setToggle]} />
        </div>
    )
}