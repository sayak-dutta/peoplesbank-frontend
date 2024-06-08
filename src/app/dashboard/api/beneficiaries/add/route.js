import { addBeneficiaries, loginRequest } from "@/axios/apiendpoints";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const account = await request.json()
        const data = await addBeneficiaries(account);
       return NextResponse.json({code:200})        
    } catch (error) {
        return NextResponse.json({code:400})
        
    }
}