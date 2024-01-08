import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddUpdateAssetsComponent } from "./add-update-assets.component";

describe("AddUpdateAssetsComponent", () => {
  let component: AddUpdateAssetsComponent;
  let fixture: ComponentFixture<AddUpdateAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateAssetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
