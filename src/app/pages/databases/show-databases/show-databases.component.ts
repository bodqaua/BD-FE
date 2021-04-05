import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseServiceInterface, ModalServiceInterface} from 'src/app/shared/models/services.interface';
import {DatabaseModel} from 'src/app/shared/models/database.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalCreateTableComponent} from 'src/app/modals/modal-create-table/modal-create-table.component';

@Component({
  selector: 'app-show-databases',
  templateUrl: './show-databases.component.html',
  styleUrls: ['./show-databases.component.scss']
})
export class ShowDatabasesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'action'];
  public dataSource = [];

  constructor(
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface,
    @Inject('ModalService') private modalService: ModalServiceInterface,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadDatabases();
  }

  public goToDatabase(database: DatabaseModel): void {
    this.router.navigate([database.name], {relativeTo: this.route});
  }

  public openCreateDatabaseModal(): void {
    this.modalService.openModal(ModalCreateTableComponent);
  }

  private loadDatabases(): void {
    this.databaseService.loadDatabases().subscribe((databases) => {
      this.dataSource = databases;
    });
  }
}
