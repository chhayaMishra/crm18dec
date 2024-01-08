import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickconatactComponent } from './quickconatact.component';

describe('QuickconatactComponent', () => {
  let component: QuickconatactComponent;
  let fixture: ComponentFixture<QuickconatactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickconatactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickconatactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
