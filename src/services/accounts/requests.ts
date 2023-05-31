export type AccountRequest = {
  email: string;
  password: string;
  role: "User" | "Freelancer";
  fullName: string;
  phoneNumber: string;
  description?: string;
  majorCodes?: string[];
};

export type UpdateAccountRequest = {
  fullName: string;
  phoneNumber: string;
  avatar?: string;
  description: string;
  majorCodes: string[];
};
