import { PostApplicationModel } from "@/services/post-applications/models";
import { CreatePostApplicationResponse } from "@/services/post-applications/responses";

export const mapPostApplicationModel = (
  res: CreatePostApplicationResponse
): PostApplicationModel => {
  return {
    id: res.id,
    applierId: res.applierId,
    experienceDescription: res.experienceDescription,
    feePerCount: res.feePerCount,
    methodDescription: res.methodDescription,
    postId: res.postId,
    supportCount: res.supportCount,
  };
};
