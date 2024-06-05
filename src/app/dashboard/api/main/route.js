import { NextResponse } from "next/server";

export async function GET(request) {
    try {
       return NextResponse.json({code:200})        
    } catch (error) {
        return NextResponse.json({code:400})
        
    }
}