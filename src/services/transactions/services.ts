import {
  API_TRANSACTION,
  API_TRANSACTION_CANCEL,
  API_TRANSACTION_CONFIRM,
  API_TRANSACTION_DETAIL,
} from "@/commons/api";
import { PaginationModel } from "../core/models";
import { PaginationResponse } from "../core/responses";
import instance from "../instance";

import { mapPage } from "@/adapter/PaginationAdapter";
import {
  mapTransactionDetailModel,
  mapTransactionModel,
} from "@/adapter/TransactionAdapter";
import { TransactionDetailModel, TransactionModel } from "./models";
import { TransactionDetailResponse, TransactionResponse } from "./responses";

export const getTransactions = async ({
  page,
}: {
  page: number;
}): Promise<PaginationModel<TransactionModel>> => {
  const { data } = await instance.get<PaginationResponse<TransactionResponse>>(
    API_TRANSACTION,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        pageSize: 10,
        pageNumber: page,
      },
    }
  );
  return mapPage(data, mapTransactionModel);
};

export const getTransactionDetail = async (
  id: string
): Promise<TransactionDetailModel> => {
  const { data } = await instance.get<TransactionDetailResponse>(
    API_TRANSACTION_DETAIL.replace("{id}", id),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return mapTransactionDetailModel(data);
};

export const confirmTransaction = async (id: string) => {
  await instance.post<TransactionDetailResponse>(
    API_TRANSACTION_CONFIRM.replace("{id}", id),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
export const cancelTransaction = async (id: string) => {
  await instance.delete<TransactionDetailResponse>(
    API_TRANSACTION_CANCEL.replace("{id}", id),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};
