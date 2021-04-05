import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseModel} from 'src/app/shared/models/database.model';

@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.scss']
})
export class ShowTablesComponent implements OnInit, OnDestroy {
  private subscription$ = new Subscription();

  public databaseName: string;
  public displayedColumns: string[] = ['name', 'action'];
  public dataSource = [];

  constructor(
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTableFromRoute();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
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


  public goToTable(database: DatabaseModel): void {
    this.router.navigate([database.name], {relativeTo: this.route});
  }
}
