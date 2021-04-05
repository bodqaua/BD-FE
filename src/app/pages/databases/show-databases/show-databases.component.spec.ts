import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDatabasesComponent } from './show-databases.component';

describe('ShowDatabasesComponent', () => {
  let component: ShowDatabasesComponent;
  let fixture: ComponentFixture<ShowDatabasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDatabasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
