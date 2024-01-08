import { Component, OnInit, ViewChild } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";
import { FormateDateService } from "../../shared/global-functions/formate-date.service";
import { PopupFunctionService } from "../../shared/global-functions/popup-function.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { ExportExcelComponent } from "src/app/shared/components/export-excel/export-excel.component";

@Component({
  selector: "app-expire-assets",
  templateUrl: "./expire-assets.component.html",
  styleUrls: ["./expire-assets.component.scss"],
})
export class ExpireAssetsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id: any;
  startdate: any = "";
  enddate: any = "";
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  expireAssetsList: any;
  reNewForm: FormGroup;
  submitted: boolean = false;
  itemId: any;
  type: any;
  constructor(
    private CRUDFunction: CRUDFunction,
    private assetsService: AssetsService,
    private formateDateService: FormateDateService,
    private popupFunctionService: PopupFunctionService,
    private formBuilder: FormBuilder,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.dataFromURL();
  }

  //#region function for get the data from the URL
  dataFromURL() {
    this.id = this.CRUDFunction.dataDecoding();
    this.type = this.id;

    this.getexpireassestitemlist();
    this.reNewForms();
  }
  //#endregion

  //#region function to update the form for the validation
  validationUpdate(id) {
    let licenseArray = [
      "itemId",
      "licenseStartDate",
      "licenseExpiryDate",
      "licenseKey",
    ];
    switch (id) {
      case "1":
        licenseArray.forEach((form) => {
          this.reNewForm.controls[form].setValidators([Validators.required]);
          this.reNewForm.controls[form].updateValueAndValidity();
        });
        this.reNewForm.controls.warrantyExpDate.setValidators([]);
        this.reNewForm.controls.warrantyExpDate.updateValueAndValidity();
        break;
      case "2":
        licenseArray.forEach((form) => {
          this.reNewForm.controls[form].setValidators([]);
          this.reNewForm.controls[form].updateValueAndValidity();
        });
        this.reNewForm.controls.warrantyExpDate.setValidators([
          Validators.required,
        ]);
        this.reNewForm.controls.warrantyExpDate.updateValueAndValidity();
        break;
    }
  }
  //#endregion

  //#region function for get the data for the assets in expire section using the id filter
  getexpireassestitemlist() {
    let post = {
      type: this.id,
      startDate: this.formateDateService.formatDate(this.startdate),
      endDate: this.formateDateService.formatDate(this.enddate),
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
    };
    this.assetsService.getexpireassestitemlist(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingInPagination(res);
        this.expireAssetsList = data["tableData"];
        this.config.totalItems = data["totalLength"];
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.getexpireassestitemlist();
  }
  //#endregion

  //#region function for open popup for renew assets
  reNewExpiredAssetPopUP(reNewExpiredAssetComponent, item) {
    item.assetType == "Digital" ? (this.type = "1") : (this.type = "2");

    this.validationUpdate(this.type);
    this.itemId = item.itemId;
    this.reNewForm.get("itemId").setValue(item.assetType);
    this.popupFunctionService.poupOpenFunction(
      reNewExpiredAssetComponent,
      "lg",
    );
  }
  //#endregion

  //#region function for create the form for renew expire asset
  reNewForms() {
    this.reNewForm = this.formBuilder.group({
      itemId: ["", Validators.required],
      licenseStartDate: [""],
      licenseExpiryDate: [""],
      licenseKey: [""],
      warrantyExpDate: [""],
    });
  }
  get reNew() {
    return this.reNewForm.controls;
  }
  //#endregion

  //#region function for submit the re new asset
  reNewAssetsDate(reNewForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(reNewForm)
      ? this.submitValue(reNewForm.value)
      : "";
  }
  submitValue(value) {
    value["itemId"] = this.itemId;
    this.id == 1
      ? (value["licenseStartDate"] = this.formateDateService.formatDate(
        value["licenseStartDate"],
      ))
      : "";
    this.id == 1
      ? (value["licenseExpiryDate"] = this.formateDateService.formatDate(
        value["licenseExpiryDate"],
      ))
      : "";
    this.id == 2
      ? (value["warrantyExpDate"] = this.formateDateService.formatDate(
        value["warrantyExpDate"],
      ))
      : "";

    this.assetsService.renewexpireassets(value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "")
          ? (this.paginator.firstPage(), this.getexpireassestitemlist())
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region funtion to export the list of items in expired section
  exportExpireAssets() {
    let post = {
      type: this.id,
      startDate: this.formateDateService.formatDate(this.startdate),
      endDate: this.formateDateService.formatDate(this.enddate),
      page: this.config.currentPage,
      count: this.config.totalItems,
    };
    this.assetsService.getexpireassestitemlist(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingInPagination(res);
        this.expireAssetsList = data["tableData"];
        this.config.totalItems = data["totalLength"];
        let customExportArray = [
          { name: "Asset Type", bindableValue: "assetType", isDate: false },
          { name: "Asset Name", bindableValue: "itemName", isDate: false },
          { name: "Serial Number", bindableValue: "serialNumber", isDate: false },
          { name: "Item Code", bindableValue: "itemCode", isDate: false },
          { name: "Asset Category", bindableValue: "assetsCategoryName", isDate: false },
          { name: `${this.id == 1 || this.id == 3 ? 'Start Date' : this.id == 2 || this.id == 3 ? 'Purchase Date' : ''}`, bindableValue: `${this.id == 1 || this.id == 3 ? 'licenseStartDate' : this.id == 2 || this.id == 3 ? 'purchaseDate' : ''}`, isDate: true },
          { name: `${this.id == 1 || this.id == 3 ? 'End Date' : this.id == 2 || this.id == 3 ? 'Warranty Expiry Date' : ''}`, bindableValue: `${this.id == 1 || this.id == 3 ? 'licenseEndDate' : this.id == 2 || this.id == 3 ? 'warrantyExpDate' : ''}`, isDate: true },
        ];
        let information = {
          checkBoxArray: customExportArray,
          visibleTableList: this.expireAssetsList,
        }
        this.popupFunctionService.matDialogBoxPopup(ExportExcelComponent, information, '1000px');
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion


}
