import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHolidayGroupComponent } from './add-update-holiday-group.component';

describe('AddUpdateHolidayGroupComponent', () => {
  let component: AddUpdateHolidayGroupComponent;
  let fixture: ComponentFixture<AddUpdateHolidayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateHolidayGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateHolidayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
