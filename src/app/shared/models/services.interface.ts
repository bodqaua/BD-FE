import {Observable} from 'rxjs';
import {DatabaseModel, TableStructureModel} from 'src/app/shared/models/database.model';
import {MatDialogRef} from '@angular/material/dialog';

export interface DatabaseServiceInterface {
  loadDatabases(): Observable<DatabaseModel[]>;
  loadTables(database: string): Observable<DatabaseModel[]>;
  loadTableStructure(database: string, table: string): Observable<TableStructureModel[]>;
  loadTableData(database: string, table: string): Observable<any>;
}

export interface ModalServiceInterface {
  openModal(component: any, data?: any): MatDialogRef<any>;
}
