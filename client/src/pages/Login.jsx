import React from "react";
import { Form, Link, redirect, useActionData, useLoaderData } from "react-router-dom";
import { get_user, login } from "../helper";

export function loader({request}) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({request}) {
    const formData = await request.formData()
    try {
        const res = await login(formData)
        const user = await get_user()
        const user_id = user.data.user._id
        const pathname = new URL(request.url).searchParams.get("redirectTo") || `/user/${user_id}`
        localStorage.setItem("loggedIn", true)
        return redirect(pathname)
    } catch(error) {
        const errorMessage = error.error || "Enter the correct email and password";
        return new Response(errorMessage, { status: 400 });
    }
}

export default function Login() {
    const error = useActionData()
    const message = useLoaderData()

    return(
        <div className="w-full font-body">
            <Form method="post" className="flex w-fit p-10 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center login-card">
                <h1 className="font-bold text-center text-2xl md:text-3xl pb-2 border-b-2 md:border-b-4 border-primary-200">Login to your account</h1>
                {error && <span className="text-red-500 mt-3">{error}</span>}
                {message && <span className="text-red-500 mt-3">{message}</span>}
                <label htmlFor="email" className="mt-6">Email:</label>
                <input name="email" type="text" required className="mb-6 border border-primary-200 focus:outline-none focus:border-2" />
                <label htmlFor="password">Password:</label>
                <input name="password" type="password" required className="border border-primary-200 mb-2 focus:outline-none focus:border-2" />
                <span className="mb-5 text-center font-bold cursor-default">Create an <span className="cursor-pointer text-primary-200"><Link to="/signup">account</Link></span> if you haven't yet</span>
                <button className="py-2 px-3 bg-primary-200 text-white font-bold text-sm rounded-md">Login</button>
            </Form>
        </div>
    )
}