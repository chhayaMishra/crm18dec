import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssetsWarehouseAndCategoryComponent } from "./assets-warehouse-and-category.component";

describe("AssetsWarehouseAndCategoryComponent", () => {
  let component: AssetsWarehouseAndCategoryComponent;
  let fixture: ComponentFixture<AssetsWarehouseAndCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetsWarehouseAndCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsWarehouseAndCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
