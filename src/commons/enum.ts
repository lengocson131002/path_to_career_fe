export enum ServiceTypes {
  ReviewCV = "Review CV",
  CreateCV = "Tạo CV",
  MockInterview = "Phỏng vấn thử",
}

export enum Roles {
  Freelancer = "Freelancer",
  User = "Người dùng",
}

export enum JobLevel {
  Internship = "Internship",
  Fresher = "Fresher",
  Junior = "Junior",
  Middle = "Middle",
  Senior = "Senior",
}

export enum CvType {
  Normal = "CV thường",
  Portfolio = "Website portfolio",
  Other = "Khác",
}

export enum CvStyle {
  Simple = "Đơn giản",
  Professional = "Chuyên nghiệp",
  Colorful = "Màu sắc",
  Creative = "Sáng tạo",
  Formal = "Kinh nghiệm",
}
export enum PostStatus {
  New = "Mới",
  Done = "Hoàn thành",
}
export type EnumValues<T> = T[keyof T];
export type EnumKeys<T> = keyof T;

export function getEnumKeys<T extends Record<string, string | number>>(
  enumObject: T
): Array<keyof T> {
  return Object.keys(enumObject) as Array<keyof T>;
}

export function getEnumKeyByValue<T extends Record<string, string | number>>(
  enumObject: T,
  value: T[keyof T]
): keyof T | undefined {
  const keys = Object.keys(enumObject) as Array<keyof T>;
  for (const key of keys) {
    if (enumObject[key] === value) {
      return key;
    }
  }
  return undefined;
}
export function enumToList<T extends Record<string, string | number>>(
  enumObject: T
): Array<{
  label: string | number;
  key: string;
  value: string;
}> {
  return Object.keys(enumObject).map((type, i) => ({
    label: Object.values(enumObject)[i],
    key: type,
    value: type,
  }));
}
