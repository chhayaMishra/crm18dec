import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { PopupFunctionService } from "../../shared/global-functions/popup-function.service";
import { AssetsService } from "../Service/assets.service";
import { ImportExcelComponent } from "src/app/shared/components/import-excel/import-excel.component";

@Component({
  selector: "app-company-assets",
  templateUrl: "./company-assets.component.html",
  styleUrls: ["./company-assets.component.scss"],
})
export class CompanyAssetsComponent implements OnInit {
  pageName: any = [
    { name: "All Assets", id: "1", class: "activeButton" },
    { name: "Track Assets", id: "2", class: "releaseButton" },
  ];
  activePageId: any = "1";
  searchString: string = "";
  item: string;
  faultyImportsList: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: string };

  constructor(
    private CRUDFunction: CRUDFunction,
    private popupFunctionService: PopupFunctionService,
    private assetsService: AssetsService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void { }

  //#region function for make the active button change
  activePageSelectoin(id) {
    this.activePageId = id;
    this.pageName.map((pageName) => {
      if (pageName.id == id) {
        pageName.class = "activeButton";
      } else {
        pageName.class = "releaseButton";
      }
    });
  }
  //#endregion

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? (this.searchString = value, this.item = this.searchString) : this.searchString = '';
  }
  //#endregion

  //#region function for route to the page for the add assets
  addAssets() {
    this.CRUDFunction.routingWithData("assets-master/add-update-assets", null);
  }
  //#endregion

  //#region function for open popup for the faulty import
  faultyImportPopup(faultyImportContent) {
    this.getfaultyimport();
    this.popupFunctionService.poupOpenFunction(faultyImportContent, "lg");
  }
  //#endregion

  //#region function for get the list of the faulty imports in assets
  getfaultyimport() {
    let post = {
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
    };
    this.assetsService.getfaultyimport(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingInPagination(res);
        this.faultyImportsList = data["tableData"];
        this.config.totalItems = data["totalLength"];
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for download the faulty imports
  downloadFaultyImports(assetImportFaultyLogsGroupsId) {
    this.assetsService
      .getfaultyimportdatalist(assetImportFaultyLogsGroupsId)
      .subscribe(
        (res: any) => {
          let data = this.CRUDFunction.responceBinding(res);
          data
            ? this.CRUDFunction.exportAsExcelFile(
              data,
              " faultyImport" + new Date(),
            )
            : "";
        },
        (error) => {
          this.CRUDFunction.handleHttpError(error);
        },
      );
  }
  //#endregion

  //#region function to import assets
  importAssets() {
    let templete = [{
      itemName: '',
      assetsBaseCategoryName: '',
      assetsCategoryName: '',
      wareHouseName: '',
      itemCode: '',
      serialNo: '',
      location: '',
      purchaseDate: '',
      assetCondition: '',
      assetsDescription: '',
      assetType: '',
      invoiceNo: '',
      price: '',
      warrantyExpDate: '',
      licenseKey: '',
      licenseStartDate: '',
      licenseExpiryDate: '',
      licApplicableCount: '',
      assignDate: '',
      officeemail: '',
    }];
    let post = {
      downloadTemplete: templete,
      apiName: 'importassetsbyexcel',
    }
    this.popupFunctionService.matDialogBoxPopup(ImportExcelComponent, post, "1000px");
  }
  //#endregion

  //#region function to recieve data from the child component
  receiveDataFromChild(data: string) {

    this.searchString = data;
  }
  //#endregion
}
