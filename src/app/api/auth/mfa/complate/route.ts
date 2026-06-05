import { MfaComplateResponse } from "@/src/features/auth/mfa/types/mfa.types";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const code = await request.json();
    console.log('code:',code);
    const response = await serverApi<MfaComplateResponse>({
        endpoint: "/api/mfa/setup/complete",
        method: "POST",
        headers: {
            Authorization: request.headers.get('Authorization') ?? '',
        },
        body: code,
    });

    console.log('response nextbackend:',response);
    console.log('request headers:',request.headers);

    return NextResponse.json(response, { status: response.status, });
}