import React, { Suspense, useState } from "react";
import { addingCart, getSneakers, get_user } from "../../helper";
import { Await, Link, defer, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Breadcrumbs,
    Spinner
} from "@material-tailwind/react";

export function loader({ params }) {
    const id = params.id
    return defer({ sneakerData: getSneakers(id) })
}

export default function SneakerDetails() {
    const dataPromise = useLoaderData()
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState("")
    const [isAdding, setAdding] = useState(false)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
        setAdding(false)
    }
    function decrementQuantity() {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1)
        }
    }

    function incrementQuantity() {
        setQuantity(prevQuantity => prevQuantity + 1)
    }


    const renderSneakerDataComponent = (sneakerData) => {
        async function addToCart() {
            setAdding(true)
            const user = await get_user()
            if (user === null) {
                return navigate(`/login?message=You have to log in first&redirectTo=${location.pathname}`)
            }
            else {
                const user_id = user.data.user._id
                const items = [{
                    productId: sneakerData.item.id,
                    name: sneakerData.item.name,
                    imageUrl: sneakerData.item.imageURL,
                    brand: sneakerData.item.brand,
                    quantity: quantity,
                    price: sneakerData.item.price
                }]
                const bill = items[0].quantity * items[0].price
                const res = await addingCart(user_id, items, bill)
                setMessage(res.data.msg)
                setQuantity(1)
                handleOpen()
            }
        }
        return (
            <div>
                <Breadcrumbs fullWidth className="bg-white my-3 hidden md:flex">
                    <Link to="/" className="hover:text-primary-200 text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    {searchParams.get("redirectTo") ? <Link className="text-black hover:text-primary-200" to={searchParams.get("redirectTo")}>Cart</Link> : <Link to="/sneakers" className="hover:text-primary-200 text-black">
                        Sneakers
                    </Link>}
                    <Link className="text-primary-200 break-words">{sneakerData.item.name.split(' ').slice(0, 3).join(' ')}</Link>
                </Breadcrumbs>
                <div className="grid grid-cols-1 lg:grid-cols-2 md:p-5 lg:p-0">
                    <div className="lg:px-10 lg:pb-10 flex justify-center items-center">
                        <img className="lg:rounded-xl border md:w-3/4 md:mb-5 lg:mb-0" src={sneakerData.item.imageURL} />
                    </div>
                    <div className="p-3 lg:px-10 lg:pb-10 flex flex-col">
                        <span className="text-primary-200 font-black text-sm lg:text-xl pb-1 lg:border-b-2 border-primary-200">THE SNEAKERS COMPANY</span>
                        <div className="mt-2 lg:mt-4 flex items-center">
                            <span className="mr-4 px-2  py-1 bg-green-600 text-white rounded-md text-sm w-fit">{sneakerData.item.gender}</span>
                            <span className="px-2 py-1 text-white rounded-md text-sm bg-blue-700 w-fit">{sneakerData.item.category}</span>
                            <span className="text-purple-700 ml-auto font-bold text-sm">{sneakerData.item.brand}</span>
                        </div>
                        <span className="text-4xl font-bold text-gray-800 mt-5">{sneakerData.item.name}</span>
                        <p className="mt-6 text-gray-500">
                            These low profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
                        </p>
                        <span className="mt-5 text-4xl text-gray-800 font-bold">${sneakerData.item.price}</span>
                        <div className="flex flex-col md:flex-row mt-5 lg:mt-10 items-center md:justify-around lg:justify-normal">
                            <div className="flex justify-between item-center p-2 bg-slate-100 w-full md:w-fit rounded-md">
                                <svg onClick={decrementQuantity} className={quantity == 1 ? "w-7 h-7 text-orange-300 mr-5 cursor-pointer" : "w-7 h-7 text-primary-200 mr-5 cursor-pointer"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                </svg>
                                <span className="text-md font-bold md:px-5 lg:px-0 text-gray-800 cursor-default">{quantity}</span>
                                <svg onClick={incrementQuantity} className="w-7 h-7 text-primary-200 ml-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </div>
                            <button onClick={addToCart} className="flex md:px-7 lg:px-0 mt-5 lg:mt-0 p-2 lg:p-0 justify-center w-full md:w-fit lg:w-full rounded-md h-full lg:ml-7 bg-primary-200 text-white font-bold text-sm items-center">
                                <span>{isAdding ? <div className="flex">Adding to cart<Spinner className="h-6 w-6 ml-2" color="amber" /></div> : <div className="flex">                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>Add to cart</div>}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="mb-5 mt-12 lg:mt-20 lg:px-20 font-body">
            <Suspense fallback={<span className="text-xl italic h-screen flex justify-center items-center">Loading Sneaker...</span>}>
                <Await resolve={dataPromise.sneakerData}>
                    {renderSneakerDataComponent}
                </Await>
            </Suspense>

            <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                    {message}
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="orange" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}