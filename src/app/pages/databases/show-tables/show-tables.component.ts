import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DatabaseServiceInterface, ModalServiceInterface} from 'src/app/shared/models/services.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseModel} from 'src/app/shared/models/database.model';
import {ModalCreateTableComponent} from 'src/app/modals/modal-create-table/modal-create-table.component';

@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.scss']
})
export class ShowTablesComponent implements OnInit, OnDestroy {
  public databaseName: string;
  public displayedColumns: string[] = ['name', 'action'];
  public dataSource = [];
  private subscription$ = new Subscription();

  constructor(
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface,
    @Inject('ModalService') private modalService: ModalServiceInterface,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getTableFromRoute();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public openCreateTableModal(): void {
    this.modalService.openModal(ModalCreateTableComponent, {databaseName: this.databaseName}, '600px')
      .afterClosed()
      .subscribe(res => {
        if (!res) {
          return;
        }
        this.loadTables();
      });
  }

  public goToTable(database: DatabaseModel): void {
    this.router.navigate([database.name], {relativeTo: this.route});
  }

  public deleteTable(row: DatabaseModel): void {
    this.databaseService.deleteTable(this.databaseName, row.name).subscribe(res => {
      this.loadTables();
    });
  }

  private getTableFromRoute(): void {
    this.databaseName = this.route.snapshot.paramMap.get('database');
    this.loadTables();
  }

  private loadTables(): void {
    this.databaseService.loadTables(this.databaseName).subscribe((tables) => {
      this.dataSource = tables;
    });
  }
}
