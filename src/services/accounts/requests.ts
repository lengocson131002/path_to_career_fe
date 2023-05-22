export type AccountRequest = {
  email: string;
  password: string;
  role: "User" | "Freelancer";
  fullName: string;
  phoneNumber: string;
  description?: string;
  majorCodes?: string[];
};
