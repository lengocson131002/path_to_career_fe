export type ReviewResponse = {
  id: number;
  reviewer: {
    id: number;
    email: string;
    phoneNumber: string;
    role: "Admin" | "Freelancer" | "User";
    fullName: string;
    description: string;
    score: number;
  };
  account: {
    id: number;
    email: string;
    phoneNumber: string;
    role: "Admin" | "Freelancer" | "User";
    fullName: string;
    description: string;
    score: number;
  };
  score: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
