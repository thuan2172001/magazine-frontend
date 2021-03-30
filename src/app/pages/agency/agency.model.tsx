export interface AgencyModel {
  _id?: string;
  code: string;
  name: string;
  // address: string;
  address: {
    state: string;
    city: string;
    district: string;
    address: string;
  };
  image: Array<string>;
  owner: {
    address?: {
      address: string;
      district: string;
      city: string;
      state: string;
    },
    email: string;
    fullName: string;
    gender: string | null;
    phone: string;
    role: {
      name: string;
      _id?: string;
      level: number;
      scope: string;
    }
  };
  phone: string;
  // shippingAddress: string;
  shippingAddress: Array<{
    _id: any;
    address: string;
    state: string;
    city: string;
    district: string;
    isDefault: boolean
  }>;
  status: boolean;
  taxId: string;
  storeLevel: object | string | null;
  
  username?: string;
  fullName?: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  email?: string;
  birthDay?: Date | null,
  gender?: string | null;
  roleName?: object | null;
  phoneNumber?: string;
  detailAddress?: string;
  district?: string | null;
  city?: string | null;
  state?: string | null;
  
  
}
