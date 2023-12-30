import React from "react"
import { Link, useRouteError } from "react-router-dom"
import {
    Button
} from "@material-tailwind/react";

export default function FetchError() {
    const error = useRouteError()
    
    return(
        <div className="font-body h-screen flex justify-center items-center flex-col">
            <h1>Error: {error.message}</h1>
            <Link to="/"><Button className="mt-3">Return to home</Button></Link>
        </div>
    )
}