import { mapPostApplicationModel } from "@/adapter/PostApplicationAdapter";
import { API_POST, API_POST_APPLICATION } from "@/commons/api";
import instance from "../instance";
import { PostApplicationModel } from "./models";
import { CreatePostApplicationRequest } from "./requests";
import { CreatePostApplicationResponse } from "./responses";

export const createPostApplication = async (
  id: string,
  request: CreatePostApplicationRequest
): Promise<PostApplicationModel> => {
  const { data, status } = await instance.post<CreatePostApplicationResponse>(
    API_POST_APPLICATION.replace("{id}", id),
    request,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapPostApplicationModel(data);
};
