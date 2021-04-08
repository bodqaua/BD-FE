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

export enum TTableTypes {
  INT = 'INT',
  TEXT = 'TEXT',
  DATE = 'DATE'
}

export type TTableFieldType = TTableTypes.INT | TTableTypes.TEXT | TTableTypes.DATE;

export const TableTypes = [TTableTypes.INT, TTableTypes.TEXT, TTableTypes.DATE]
