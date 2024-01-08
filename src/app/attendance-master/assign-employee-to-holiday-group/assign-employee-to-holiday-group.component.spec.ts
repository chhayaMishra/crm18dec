import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeToHolidayGroupComponent } from './assign-employee-to-holiday-group.component';

describe('AssignEmployeeToHolidayGroupComponent', () => {
  let component: AssignEmployeeToHolidayGroupComponent;
  let fixture: ComponentFixture<AssignEmployeeToHolidayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeeToHolidayGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEmployeeToHolidayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
