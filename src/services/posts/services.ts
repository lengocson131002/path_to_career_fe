import { mapAccountBriefModel } from "@/adapter/AccountAdapter";
import { API_POST, API_POST_DETAIL } from "@/commons/api";
import dayjs from "dayjs";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";
import { PostDetailModel, PostModel } from "./models";
import { CreatePostRequest } from "./requests";
import {
  CreatePostResponse,
  PostDetailResponse,
  PostResponse,
} from "./responses";

export const createPost = async (
  request: CreatePostRequest
): Promise<PostModel> => {
  const { data, status } = await instance.post<CreatePostResponse>(
    API_POST,
    request,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return {
    acceptedAccountId: data.acceptedAccountId,
    accountId: data.accountId,
    content: data.content,
    cvStyle: data.cvStyle,
    cvType: data.cvType,
    finishTime: data.finishTime ? dayjs(data.finishTime) : undefined,
    id: data.id,
    jobPosition: data.jobPosition,
    majorId: data.majorId,
    mediaUrl: data.mediaUrl,
    serviceType: data.serviceType,
    status: data.status,
    title: data.title,
    supportCount: data.supportCount,
    jobLevel: data.jobLevel,
  };
};

export const getPosts = async (): Promise<PaginationModel<PostModel>> => {
  const { data, status } = await instance.get<PaginationResponse<PostResponse>>(
    API_POST
  );
  return {
    hasNext: data.hasNext,
    hasPrevious: data.hasPrevious,
    items: data.items.map((item) => ({
      acceptedAccountId: item.acceptedAccountId,
      accountId: item.accountId,
      content: item.content,
      cvStyle: item.cvStyle,
      cvType: item.cvType,
      finishTime: item.finishTime ? dayjs(item.finishTime) : undefined,
      createdAt: item.createdAt ? dayjs(item.createdAt) : undefined,
      updatedAt: item.updatedAt ? dayjs(item.updatedAt) : undefined,
      id: item.id,
      jobLevel: item.jobLevel,
      jobPosition: item.jobPosition,
      majorId: item.majorId,
      mediaUrl: item.mediaUrl,
      serviceType: item.serviceType,
      status: item.status,
      title: item.title,
      supportCount: item.supportCount,
    })),
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    totalPages: data.totalPages,
  };
};

export const getPostDetail = async (id: string): Promise<PostDetailModel> => {
  const { data, status } = await instance.get<PostDetailResponse>(
    API_POST_DETAIL.replace("{id}", id)
  );
  return {
    acceptedAccountId: data.acceptedAccountId,
    accountId: data.accountId,
    content: data.content,
    cvStyle: data.cvStyle,
    cvType: data.cvType,
    finishTime: data.finishTime ? dayjs(data.finishTime) : undefined,
    createdAt: data.createdAt ? dayjs(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? dayjs(data.updatedAt) : undefined,
    id: data.id,
    jobLevel: data.jobLevel,
    jobPosition: data.jobPosition,
    majorId: data.majorId,
    mediaUrl: data.mediaUrl,
    serviceType: data.serviceType,
    status: data.status,
    title: data.title,
    supportCount: data.supportCount,
    acceptedAccount: mapAccountBriefModel(data.acceptedAccount),
    account: mapAccountBriefModel(data.account),
    major: data.major,
  };
};
