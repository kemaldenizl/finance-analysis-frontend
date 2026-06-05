import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";

import type { LoginResponse } from "@/src/features/auth/login/types/login.types";
import type { MfaLoginDto } from "@/src/features/auth/mfa/types/mfa.types";

export async function POST(request: NextRequest) {
    const body = await request.json() as MfaLoginDto;

    const response = await serverApi<LoginResponse, MfaLoginDto>({
        endpoint: "/api/mfa/login/complete",
        method: "POST",
        body: body,
    })

    return NextResponse.json( response, { status: response.status, });
}