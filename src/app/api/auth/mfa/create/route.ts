import { CreateMfaResponse } from "@/src/features/auth/mfa/types/mfa.types";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const refreshToken = request.headers.get('Refresh-Token')
    const response = await serverApi<CreateMfaResponse>({
        endpoint: "/api/mfa/setup/begin",
        method: "POST",
        headers: {
            Authorization: request.headers.get('Authorization') ?? '',
        },
        authRetry: true,
        refreshToken: refreshToken,
    });

    return NextResponse.json(response, { status: response.status, });
}