import { getBeneficiarieByCustId, loginRequest } from "@/axios/apiendpoints";
import { NextResponse } from "next/server";

export async function GET(request,context) {
    try {
        //const custId = request.nextUrl.searchParams.get("cid")
        
        const data = await getBeneficiarieByCustId();
       return NextResponse.json({code:200})        
    } catch (error) {
        return NextResponse.json({code:400})
        
    }
}