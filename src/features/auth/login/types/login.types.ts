export type LoginField = {
  id: "email" | "password";
  label: string;
  name: "email" | "password";
  type: "email" | "password";
  placeholder: string;
  autoComplete: "email" | "current-password";
};

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    isActive: boolean;
  }
  tokens: {
    accessToken: string;
    accessTokenExpiresAtUtc: string;
    refreshToken: string;
    refreshTokenExpiresAtUtc: string;
  }
  mfaChallenge: null | {
    challangeToken: string;
    expiresAtUtc: string;
  };
  requiresMfa: boolean;
}