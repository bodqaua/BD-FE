import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTableContentComponent } from './show-table-content.component';

describe('ShowTableContentComponent', () => {
  let component: ShowTableContentComponent;
  let fixture: ComponentFixture<ShowTableContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTableContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
