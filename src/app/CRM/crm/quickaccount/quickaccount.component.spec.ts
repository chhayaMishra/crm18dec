import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickaccountComponent } from './quickaccount.component';

describe('QuickaccountComponent', () => {
  let component: QuickaccountComponent;
  let fixture: ComponentFixture<QuickaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
