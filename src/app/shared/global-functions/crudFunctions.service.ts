import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as FileSaver from "file-saver";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";
import * as XLSX from "xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root",
})
export class CRUDFunction {
  errorMessage = "Please fill all required fields";

  constructor(
    private toastrService: ToastrService,
    private NgbModal: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  //#region function to check the validation of th e form
  checkValidation(formValidation) {
    var approved;
    if (formValidation.invalid) {
      approved = false;
      this.toastrService.error(this.errorMessage);
    } else {
      approved = true;
    }
    return approved;
  }
  //#endregion

  //#region functoin to return the toastr for success/error message
  apiResponce(res, responceMessage) {
    let success;
    if (res.status) {
      success = true;
      this.toastrService.success(
        responceMessage +
        " " +
        res.message +
        (responceMessage ? " Successfully" : ""),
      );
      this.NgbModal.dismissAll();
    } else {
      success = false;
      this.toastrService.error(res.message);
    }
    return success;
  }
  //#endregion

  //#region functoin to return the toastr for success/error message
  apiResponceWithOutToaster(res) {
    let success;
    if (res.status) {
      success = true;
      this.NgbModal.dismissAll();
    } else {
      success = false;
      this.toastrService.error(res.message);
    }
    return success;
  }
  //#endregion

  //#region function to bind the data to the variable which will show in table
  responceBinding(res) {
    let tableData = [];
    if (res.status) {
      tableData = res.data;
    } else {
      tableData = [];
    }
    return tableData;
  }
  //#endregion

  //#region function to bind the data to the variable which will show act as object
  responceBindingAsObject(res) {
    let responce: any;
    if (res.status) {
      responce = res.data;
    } else {
      responce = [];
    }
    return responce;
  }
  //#endregion

  //#region function to check the file size and the file type before upload
  checkFileSizeAndType(file, type) {
    if (!file[0].type.includes(type)) {
      let failStatus = true;
      this.toastrService.error("Please upload only " + type + " file");
      return failStatus;
    } else if (file[0].size > 5245329) {
      let failStatus = true;
      this.toastrService.error("Please upload file less then 5MB");
      return failStatus;
    } else {
      let failStatus = false;
      return failStatus;
    }
  }
  //#endregion

  //#region function to route to the another page with the data encoded using btoa
  routingWithData(URL, data) {
    this.router.navigate([URL], {
      queryParams: {
        data: btoa(JSON.stringify(data)),
      },
    });
  }
  //#endregion

  //#region function to route to the another page
  routingWithOutData(URL) {
    this.router.navigate([URL]);
  }
  //#endregion

  //#region function to get the data from the url which is encoded using btoa
  dataDecoding() {
    let queryData = null;
    this.activatedRoute.queryParams.subscribe((res) => {
      res.data ? (queryData = JSON.parse(atob(res.data))) : "";
    });
    return queryData;
  }
  //#endregion

  //#region function to bind the data to the variable which will show in table
  responceBindingInPagination(res) {
    let post = {};
    if (res.status) {
      post = {
        tableData: res.data.listData,
        totalLength: res.data.totalLength,
      };
    } else {
      post = {
        tableData: [],
        totalLength: 0,
      };
    }
    return post;
  }
  //#endregion

  //#region function to handle the error recive while api calling
  handleHttpError(error) {
    if (error?.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error("An error occurred:", error?.error?.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    // Return a user-friendly error message or a generic message
    return throwError("Something went wrong. Please try again later.");
  }
  //#endregion

  //#region function to export the table as excel sheet
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION,
    );
  }
  //#endregion
}
