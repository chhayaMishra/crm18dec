import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayInHolidayGroupComponent } from './add-holiday-in-holiday-group.component';

describe('AddHolidayInHolidayGroupComponent', () => {
  let component: AddHolidayInHolidayGroupComponent;
  let fixture: ComponentFixture<AddHolidayInHolidayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHolidayInHolidayGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayInHolidayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
