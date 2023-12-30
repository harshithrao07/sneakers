import React, { Suspense, useEffect, useState } from "react";
import { getSneakers } from "../../helper";
import { Await, Link, defer, useLoaderData, useSearchParams } from "react-router-dom";

export function loader() {
    return defer({ sneakers: getSneakers() })
}

export default function Collections() {
    let dataPromise = useLoaderData()

    const [searchParams, setSearchParams] = useSearchParams()

    const categoryFilter = searchParams.get('category')
    const typeFilter = searchParams.get('type')
    const brandFilter = searchParams.get('brand')

    const [category, setCategory] = useState(false)
    const [type, setType] = useState(false)
    const [brand, setBrand] = useState(false)

    useEffect(() => {
        setCategory(false)
        setType(false)
        setBrand(false)
    }, [searchParams])

    function handleFilterChange(key, value) {
        if (value == null && key == null) {
            setSearchParams(new URLSearchParams())
        } else {
            setSearchParams(prevParams => {
                if (value == null) {
                    prevParams.delete(key)
                } else {
                    prevParams.set(key, value)
                }
                return prevParams
            })
        }
    }

    const renderSneakerElements = (sneakers) => {
        let filteredSneakers = sneakers.items;

        if (categoryFilter) {
            filteredSneakers = filteredSneakers.filter(sneaker => sneaker.gender.toUpperCase() === categoryFilter.toUpperCase());
        }

        if (typeFilter) {
            filteredSneakers = filteredSneakers.filter(sneaker => sneaker.category.toUpperCase() === typeFilter.toUpperCase());
        }

        if (brandFilter) {
            filteredSneakers = filteredSneakers.filter(sneaker => sneaker.brand.toUpperCase() === brandFilter.toUpperCase());
        }

        if (filteredSneakers.length === 0) {
            return <div className="flex flex-col col-span-3 items-center justify-center mt-16 lg:mt-0">
                <span className="text-xl mt-3 md:text-4xl text-center">We couldn't find what you were looking for</span>
                <span className="text-2xl mt-1 md:text-6xl md:mt-5">(˃̣̣̥⌓˂̣̣̥⋆)</span>
            </div>
        }
        else {
            return filteredSneakers.map((sneaker) =>
                <Link key={sneaker.id} to={`/sneakers/${sneaker.id}`}>
                    <div className="p-4">
                        <img src={sneaker.imageURL} className="w-full h-80" />
                        <div className="my-2 lg:my-3 flex items-center text-xs lg:text-sm">
                            <span className="mr-2 px-2 py-1  bg-green-600 text-white rounded-md">{sneaker.gender}</span>
                            <span className="px-2 py-1 text-white rounded-md bg-blue-700">{sneaker.category}</span>
                            <span className="ml-auto text-purple-700 font-bold text-sm uppercase">{sneaker.brand}</span>
                        </div>
                        <div className="flex flex-col py-2 border-t-2 border-primary-200 text-gray-800">
                            <span className="text-md font-bold">{sneaker.name.toUpperCase()}</span>
                            <span className="font-bold text-xl">${sneaker.price}</span>
                        </div>
                    </div>
                </Link>
            )
        }
    }

    return (
        <div className="lg:px-20 px-4 mt-8 lg:mt-20 font-body">
            <div className="flex flex-col lg:flex-row mt-5">
                <div className="left-0 lg:left-16 fixed z-10 bg-white w-full lg:min-h-screen lg:w-1/6">
                    <button className="lg:mb-2 pt-2 lg:pt-0 ml-3 lg:ml-0" onClick={() => handleFilterChange(null, null)}>
                        <span className="uppercase font-bold text-primary-200">Clear All Filters</span>
                    </button>

                    <div className="flex flex-wrap ml-3 lg:ml-0">
                        {categoryFilter && <button className="w-fit mx-1 mt-2 flex cursor-pointer py-1 px-2 bg-gray-200 text-xs rounded-2xl" onClick={() => handleFilterChange("category", null)}>{categoryFilter.toLocaleUpperCase()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>}
                        {typeFilter && <button className="w-fit mx-1 mt-2 flex cursor-pointer py-1 px-2 bg-gray-200 text-xs rounded-2xl" onClick={() => handleFilterChange("type", null)}>{typeFilter.toLocaleUpperCase()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>}
                        {brandFilter && <button className="cursor-pointer mx-1 mt-2 flex w-fit px-2 py-1 bg-gray-200 text-xs rounded-2xl" onClick={() => handleFilterChange("brand", null)}>{brandFilter.toLocaleUpperCase()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>}
                    </div>

                    <div className="grid grid-cols-3 lg:block text-sm">
                        <div className="flex flex-col py-3 lg:border-b items-center lg:items-start">
                            <span onClick={() => {
                                setCategory(!category)
                                setType(false)
                                setBrand(false)
                            }} className="font-bold uppercase flex cursor-pointer text-xs lg:text-base w-fit lg:w-full">Category
                                <svg className="w-4 h-4 lg:w-6 lg:h-6 ml-1 lg:ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                            {category && <div className="flex flex-col text-gray-500">
                                <button className="w-fit my-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("category", "men")}>Men</button>
                                <button className="w-fit mb-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("category", "women")}>Women</button>
                                <button className="w-fit mb-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("category", "kids")}>Kids</button>
                            </div>}
                        </div>
                        <div className="flex flex-col py-3 lg:border-b items-center lg:items-start">
                            <span onClick={() => {
                                setType(!type)
                                setCategory(false)
                                setBrand(false)
                            }} className="font-bold uppercase flex cursor-pointer text-xs lg:text-base w-fit lg:w-full">Type
                                <svg className="w-4 h-4 lg:w-6 lg:h-6 ml-1 lg:ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                            {type && <div className="flex flex-col text-gray-500">
                                <button className="w-fit my-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("type", "running")}>Running</button>
                                <button className="w-fit mb-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("type", "football")}>Football</button>
                                <button className="w-fit mb-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("type", "formal")}>Formal</button>
                                <button className="w-fit mb-1 cursor-pointer hover:text-black" onClick={() => handleFilterChange("type", "casual")}>Casual</button>
                            </div>}
                        </div>
                        <div className="flex flex-col py-3 items-center lg:items-start">
                            <span onClick={() => {
                                setType(false)
                                setCategory(false)
                                setBrand(!brand)
                            }} className="font-bold uppercase flex cursor-pointer text-xs lg:text-base w-fit lg:w-full">Brand
                                <svg className="w-4 h-4 lg:w-6 lg:h-6 ml-1 lg:ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                            {brand && <div className="flex flex-col text-gray-500">
                                <button className="hover:text-black cursor-pointer w-fit my-1" onClick={() => handleFilterChange("brand", "nike")}>Nike</button>
                                <button className="hover:text-black cursor-pointer w-fit mb-1" onClick={() => handleFilterChange("brand", "hushpuppies")}>Hush Puppies</button>
                                <button className="hover:text-black cursor-pointer w-fit mb-1" onClick={() => handleFilterChange("brand", "reebok")}>Reebok</button>
                                <button className="hover:text-black cursor-pointer w-fit mb-1" onClick={() => handleFilterChange("brand", "adidas")}>Adidas</button>
                                <button className="hover:text-black cursor-pointer w-fit mb-1" onClick={() => handleFilterChange("brand", "vans")}>Vans</button>
                            </div>}
                        </div>
                    </div>

                </div>



                <div className="grid md:grid-cols-2 lg:grid-cols-3 ml-auto lg:w-4/5 w-full mt-20 lg:mt-0">
                    <Suspense fallback={<span>Loading sneakers...</span>}>
                        <Await resolve={dataPromise.sneakers}>
                            {renderSneakerElements}
                        </Await>
                    </Suspense>
                </div>

            </div>
        </div>
    )
}