export type RegisterField = {
  id: "email" | "password";
  label: string;
  name: "email" | "password";
  type: "email" | "password";
  placeholder: string;
  autoComplete: "email" | "new-password";
  description: string;
};

export type RegisterDto = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    isActive: boolean;
  }
};