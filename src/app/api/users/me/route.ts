import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import { getDataromToken } from "@/helpers/getDataFromToken";


connect()

export async function POST(request: NextRequest) {
    // extract data from token
    const userId = await getDataromToken(request)
    const user = await User.findOne({ _id: userId })

    if (!user) {
        return NextResponse.json({
            error: "User not found"
        },
            { status: 400 })
    }

    return NextResponse.json({
        message: "User found",
        data :user
    })
}