export interface DatabaseModel {
  name: string;
}

export interface TableStructureModel {
  Default: string | null;
  Extra: string;
  Field: string;
  Key: string;
  Null: string;
  Type: string;
}
