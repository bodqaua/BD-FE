import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceInterface, ModalServiceInterface} from 'src/app/shared/models/services.interface';
import {flatMap, map, toArray} from 'rxjs/operators';
import {ModalCreateTableDataComponent} from 'src/app/modals/modal-create-table-data/modal-create-table-data.component';

@Component({
  selector: 'app-show-table-content',
  templateUrl: './show-table-content.component.html',
  styleUrls: ['./show-table-content.component.scss']
})
export class ShowTableContentComponent implements OnInit {
  public table: string;
  public dataSource: any[] = [];
  public displayedColumns: string[] = [];
  public mapColumns: string[] = [];
  private database: string;

  constructor(
    private route: ActivatedRoute,
    @Inject('ModalService') private modalService: ModalServiceInterface,
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface
  ) {
  }

  ngOnInit(): void {
    this.parseUrl();
  }

  public openCreateContentDatabase(): void {
    this.modalService.openModal(ModalCreateTableDataComponent, {
      columns: this.displayedColumns,
      database: this.database,
      table: this.table
    }).afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.loadData();
      this.loadStructure();
    });
  }

  public deleteRecord(id: number | string): void {
    this.databaseService.delete(this.database, this.table, id).subscribe(res => {
      this.loadData();
    });
  }

  private parseUrl(): void {
    this.database = this.route.snapshot.paramMap.get('database');
    this.table = this.route.snapshot.paramMap.get('table');
    this.loadStructure();
  }

  private loadData(): void {
    this.databaseService.loadTableData(this.database, this.table).subscribe(response => {
      this.dataSource = response;
    });
  }

  private loadStructure(): void {
    this.databaseService.loadTableStructure(this.database, this.table).pipe(
      flatMap((tables) => tables),
      map((item) => item.Field),
      toArray()
    ).subscribe(response => {
      this.mapColumns = [...response];
      response.push('action');
      this.displayedColumns = response;
      this.loadData();
    });
  }

}
