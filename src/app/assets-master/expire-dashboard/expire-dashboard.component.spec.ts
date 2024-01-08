import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExpireDashboardComponent } from "./expire-dashboard.component";

describe("ExpireDashboardComponent", () => {
  let component: ExpireDashboardComponent;
  let fixture: ComponentFixture<ExpireDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpireDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
