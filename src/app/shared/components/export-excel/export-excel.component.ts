import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CRUDFunction } from "../../global-functions/crudFunctions.service";
import { FormateDateService } from "../../global-functions/formate-date.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-export-excel",
  templateUrl: "./export-excel.component.html",
  styleUrls: ["./export-excel.component.scss"],
})
export class ExportExcelComponent implements OnInit {
  customExport: any = [];

  constructor(
    private dialogRef: MatDialogRef<ExportExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDFunction: CRUDFunction,
    private formateDateService: FormateDateService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void { }

  //#region function to close the dialog
  closePopup() {
    this.dialogRef.close();
  }
  //#endregion

  //#region function for check the checkbox for the custom export
  checkBoxCheck(check: boolean, item, index) {
    check ? this.customExport.push(item) : this.customExport.splice(index, 1);
  }
  //#endregion

  excelExport(check) {
    check ? (this.customExport = this.data.checkBoxArray) : (this.customExport = this.customExport);
    if (this.customExport.length != 0) {
      let exportSheet = [];
      let key = this.customExport.map((x) => x.name);
      let value = this.customExport.map((x) => x.bindableValue);
      let isDate = this.customExport.map((x) => x.isDate);
      this.data.visibleTableList.forEach((x, i) => {
        let post = {};
        key.forEach((element, i) => { key.includes(...key) ? (post[key[i]] = isDate[i] && x[value[i]] ? this.formateDateService.formatDate(x[value[i]]) : x[value[i]]) : ""; });
        exportSheet.push(post);
        this.closePopup();
      });
      this.CRUDFunction.exportAsExcelFile(exportSheet, "Excel Sheet" + new Date());
      this.customExport = [];
    } else {
      this.toastrService.error("Please select atleast one check box");
    }
  }
}
