import { Component, OnInit, ViewChild } from "@angular/core";
import { AssetsService } from "../Service/assets.service";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { MatPaginator } from "@angular/material/paginator";
import { PopupFunctionService } from '../../shared/global-functions/popup-function.service';
import { ExportExcelComponent } from "src/app/shared/components/export-excel/export-excel.component";
import { FormateDateService } from "src/app/shared/global-functions/formate-date.service";

@Component({
  selector: "app-assets-report",
  templateUrl: "./assets-report.component.html",
  styleUrls: ["./assets-report.component.scss"],
})
export class AssetsReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchString: string = "";
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  assestsReportList: any;
  warehouseList: any[];
  warehouseId: any[];
  baseCategoryList: any[];
  baseCategoryId: any[];
  categoryList: any[];
  categoryId: any[];
  statusList: any[];
  statusId: any[];
  conditionList: any[];
  conditionId: any[];
  startDate: any = null;
  endDate: any = null;

  constructor(
    private assetsService: AssetsService,
    private CRUDFunction: CRUDFunction,
    private popupFunctionService: PopupFunctionService,
    private formateDateService: FormateDateService
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.getassestreport();
    this.getallwarehousefordropdown();
    this.getallbasecategoryfordropdown();
    this.getasseststatusenum();
    this.getallconditionenum();
  }

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? this.searchString = value : this.searchString = '';
    this.searchAssetsReports();
  }
  //#endregion

  //#region function for get the report of assets
  getassestreport() {
    let post = {
      assetsStatus: this.statusId,
      condition: this.conditionId,
      baseCategoryId: this.baseCategoryId,
      categoryId: this.categoryId,
      warehouseIds: this.warehouseId,
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      startDate: this.startDate ? this.formateDateService.formatDate(this.startDate) : this.startDate,
      endDate: this.endDate ? this.formateDateService.formatDate(this.endDate) : this.endDate,
    };
    this.assetsService.getassestreport(post).subscribe(
      (res: any) => {
        let post = this.CRUDFunction.responceBindingInPagination(res);
        this.assestsReportList = post["tableData"];
        this.config.totalItems = post["totalLength"];


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
    this.getassestreport();
  }
  //#endregion

  //#region function for get the warehouse list
  getallwarehousefordropdown() {
    this.assetsService.getallwarehousefordropdown().subscribe(
      (res: any) => {
        this.warehouseList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get all of the basecategory
  getallbasecategoryfordropdown() {
    this.assetsService.getallbasecategoryfordropdown().subscribe(
      (res: any) => {
        this.baseCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get all of the status enum
  getasseststatusenum() {
    this.assetsService.getasseststatusenum().subscribe(
      (res: any) => {
        this.statusList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get all of the condition enum
  getallconditionenum() {
    this.assetsService.getallconditionenum().subscribe(
      (res: any) => {
        this.conditionList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get the category using base category id
  baseCategorySelection(baseCategoryId) {
    let post = {
      id: baseCategoryId,
    };
    this.assetsService.getallbasecategorymulltipel(post).subscribe(
      (res: any) => {
        this.categoryList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for search in the assets report
  searchAssetsReports() {
    this.paginator.firstPage();
    this.getassestreport();
  }
  //#endregion

  //#region function to reset the filters
  resetFilters() {
    this.warehouseId = [];
    this.baseCategoryId = [];
    this.categoryId = [];
    this.statusId = [];
    this.conditionId = [];
    this.startDate = null;
    this.endDate = null;
  }
  //#endregion

  //#region function for export the assets report
  excelExport() {
    let customExportArray = [
      { name: "Asset Code", bindableValue: "assetsItemCode", isDate: false },
      { name: "Asset Name", bindableValue: "assetsItemCode", isDate: false },
      { name: "Description", bindableValue: "assetsDescription", isDate: false },
      { name: "Location", bindableValue: "assetsLocation", isDate: false },
      { name: "Base Category", bindableValue: "assetsBaseCategoryName", isDate: false },
      { name: "Category", bindableValue: "assetsCategoryName", isDate: false },
      { name: "Type", bindableValue: "assetsTypeName", isDate: false },
      { name: "Purchased On", bindableValue: "purchaseDate", isDate: true },
      { name: "Condition", bindableValue: "assetsCondition", isDate: false },
      { name: "Status", bindableValue: "assetsStatus", isDate: false },
      { name: "Employee Name", bindableValue: "employeeName", isDate: false },
      { name: "Warehouse", bindableValue: "warehouseName", isDate: false },
      { name: "Asset Assigned Date", bindableValue: "assignDate", isDate: true },
    ];
    let post = {
      checkBoxArray: customExportArray,
      visibleTableList: this.assestsReportList,
    }
    this.popupFunctionService.matDialogBoxPopup(ExportExcelComponent, post, '1000px');
  }
  //#endregion
}
