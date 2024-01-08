import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExpireAssetsComponent } from "./expire-assets.component";

describe("ExpireAssetsComponent", () => {
  let component: ExpireAssetsComponent;
  let fixture: ComponentFixture<ExpireAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpireAssetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpireAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
