import { loginRequest, signupRequest } from "@/axios/apiendpoints";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {email,password,name} = await request.json()
        const logStatus = await signupRequest(email,password,name);
       return NextResponse.json({code:200})        
    } catch (error) {
        return NextResponse.json({code:400})
        
    }
}