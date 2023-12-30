import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";

export default function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const containerRef = useRef(null);
    const cardContainer = useRef(null)

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    useEffect(() => {
        const callbackFunction = (entries) => {
            const viewElement = containerRef.current?.querySelector(".movingSneaker");
            entries.forEach((entry) => {
                const cardViewElements = entry.target.getElementsByClassName("card");

                if (entry.isIntersecting) {
                    if (viewElement) {
                        viewElement.classList.add("animate-animationSneaker");
                    }
                    if (cardViewElements.length > 0) {
                        cardViewElements[0].classList.add("animate-animationCard");
                        if (cardViewElements.length > 1) {
                            cardViewElements[1].classList.add("animate-animationCard");
                        }
                        if (cardViewElements.length > 2) {
                            cardViewElements[2].classList.add("animate-animationCard");
                        }
                    }
                } else {
                    if (viewElement) {
                        viewElement.classList.remove("animate-animationSneaker");
                    }
                    if (cardViewElements.length > 0) {
                        cardViewElements[0].classList.remove("animate-animationCard");
                        if (cardViewElements.length > 1) {
                            cardViewElements[1].classList.remove("animate-animationCard");
                        }
                        if (cardViewElements.length > 2) {
                            cardViewElements[2].classList.remove("animate-animationCard");
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(callbackFunction, options);

        if (cardContainer.current) {
            observer.observe(cardContainer.current);
        }

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }

            if (cardContainer.current) {
                observer.unobserve(cardContainer.current);
            }

        };
    }, [containerRef, cardContainer, isMobile]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

    }, []);

    return (
        <div className="font-body snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
            <div style={{ background: "url('/images/home/title-bg.jpg')" }} className={isMobile ? "animate-animationBackgroundMobile" : "animate-animationBackground"}>
                <div className="snap-start snap-always h-screen flex justify-center items-center uppercase font-bold text-3xl lg:text-4xl px-5 md:px-5 text-center">
                    <div className="flex flex-col items-center justify-center p-10 md:p-16 bg-gray-100 bg-opacity-95 rounded-md ease-linear">
                        <span className="tracking-normal md:tracking-widest">Welcome to the <Link to="/sneakers"><span className="text-primary-200">world</span></Link> of</span>
                        <img src="/images/navbar/logo.svg" className="w-96 mt-2" />
                    </div>
                </div>
            </div>
            <div ref={containerRef} className="snap-start snap-always grid md:grid-cols-2 grid-rows-3 md:grid-rows-1 h-screen">
                <div className="text-sm row-span-2 text-center md:text-left lg:text-xl px-5 md:px-10 flex flex-col justify-end md:justify-center items-center md:items-start leading-7 mb-7 lg:leading-9 lg:pl-20">
                    <span className="text-xl md:text-3xl font-bold md:mb-4 uppercase text-center md:text-left">The <span className="text-primary-200">Sneakers</span> Company</span>
                    <span>
                        Get ready to dive into the fascinating world of sneakers. From the latest trends to classic styles, we've got you covered. Whether you're an avid collector or just looking for a comfortable pair of shoes, we'll help you choose the best sneakers for your needs.
                    </span>
                    <button className="w-fit transition duration-500 ease-in-out hover:bg-black mt-5 py-2 px-3 uppercase text-md text-white font-bold bg-primary-200 rounded-md"><Link to="/sneakers">Shop now</Link></button>
                </div>
                <div className="overflow-hidden relative flex items-center justify-center lg:justify-normal">
                    <img alt="moving sneaker" src="/images/home/text-image.png" className="-scale-x-110 absolute hidden lg:block movingSneaker" />
                    <img alt="sneaker for tablet and mobile" src="images/home/sneakerMobileTablet.png" className="lg:hidden w-2/5 md:w-full mt-4 md:mt-0" />
                </div>
            </div>
            <Carousel autoplay={true} autoplayDelay={3000} loop={true}
                className="h-screen relative overflow-hidden snap-start snap-always"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <img
                    src={isMobile ? "/images/home/bg-mob-1.png" : "/images/home/bg-1.jpeg"}
                    alt="image 1"
                    className="w-full h-screen"
                />
                <img
                    src={isMobile ? "/images/home/bg-mob-2.jpeg" : "/images/home/bg-2.jpeg"}
                    alt="image 2"
                    className="w-full h-screen"
                />
                <img
                    src={isMobile ? "/images/home/bg-mob-3.jpeg" : "/images/home/bg-3.jpg"}
                    alt="image 3"
                    className="w-full h-screen"
                />
                <img
                    src={isMobile ? "/images/home/bg-mob-4.jpeg" : "/images/home/bg-4.jpeg"}
                    alt="image 4"
                    className="w-full h-screen"
                />
                <img
                    src={isMobile ? "/images/home/bg-mob-5.jpeg" : "/images/home/bg-5.jpg"}
                    alt="image 5"
                    className="w-full h-screen"
                />
            </Carousel>

            <div ref={cardContainer} className="px-5 md:px-10 lg:px-16 h-screen flex items-center flex-col justify-center snap-start snap-always">
                <span className="text-2xl lg:text-4xl uppercase lg:mb-7 text-center">Choosing the Right <span className="text-primary-200 font-bold">Sneakers</span></span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-center mt-3 md:mt-10 cursor-default">
                    <div className="col-span-2 md:col-span-1 login-card h-fit flex flex-col justify-center items-center md:p-5 p-2 card">
                        <span className="text-sm md:text-2xl font-bold pb-1 border-b-2 border-primary-200">Consider Your Needs</span>
                        <span className="text-xs md:text-lg mt-2 md:mt-5 text-gray-800">
                            Think about the activities you'll be doing and choose sneakers that offer the right support and durability.
                        </span>
                    </div>
                    <div className="col-span-2 md:col-span-1 login-card flex flex-col h-fit justify-center items-center p-2 md:p-5 card">
                        <span className="text-sm md:text-2xl font-bold pb-1 border-b-2 border-primary-200">Fit and Comfort</span>
                        <span className="text-xs md:text-lg mt-2 md:mt-5 text-gray-800">Make sure your sneakers fit properly and provide enough cushioning and support to prevent injury.</span>
                    </div>
                    <div className="login-card col-span-2 md:col-span-1 flex flex-col h-fit justify-center items-center p-2 md:p-5 card">
                        <span className="text-sm md:text-2xl font-bold pb-1 border-b-2 border-primary-200">Style and Design</span>
                        <span className="text-xs md:text-lg mt-2 md:mt-5 text-gray-800">
                            Choose sneakers that reflect your personal style and that you feel comfortable wearing, ensuring fashion with your preferences.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}