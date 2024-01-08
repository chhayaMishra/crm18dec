import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityComponentComponent } from './utility-component.component';

describe('UtilityComponentComponent', () => {
  let component: UtilityComponentComponent;
  let fixture: ComponentFixture<UtilityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
