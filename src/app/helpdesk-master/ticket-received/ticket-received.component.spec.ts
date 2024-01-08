import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketReceivedComponent } from "./ticket-received.component";

describe("TicketReceivedComponent", () => {
  let component: TicketReceivedComponent;
  let fixture: ComponentFixture<TicketReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketReceivedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
