export enum SortDir {
  Desc = "Desc",
  Asc = "Asc",
}

export enum PostStatusColor {
  New = "cyan",
  Done = "green",
  Paid = "gold",
  Accepted = "blue",
}

export enum ServiceTypes {
  ReviewCV = "Review CV",
  CreateCV = "Tạo CV",
  MockInterview = "Phỏng vấn thử",
}

export enum ServiceTypeColor {
  ReviewCV = "red",
  CreateCV = "green",
  MockInterview = "blue",
}

export enum Roles {
  Admin = "Quản trị viên",
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
  New = "Mới tạo",
  Paid = "Đã thanh toán",
  Accepted = "Đã nhận",
  Done = "Hoàn thành",
}

export enum PaymentMethod {
  Momo = "Ví điện tử Momo",
  Banking = "Tài khoản ngân hàng",
}

export enum PaymentMethodColor {
  Momo = "magenta",
  Banking = "cyan",
}
export enum TransactionStatus {
  New = "Mới tạo",
  Completed = "Hoàn tất",
  Canceled = "Đã hủy",
}

export enum TransactionStatusColor {
  New = "cyan",
  Completed = "green",
  Canceled = "red",
}
export enum MessageType {
  Text = "Text",
  Image = "Image",
  File = "File",
}

export enum NotificationType {
  FreelancerCreated = "A freelancer has been register. Let's check and approve his/her account",
  FreelancerAccepted = "You freelancer account has been approved. Let's check and use our service",
  PostCreated = "A post has been created. Let's check and support it",
  TransactionCreated = "A transaction has been created. Let's check",
  TransactionConfirmed = "Your transaction has been confirm. Waiting freelancer contact to support",
  TransactionCanceled = "Your transaction has been canceled. Let's check again",
  MessageCreated = "You have new message in a post. Let's check",
}

export enum NotificationTitle {
  FreelancerCreated = "Tài khoản freelancer chờ duyệt",
  FreelancerAccepted = "Tài khoản freelacer đã được duyệt",
  PostCreated = "Bài đăng mới được tạo",
  TransactionCreated = "Giao dịch mới được tạo",
  TransactionConfirmed = "Giao dịch đã được xử lý",
  TransactionCanceled = "Giao dịch thất bại",
  MessageCreated = "Bạn có tin nhắn mới",
}

export enum NotificationContent {
  FreelancerCreated = "Một tài khoản freelancer đã được tạo mới. Vui lòng kiểm tra và chấp thuận.",
  FreelancerAccepted = "Tài khoản freelancer của bạn đã được duyệt.",
  PostCreated = "Một bài đăng mới được tạo. Vui lòng kiểm tra.",
  TransactionCreated = "Giao dịch mới được tạo. Vui lòng kiểm tra",
  TransactionConfirmed = "Giao dịch của bạn đã được xử lý.",
  TransactionCanceled = "Giao dịch của bạn thất bại.",
  MessageCreated = "Bạn có tin nhắn mới.",
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
