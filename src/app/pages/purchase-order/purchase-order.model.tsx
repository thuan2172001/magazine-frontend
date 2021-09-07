export interface PurchaseOrderModel {
  _id: any;
  code: string;
  name: string;
  agencyAddress: string;
  phoneNumber: string;
}

export interface PurchaseOrderSearchModel {
  _id?: any;
  code?: string;
  name?: string;
  agencyAddress?: string;
  phoneNumber?: string;
}
