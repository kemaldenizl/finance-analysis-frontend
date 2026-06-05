export type RefreshDto = {
    refreshToken: string;
  };
  
export type RefreshResponse = {
    tokens: {
      accessToken: string;
      accessTokenExpiresAtUtc: string;
      refreshToken: string;
      refreshTokenExpiresAtUtc: string;
    }
}