export interface MultiLevelModel {

}

export interface TreeData {
  _id: string;
  code: string;
  level: number;
  name: string;
  status: string;
  parent?: string;
  children?: TreeData[]
}

export interface MultilevelSaleBodyProp {
  title?: string;
  body: { title?: string; type: string; data: any }[];
  onCreate?: (entity: any) => void;
  onEdit?: (entity: any) => void;
  onDelete?: (entity: any) => void;
  onFetchEntities?: (entity: any) => void;
}