export type CreateMfaResponse = {
    manualEntryKey: string,
    otpAuthUri: string
} | null;

export type MfaComplateDto = {
    code: string;
}

export type MfaComplateResponse = {
    recoveryCodes: string[];
}

export type MfaLoginDto = {
    challengeToken: string;
    totpCode: string;
    recoveryCode: string;
}