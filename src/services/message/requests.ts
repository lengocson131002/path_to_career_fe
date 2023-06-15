import { EnumKeys, MessageType } from "@/commons/enum";

export type SendMessageRequest = {
  type: EnumKeys<typeof MessageType>;
  content: string;
};
