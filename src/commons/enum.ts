export enum ServiceTypes {
  REVIEW_CV = "Review CV",
  CREATE_CV = "Tạo CV",
  MOCK_INTERVIEW = "Phỏng vấn thử",
}

export enum Roles {
  Freelancer = "Freelancer",
  User = "Người dùng",
}

export const enumToList = (enumO: { [key: string]: string }) => {
  return Object.keys(enumO).map((type, i) => ({
    label: Object.values(enumO)[i],
    key: type,
    value: type,
  }));
};

