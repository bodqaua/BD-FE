import {Observable} from 'rxjs';
import {DatabaseModel, TableStructureModel} from 'src/app/shared/models/database.model';
import {MatDialogRef} from '@angular/material/dialog';

export interface DatabaseServiceInterface {
  loadDatabases(): Observable<DatabaseModel[]>;
  createDatabase(database: string): Observable<string>;
  deleteDatabase(database: string): Observable<string>;
  loadTables(database: string): Observable<DatabaseModel[]>;
  loadTableStructure(database: string, table: string): Observable<TableStructureModel[]>;
  createTable(database: string, tableName: string, tables: any): Observable<string>;
  deleteTable(database: string, tableName: string): Observable<string>;
  loadTableData(database: string, table: string): Observable<any>;
}

export interface ModalServiceInterface {
  openModal(component: any, data?: any, width?: string): MatDialogRef<any>;
}
