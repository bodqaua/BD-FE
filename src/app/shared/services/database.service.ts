import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';
import {DatabaseModel, TableStructureModel} from 'src/app/shared/models/database.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements DatabaseServiceInterface {
  private env = environment;

  constructor(
    private http: HttpClient
  ) {
  }

  public loadDatabases(): Observable<DatabaseModel[]> {
    return this.http.post<DatabaseModel[]>(this.env.DATABASE_LOAD, {});
  }

  public loadTables(database: string): Observable<DatabaseModel[]> {
    return this.http.post<DatabaseModel[]>(this.env.DATABASE_BASE + database, {});
  }

  public loadTableStructure(database: string, table: string): Observable<TableStructureModel[]> {
    return this.http.post<TableStructureModel[]>(`${this.env.DATABASE_BASE}${database}/structure/${table}` , {});
  }

  public loadTableData(database: string, table: string): Observable<any> {
    return this.http.post(`${this.env.DATABASE_BASE}${database}/${table}` , {});
  }

}
