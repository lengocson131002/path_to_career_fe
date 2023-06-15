import {
  EnumKeys,
  MessageType
} from "@/commons/enum";

export type MessageResponse = {
  id: number;
  type: EnumKeys<typeof MessageType>;
  content: string;
  createdAt: string;
  updatedAt?: string;
  accountId: number;
};
