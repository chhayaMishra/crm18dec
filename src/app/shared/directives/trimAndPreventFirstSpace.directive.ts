import { Directive, ElementRef, HostListener, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appTrimAndPreventFirstSpace]",
})
export class TrimAndPreventFirstSpaceDirective {
  constructor(
    private el: ElementRef,
    @Optional() private ngControl: NgControl,
  ) {}
  ngOnInit(): void {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (this.el.nativeElement.value.length < 1 && event.key === " ") {
      event.preventDefault();
    }
  }

  @HostListener("blur") onBlur() {
    this.ngControl.control.setValue(this.el.nativeElement.value.trim());
  }
}
