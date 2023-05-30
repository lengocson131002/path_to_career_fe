import { API_FILE } from "@/commons/api";
import { RcFile } from "antd/es/upload";
import instance from "../instance";
import { FileModel } from "./models";
import { UploadFileResponse } from "./responses";

export const upload = async (file: RcFile): Promise<FileModel> => {
  const { data } = await instance.post<UploadFileResponse>(
    API_FILE,
    {
      file: file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        type: "formData",
      },
    }
  );
  return {
    fileName: data.fileName,
    url: data.url,
  };
};
