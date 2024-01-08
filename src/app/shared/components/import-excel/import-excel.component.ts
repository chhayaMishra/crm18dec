import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CRUDFunction } from "../../global-functions/crudFunctions.service";
import { FormateDateService } from "../../global-functions/formate-date.service";
import { ToastrService } from "ngx-toastr";
import * as XLSX from 'xlsx';
import { ExcelAPIService } from '../Service/excel-api.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ImportExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CRUDFunction: CRUDFunction,
    private formateDateService: FormateDateService,
    private toastrService: ToastrService,
    private excelAPIService: ExcelAPIService
  ) { }

  ngOnInit(): void { }

  //#region function to download the template for the import
  downloadTemplete() {
    this.CRUDFunction.exportAsExcelFile(this.data.downloadTemplete, "ExcelSheet" + this.formateDateService.formatDate(new Date()));
  }
  //#endregion

  //#region function to upload the sheet which we needed to import
  importExcel(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>evt.target;
    let isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    let inputFile
    target.files.length > 1 ? inputFile.nativeElement.value = "" : '';
    if (isExcelFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        / read workbook /;
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {
          type: "binary",
          cellDates: true,
        });
        / grab first sheet /;
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        / save data /;
        data = XLSX.utils.sheet_to_json(ws);
      };
      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        let keys = Object.keys(data);


        this.excelAPIService[this.data.apiName](data).subscribe((res: any) => {


          this.CRUDFunction.apiResponce(res, '');
        });
      };
    } else {
      inputFile.nativeElement.value = "";
    }
  }
  //#endregion



  //#region function to close the dialog
  closePopup() {
    this.dialogRef.close();
  }
  //#endregion
}
