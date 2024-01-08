import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHolidayGroupComponent } from './assign-holiday-group.component';

describe('AssignHolidayGroupComponent', () => {
  let component: AssignHolidayGroupComponent;
  let fixture: ComponentFixture<AssignHolidayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHolidayGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignHolidayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
