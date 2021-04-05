import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseServiceInterface} from 'src/app/shared/models/services.interface';
import {flatMap, map, toArray} from 'rxjs/operators';

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
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface
  ) {
  }

  ngOnInit(): void {
    this.parseUrl();
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
