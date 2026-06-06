export type ResetPasswordDto = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message?: string;
};
