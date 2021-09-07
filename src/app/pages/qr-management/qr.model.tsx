import {UserModelForQR as UserModel} from '../user/user.model';

export type QrModel = CommonQr & Partial<QrPdf> & {
  _id?: string;
  code: string;
  activeBy: {
    _id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  },
  activeAt: Date;
  codeType: string;
  takenBy: UserModel;
  takenLocation: Location;
  productPlan?: CommonQr & {
    seeding: {
      technical: string[] | { fullName: string }[];
    };
    harvesting: {
      leader: string[] | UserModel[];
      worker: string[] | UserModel[];
      manager: string | UserModel;
      technical: string[] | UserModel[];
      farmLocation: Location | Image;
      imageBefore: Location | Image;
      imageAfter: Location | Image;
      imageInProgress: Location[] | Image[] | (Location & Image)[];
      area: number;
      realQuantity: number;
      temperature: number;
      humidity: number;
      porosity: number;
      landLot: string;
      code: string;
      startTime: Date;
      endTime: Date;
    };
    preliminaryTreatment: {
      startTime: Date;
      endTime: Date;
      realQuantity: number;
      imageInProgress: Location | Image;
      imageBefore: Location | Image;
      imageAfter: Location | Image;
    };
    cleaning: {
      startTime: Date;
      endTime: Date;
      realQuantity: number;
      imageInProgress: Location | Image;
      imageBefore: Location | Image;
      imageAfter: Location | Image;
      leader: string[] | UserModel[];
      worker: string[] | UserModel[];
      manager: string | UserModel;
      technical: string[] | UserModel[];
    };
    packing: {
      leader: string[] | UserModel[];
      manager: string | UserModel;
      quantity: number;
      packing: {
        code: string;
      };
      packingImage: Image | Location;
    };
    preservation: {
      startTime: Date;
      endTime: Date;
      temperature: number;
      worker: string[] | UserModel[];
      technical: string[] | UserModel[];
      location: Location;
    };
  };
  distributionInfo: {
    exportTime: Date;
    exportAddress: string[]
    exportStaff: UserModel;
    shipper: UserModel;
    receiveTime: Date;
    receiveAddress: string[];
    receiveStaff: UserModel;
    image: Image | Location;
  }[];
  shippingInfo: {
    exportTime: Date;
    exportAddress: string[]
    exportStaff: UserModel;
    shipper: UserModel;
  }[];
  sellStatus: {
    status: boolean;
    dateOfSell: Date;
    sellAddress: string[];
    seller: UserModel;
    customerPhoneNumber: string;
  };
  type: { code: string, name: string };
}

export type QrParent = CommonQr & {}

export type QrChild = CommonQr & {}

type CommonQr = Partial<any>;

type Location = {
  coordinates: string[],
  type: string,
}

type Image = {
  hash: string;
  path: string;
}

export type QrPdf = {
  // buffers: {data: BlobPart[]}[];
  buffers: any;
}