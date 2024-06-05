import { loginRequest } from "@/axios/apiendpoints";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {email,password} = await request.json()
        const logStatus = await loginRequest(email,password);
       return NextResponse.json({code:200})        
    } catch (error) {
        return NextResponse.json({code:400})
        
    }
}