import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ArchiveAssetsComponent } from "./archive-assets.component";

describe("ArchiveAssetsComponent", () => {
  let component: ArchiveAssetsComponent;
  let fixture: ComponentFixture<ArchiveAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveAssetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
