import {
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() items: any = [];
  @Output() dataEvent = new EventEmitter<any>();
  table: any;
  tableDetails: any = [];
  tableHead: any = [];
  id: any;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.table = changes.items.currentValue;
    this.tableDetails = changes.items.currentValue.tableDetails;
    this.tableHead = changes.items.currentValue.tableHead;
    this.id = changes.items.currentValue.id[0];
  }

  ngOnInit() {}

  //#region function to send the data to the parent component
  sendToParent(id) {
    this.dataEvent.emit(id);
  }
  //#endregion
}
