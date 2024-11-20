import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {email, password} = await req.json();

    const response = await fetch('http://localhost:8001/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })

    if(!response.ok) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log(response)
}