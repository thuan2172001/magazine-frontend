export type UserModel = {
  _id: string;
  code: string;
  name: string;
  phone: string;
  status: number | string | boolean;
}

export type UserModelForQR = Partial<UserModel> & {
  fullName: string;
} 