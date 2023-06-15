import { mapPage } from "@/adapter/PaginationAdapter";
import {
  mapPostDetailModel,
  mapPostModel,
  mapPostPaymentModel,
} from "@/adapter/PostAdapter";
import {
  API_POST,
  API_POST_ACCEPT,
  API_POST_COMPLETE,
  API_POST_DETAIL,
  API_POST_PAYMENT,
} from "@/commons/api";
import {
  EnumKeys,
  PaymentMethod,
  PostStatus,
  ServiceTypes,
  SortDir,
} from "@/commons/enum";
import { customParamsSerializer } from "@/commons/utils";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";
import { PostDetailModel, PostModel, PostPaymentModel } from "./models";
import { CreatePostRequest } from "./requests";
import {
  PostDetailResponse,
  PostPaymentResponse,
  PostResponse,
} from "./responses";

export const createPost = async (
  request: CreatePostRequest
): Promise<PostModel> => {
  console.log(request);
  const { data } = await instance.post<PostResponse>(API_POST, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return mapPostModel(data);
};

export const payPost = async (
  id: number,
  method: EnumKeys<typeof PaymentMethod>
): Promise<PostPaymentModel> => {
  const { data } = await instance.post<PostPaymentResponse>(
    API_POST_PAYMENT.replace("{id}", id.toString()),
    {
      method: method,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapPostPaymentModel(data);
};

export const getPosts = async ({
  id,
  status,
  freelancerId,
  keyword,
  pageNumber,
  majorIds,
  serviceType,
}: {
  id?: number;
  freelancerId?: number;
  status?: EnumKeys<typeof PostStatus>;
  keyword?: string;
  pageNumber?: number;
  majorIds?: number[];
  serviceType?: EnumKeys<typeof ServiceTypes>;
}): Promise<PaginationModel<PostModel>> => {
  const { data } = await instance.get<PaginationResponse<PostResponse>>(
    API_POST,
    {
      params: {
        status: status,
        accountId: id,
        sortDir: SortDir.Desc,
        freelancerId: freelancerId,
        sortColumn: "createdAt",
        keyword: keyword,
        pageNumber: pageNumber,
        pageSize: 10,
        majorIds: majorIds,
        serviceType: serviceType,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      paramsSerializer: customParamsSerializer,
    }
  );
  return mapPage(data, mapPostModel);
};

export const getPostDetail = async (id: string): Promise<PostDetailModel> => {
  const { data } = await instance.get<PostDetailResponse>(
    API_POST_DETAIL.replace("{id}", id)
  );
  return mapPostDetailModel(data);
};

export const acceptPost = async (id: string) => {
  await instance.post<PostResponse>(API_POST_ACCEPT.replace("{id}", id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

export const completePost = async (id: string) => {
  await instance.post<PostResponse>(API_POST_COMPLETE.replace("{id}", id), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
