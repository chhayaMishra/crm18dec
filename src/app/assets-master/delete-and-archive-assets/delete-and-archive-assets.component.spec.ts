import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteAndArchiveAssetsComponent } from "./delete-and-archive-assets.component";

describe("DeleteAndArchiveAssetsComponent", () => {
  let component: DeleteAndArchiveAssetsComponent;
  let fixture: ComponentFixture<DeleteAndArchiveAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAndArchiveAssetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAndArchiveAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
