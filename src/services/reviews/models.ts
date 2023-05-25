import dayjs from "dayjs";

export type ReviewModel = {
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
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
};
