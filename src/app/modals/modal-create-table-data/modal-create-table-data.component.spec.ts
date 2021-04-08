import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTableDataComponent } from './modal-create-table-data.component';

describe('ModalCreateTableDataComponent', () => {
  let component: ModalCreateTableDataComponent;
  let fixture: ComponentFixture<ModalCreateTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateTableDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
