import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";

import type { RegisterDto, RegisterResponse, } from "@/src/features/auth/register/types/register.types";

export async function POST(request: NextRequest) {
    const body = await request.json() as RegisterDto;

    const response = await serverApi<RegisterResponse, RegisterDto>({
        endpoint: "/api/auth/register",
        method: "POST",
        body: body,
    })
    
    return NextResponse.json( response, { status: response.status, });
}