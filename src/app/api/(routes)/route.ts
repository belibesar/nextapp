import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: 'If you see this message, the API route is working!' }, { status: 200 });
}