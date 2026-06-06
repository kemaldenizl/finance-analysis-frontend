import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";

export async function POST(request: NextRequest) {
    const accessToken = request.headers.get('Authorization');
    const response = await serverApi({
        endpoint: "/api/auth/logout-all",
        method: "POST",
        headers: {
            Authorization: accessToken ?? '',
        },
        authRetry: true
    });

    if(!response.success) {
        return NextResponse.json({ success: false, message: "Çıkış yapılırken bir hata oluştu." }, { status: 500 });
    }

    return new NextResponse(null, { status: response.status });
}