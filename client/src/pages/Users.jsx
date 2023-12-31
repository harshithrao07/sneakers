import React, { useState } from "react";
import { getCart, get_user, initializePayment, removeItems, updateCartQuanity } from "../helper";
import { Link, redirect, useLoaderData, useLocation, useOutletContext } from "react-router-dom";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

export async function loader() {
    const user = await get_user()
    if (user == null) {
        return redirect("/login?message=You have to log in!!")
    }
    const cartsData = await getCart(user.data.user._id)
    return { cartsData, user }
}

export default function Users() {
    const [total, toggle, setToggle] = useOutletContext()
    let { cartsData, user } = useLoaderData()
    const userId = user.data.user._id
    const locations = useLocation()
    const initialQuantities = {};
    const [carts, setCarts] = useState(cartsData.data)
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(0)

    const handleOpen = (id, command) => {
        if(command == null) setItemToDelete(id)
        if (command == "delete") {
            deleteItem(itemToDelete)
            setItemToDelete(0)
        }
        setOpen(!open)
    }

    if (cartsData.data) {
        cartsData.data.forEach((cart) => {
            initialQuantities[cart.items[0].productId] = cart.items[0].quantity;
        });
    }
    const [quantities, setQuantities] = useState(initialQuantities);

    async function decrementQuantity(productId) {
        const quantity = quantities[productId];
        if (quantity > 1) {
            setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: quantity - 1 }));
            const res = await updateCartQuanity(userId, productId, quantities[productId] - 1)
            let cartsData = await getCart(userId)
            setCarts(cartsData.data)
            setToggle(!toggle)
        }
    }

    async function incrementQuantity(productId) {
        const quantity = quantities[productId];
        setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: quantity + 1 }));
        const res = await updateCartQuanity(userId, productId, quantities[productId] + 1)
        let cartsData = await getCart(userId)
        setCarts(cartsData.data)
        setToggle(!toggle)
    }

    const handlePayment = async () => {
        const res = await initializePayment(carts)
        window.location.replace(res.data.url);
    }


    async function deleteItem(id) {
        const res = await removeItems(id, userId)
        let cartsData = await getCart(userId)
        setCarts(cartsData.data)
        setToggle(!toggle)
    }

    function renderCart() {
        return carts.map((cart, index) => (
            <div key={index} className="flex h-max p-3 md:p-5 transition duration-300 ease-in-out items-center bg-orange-100 bg-opacity-50 md:rounded-xl my-5">
                <img alt={index} src={cart.items[0].imageUrl} className="w-20 md:w-28 rounded-xl" />
                <div className="flex flex-col ml-5">
                    <Link className="hover:text-primary-200" key={index} to={`/sneakers/${cart.items[0].productId}?redirectTo=${locations.pathname}`}>
                        <span className="text-sm md:text-md md:text-lg font-semibold md:font-bold">{cart.items[0].name.split(' ').slice(0, 3).join(' ')}</span>&nbsp;<span className="text-sm md:text-md md:text-lg font-semibold md:font-bold italic text-primary-200">x{cart.items[0].quantity}</span></Link>
                    <span className="text-gray-700 text-sm md:text-md">{cart.items[0].brand}</span>
                    <span className="text-md md:text-xl">${cart.items[0].price}</span>
                </div>
                <div className="ml-auto flex flex-col justify-center p-2 w-1/4">
                    <div onClick={() => handleOpen(cart.items[0].productId, null)} className="mb-4 md:mb-5 ml-auto p-2 rounded-xl bg-white hover:border border-primary-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6 group-hover:text-primary-200 group-hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                    <div className="flex justify-between item-center p-1 md:p-2 bg-white md:w-fit rounded-md md:ml-auto">
                        <svg onClick={() => decrementQuantity(cart.items[0].productId)} className={quantities[cart.items[0].productId] === 1 ? "w-5 h-5 md:w-7 md:h-7 text-orange-300 mr-2 lg:mr-5 cursor-pointer" : "w-5 h-5 md:w-7 md:h-7 text-primary-200 mr-2 lg:mr-5 cursor-pointer"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                        <span className="md:text-xl text-sm font-bold md:px-5 lg:px-0 text-gray-800 cursor-default text-center">{quantities[cart.items[0].productId]}</span>
                        <svg onClick={() => incrementQuantity(cart.items[0].productId)} className="w-5 h-5 md:w-7 md:h-7 text-primary-200 ml-2 lg:ml-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </div>
                </div>
            </div>
        ))
    }

    function renderBillComponent() {
        return carts.map((cart, index) => (
            <div key={index} className="grid grid-cols-4 md:grid-cols-5 py-1 px-2 md:px-0 border-t border-black">
                <span className="text-xs md:text-lg md:col-span-2">{cart.items[0].name}</span>
                <span className="text-xs md:text-lg flex justify-center">${cart.items[0].price}</span>
                <span className="text-xs md:text-lg flex justify-center">x{cart.items[0].quantity}</span>
                <span className="text-xs md:text-lg flex justify-center">${cart.bill}</span>
            </div>
        ))
    }

    return (
        <div className="font-body flex flex-col">
            <div className="pb-4 md:px-16">
                <span className="text-xl ml-5 md:ml-0 md:text-2xl pb-1 border-b-2 border-primary-200">Your cart:</span>
                <div>
                    {carts.length > 0 ? renderCart() : <div className="flex flex-col col-span-3 items-center justify-center">
                        <span className="text-xl mt-3 md:text-4xl">Your cart is empty</span>
                        <span className="text-2xl mt-1 md:text-6xl md:mt-5">(˚ ˃̣̣̥⌓˂̣̣̥)</span>
                    </div>}
                </div>
                {
                    carts.length > 0 &&
                    <div className="flex flex-col">
                        <span className="text-xl ml-5 md:ml-0 md:text-2xl py-4 pb-1 border-b-2 border-primary-200 w-fit mb-4">Your Total Bill:</span>
                        <div className="p-3 bg-orange-100 bg-opacity-50 md:rounded-xl">
                            <div className="bg-white rounded-xl p-2">
                                <div className="grid grid-cols-4 md:grid-cols-5 px-2 md:px-0 py-1">
                                    <span className="text-xs md:text-lg md:col-span-2 font-bold">Name</span>
                                    <span className="text-xs md:text-lg flex justify-center font-bold">Price</span>
                                    <span className="text-xs md:text-lg flex justify-center font-bold">Quantity</span>
                                    <span className="text-xs md:text-lg flex justify-center font-bold">Total Cost</span>
                                </div>
                                <div>
                                    {renderBillComponent()}
                                </div>
                                <div className="grid grid-cols-4 md:grid-cols-5 border-t border-black px-2 md:px-0">
                                    <span className="col-start-4 md:col-start-5 text-lg md:text-2xl flex justify-center items-center py-2 border-b border-black text-center"><span className="font-bold">${total}</span></span>
                                    <div className="flex justify-end lg:justify-center col-span-3 col-start-2 md:col-start-4 lg:col-start-5"><Button onClick={handlePayment} className="bg-primary-200 mt-3">Proceed to Checkout</Button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <Dialog open={open} handler={handleOpen}>
                    <DialogBody>
                        Are you sure you want to delete this item?
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpen(false)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="orange" onClick={() => handleOpen(null, "delete")}>
                            <span>Delete</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </div>
    )
}