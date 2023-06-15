import { API_MAJOR_CODE } from "@/commons/api";
import instance from "../instance";
import { MajorCode } from "./models";
import { MajorCodeResponse } from "./responses";

export const getMajorCodes = async (): Promise<MajorCode[]> => {
  const { data, status } = await instance.get<Array<MajorCodeResponse>>(
    API_MAJOR_CODE
  );
  if (status !== 200) {
    return Promise.reject();
  }
  return data.map((d) => ({
    id: d.id,
    name: d.name,
    code: d.code,
  }));
};
