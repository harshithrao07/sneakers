import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { get_user, signup } from "../helper";
import { Spinner } from "@material-tailwind/react";

export async function action({ request }) {
    const formData = await request.formData()
    if(formData.get("password").length < 6) {
        return "Enter a password with more than 6 characters"
    }
    if (formData.get("password") == formData.get("confirm_password")) {
        try {
            const res = await signup(formData)
            const user = await get_user()
            const user_id = user.data.user._id
            localStorage.setItem("loggedIn", true)
            return redirect(`/user/${user_id}`)
        } catch (error) {
            return error.message
        }
    } else {
        alert('Password do not match')
    }
    return null
}

export default function Signup() {
    const error = useActionData()
    const [isProcessing, setIsProcessing] = useState(false)

    const handleClick = () => {
        setIsProcessing(true);
  
        setTimeout(() => {
          setIsProcessing(false);
        }, 5000);
      };
    
      useEffect(() => {
        if (error) {
          setIsProcessing(false);
        }
      }, [error]);

    return (
        <div className="font-body w-full flex justify-center">
            <Form method="post" className="flex flex-col mt-24 mb-6 w-fit items-center p-5 login-card" onSubmit={handleClick}>
                <h1 className="font-bold text-center text-md md:text-2xl lg:text-3xl pb-2 border-b-2 md:border-b-4 border-primary-200">Sign up to create your account</h1>
                {error && <span className="text-center text-red-500 mt-3">{error}</span>}
                <label htmlFor="email" className="mt-6 text-sm md:text-md">Name:</label>
                <input name="name" type="text" required className="border border-primary-200 focus:outline-none focus:border-2" />
                <label htmlFor="email" className="mt-6 text-sm md:text-md">Email:</label>
                <input name="email" type="text" required className="mb-6 border border-primary-200 focus:outline-none focus:border-2" />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" required className="border border-primary-200 mb-5 focus:outline-none focus:border-2" />
                <label htmlFor="password">Confirm Password:</label>
                <input name="confirm_password" type="password" required className="border border-primary-200 mb-5 focus:outline-none focus:border-2" />
                <button className="py-2 px-3 bg-primary-200 text-white font-bold text-sm rounded-md">{isProcessing ? <div className="flex">Processing<Spinner className="h-6 w-6 ml-1" color="amber" /></div> : "Signup"}</button>
            </Form>
        </div>
    )
}