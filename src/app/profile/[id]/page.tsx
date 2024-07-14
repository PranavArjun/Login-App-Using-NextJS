'use client'

import React from "react"

export default function ProfileID({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <h2 className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</h2>


        </div>
    )
}