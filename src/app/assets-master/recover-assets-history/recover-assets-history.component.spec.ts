import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAssetsHistoryComponent } from './recover-assets-history.component';

describe('RecoverAssetsHistoryComponent', () => {
  let component: RecoverAssetsHistoryComponent;
  let fixture: ComponentFixture<RecoverAssetsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAssetsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverAssetsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
