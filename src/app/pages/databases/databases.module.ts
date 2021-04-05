import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatabasesComponent} from './databases.component';
import {RouterModule, Routes} from '@angular/router';
import {ShowDatabasesComponent} from './show-databases/show-databases.component';
import {AuthGuard} from 'src/app/shared/guards/auth.guard';
import {MatTableModule} from '@angular/material/table';
import {DatabaseService} from 'src/app/shared/services/database.service';
import {ShowTablesComponent} from './show-tables/show-tables.component';
import {ShowTableContentComponent} from './show-table-content/show-table-content.component';
import {ModalsModule} from 'src/app/modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: ShowDatabasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':database',
    component: ShowTablesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':database/:table',
    component: ShowTableContentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DatabasesComponent,
    ShowDatabasesComponent,
    ShowTablesComponent,
    ShowTableContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    ModalsModule
  ],
  providers: [
    AuthGuard,
    {provide: 'DatabaseService', useClass: DatabaseService}
  ]
})
export class DatabasesModule {
}
