import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";

import type { LoginDto, LoginResponse } from "@/src/features/auth/login/types/login.types";

export async function POST(request: NextRequest) {
    const body = await request.json() as LoginDto;

    const response = await serverApi<LoginResponse, LoginDto>({
        endpoint: "/api/auth/login",
        method: "POST",
        body: body,
    })

    return NextResponse.json( response, { status: response.status, });
}