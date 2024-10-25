import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('POST request received:', request.url);
  try {
    const response = await auth.handler(request);
    console.log('POST response:', response);
    return response;
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  console.log('GET request received:', request.url);
  try {
    const response = await auth.handler(request);
    console.log('GET response:', response);
    return response;
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
