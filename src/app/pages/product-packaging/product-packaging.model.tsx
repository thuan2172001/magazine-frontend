import {SpeciesModel} from "../species/species.model";

export interface ProductPackagingModel {
  _id: any;
  code: string;
  name: string;
  weight: string;
  species: SpeciesModel;
}

