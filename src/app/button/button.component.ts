import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input("text") text: string;
  @Input() buttonstyle: object;
  @Input() icon: any;
  @Input() buttonClass: object;
  @Input() type: object;
  //  width: any='';

  constructor() {}

  ngOnInit(): void {}
}
