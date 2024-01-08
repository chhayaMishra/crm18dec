import { Directive, ElementRef, HostListener, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appNumberValidation]",
})
export class NumberValidationDirective {
  constructor(
    private el: ElementRef,
    @Optional() private ngControl: NgControl,
  ) {}

  @HostListener("keypress", ["$event"]) onKeyPress(event: KeyboardEvent) {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "Delete",
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener("blur") onBlur() {
    this.ngControl.control.setValue(this.el.nativeElement.value.trim());
  }
}
