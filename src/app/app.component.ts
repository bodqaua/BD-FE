import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseServiceInterface, ModalServiceInterface} from 'src/app/shared/models/services.interface';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {ModalCreateTableDataComponent} from 'src/app/modals/modal-create-table-data/modal-create-table-data.component';
import {ModalCreateUserComponent} from 'src/app/modals/modal-create-user/modal-create-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'db-driver';

  public tableData: any;
  public readonly auth: AuthService;

  constructor(
    @Inject('DatabaseService') private databaseService: DatabaseServiceInterface,
    @Inject('ModalService') private modalService: ModalServiceInterface,
    private authService: AuthService,
    private router: Router
  ) {
    this.auth = authService;
  }

  ngOnInit(): void {
    this.fetchDatabaseData();
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  public print(): void {
    window.print();
  }

  private fetchDatabaseData(): void {
    this.databaseService.fetchDatabaseInfo().subscribe(res => this.tableData = res);
  }

  public createUser(): void {
    this.createUserModal();
  }

  private createUserModal(): void {
    this.modalService.openModal(ModalCreateUserComponent, {
    }).afterClosed().subscribe(res => {
    });
  }
}
