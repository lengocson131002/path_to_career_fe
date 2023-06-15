import { mapPostMessageModel } from "@/adapter/PostAdapter";
import { API_POST_MESSAGE } from "@/commons/api";
import instance from "../instance";
import { MessageModel } from "./models";
import { MessageResponse } from "./responses";

export const getMessages = async (postId: number): Promise<MessageModel[]> => {
  const { data } = await instance.get<MessageResponse[]>(
    API_POST_MESSAGE.replace("{id}", postId.toString()),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return data.map(msg => mapPostMessageModel(msg));
};
