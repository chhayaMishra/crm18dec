import { Component, OnInit, ViewChild } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";
import { PopupFunctionService } from "../../shared/global-functions/popup-function.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ExportExcelComponent } from "src/app/shared/components/export-excel/export-excel.component";

@Component({
  selector: "app-assets-warehouse-and-category",
  templateUrl: "./assets-warehouse-and-category.component.html",
  styleUrls: ["./assets-warehouse-and-category.component.scss"],
})
export class AssetsWarehouseAndCategoryComponent implements OnInit {
  pageName: any = [
    { name: "Base Category", id: "1", class: "activeButton" },
    { name: "Category", id: "2", class: "releaseButton" },
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showWarehouse: boolean = false;
  searchStringWarehouse: string = "";
  searchString: string = "";
  warehouseList: any;
  configWarehouseList: {
    itemsPerPage: number;
    currentPage: number;
    totalItems: string;
  };
  warehouseId: any;
  addUpdateWarehouseForm: FormGroup;
  submitted: boolean = false;
  activePageId: any = 1;
  configBaseCategoryList: {
    itemsPerPage: number;
    currentPage: number;
    totalItems: string;
  };
  configCategoryList: {
    itemsPerPage: number;
    currentPage: number;
    totalItems: string;
  };
  baseCategoryList: any[];
  categoryList: any[];
  baseCategoryId: any;
  addUpdateBaseCategoryForm: FormGroup;
  assetsTypeList: any[];
  categoryId: any;
  addUpdateCategoryForm: FormGroup;
  baseCategoryListDropDown: any[];
  assetsIcon: any = [
    { name: "beach_access", iconId: "1" },
    { name: "stay_primary_portrait", iconId: "2" },
    { name: "devices", iconId: "3" },
    { name: "computer", iconId: "4" },
    { name: "desktop_mac", iconId: "5" },
    { name: "desktop_windows", iconId: "6" },
    { name: "developer_board", iconId: "7" },
    { name: "dock", iconId: "8" },
    { name: "headset", iconId: "9" },
    { name: "headset_mic", iconId: "10" },
    { name: "keyboard", iconId: "11" },
    { name: "laptop", iconId: "12" },
    { name: "mouse", iconId: "13" },
    { name: "phone_android", iconId: "14" },
    { name: "phone_iphone", iconId: "15" },
    { name: "sim_card", iconId: "16" },
    { name: "speaker", iconId: "17" },
    { name: "speaker_group", iconId: "18" },
    { name: "tablet_android", iconId: "19" },
    { name: "tablet_mac", iconId: "20" },
    { name: "watch", iconId: "21" },
    { name: "tv", iconId: "22" },
    { name: "videogame_asset", iconId: "23" },
    { name: "tablet_mac", iconId: "24" },
    { name: "camera_alt", iconId: "25" },
    { name: "camera_roll", iconId: "26" },
    { name: "flight", iconId: "27" },
    { name: "local_shipping", iconId: "28" },
    { name: "alarm", iconId: "29" },
    { name: "android", iconId: "30" },
    { name: "assignment_ind", iconId: "31" },
    { name: "important_devices", iconId: "32" },
    { name: "battery_charging_full", iconId: "33" },
    { name: "build", iconId: "34" },
    { name: "work", iconId: "35" },
    { name: "call", iconId: "36" },
    { name: "print", iconId: "37" },
    { name: "settings_bluetooth", iconId: "38" },
    { name: "location_on", iconId: "39" },
    { name: "rss_feed", iconId: "40" },
    { name: "videocam", iconId: "41" },
    { name: "scanner", iconId: "42" },
    { name: "watch", iconId: "43" },
    { name: "timer", iconId: "44" },
    { name: "local_dining", iconId: "45" },
    { name: "domain", iconId: "46" },
  ];
  icon: any = this.assetsIcon[0];
  imageSelection: boolean = false;
  filesArray: any = [];
  api: any = environment.API_URL;

  constructor(
    private CRUDFunction: CRUDFunction,
    private assetsService: AssetsService,
    private popupFunctionService: PopupFunctionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.configWarehouseList = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: "",
    };
    this.configBaseCategoryList = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: "",
    };
    this.configCategoryList = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.activePageSelectoin(this.activePageId);
  }

  //#region function to show or hide warehouse
  showHideWarehouse() {
    (this.showWarehouse = !this.showWarehouse) ? this.getallwarehouse() : (this.warehouseList = []);
  }
  //#endregion

  //#region function for make the active button change
  activePageSelectoin(id) {
    this.searchString = '';
    (this.activePageId = id) == 1 ? this.getallbasecategory() : this.getallcategory();
    this.pageName.map((pageName) => {
      pageName.id == id ? pageName.class = "activeButton" : pageName.class = "releaseButton";
    });
  }
  //#endregion

  //#region function for send the search string to the child components
  searchInputWareHouse(value) {
    value.length > 2 ? this.searchStringWarehouse = value : this.searchStringWarehouse = '';
    this.getallwarehouse();
  }
  //#endregion

  //#region function for send the search string to the child components
  searchInputCategory(value) {
    value.length > 2 ? this.searchString = value : this.searchString = '';
    this.getallbasecategory();
    this.getallcategory();
  }
  //#endregion

  //#region function to get the warehouse list
  getallwarehouse() {
    let post = {
      searchString: this.searchStringWarehouse,
      page: this.configWarehouseList.currentPage,
      count: this.configWarehouseList.itemsPerPage,
    };
    this.assetsService.getallwarehouse(post).subscribe(
      (res: any) => {
        let post = this.CRUDFunction.responceBindingInPagination(res);
        this.warehouseList = post["tableData"];
        this.configWarehouseList.totalItems = post["totalLength"];
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to open the popup for the add the warehouse
  addUpdateWarehousePopUp(addUpdateWarehouseComponent, warehouseId?) {
    this.addUpdateWarehouseForms();
    (this.warehouseId = warehouseId) ? this.getwarehousebyid(warehouseId) : "";
    this.popupFunctionService.poupOpenFunction(addUpdateWarehouseComponent, "lg",);
  }
  //#endregion

  //#region fuicntion to change the page in the warehouse
  pageChangedWareHouse(e) {
    this.configWarehouseList.itemsPerPage = e.pageSize;
    this.configWarehouseList.currentPage = e.pageIndex + 1;
    this.getallwarehouse();
  }
  //#endregion

  //#region fuicntion to change the page in the Base Category
  pageChangedBaseCategory(e) {
    this.configBaseCategoryList.itemsPerPage = e.pageSize;
    this.configBaseCategoryList.currentPage = e.pageIndex + 1;
    this.getallbasecategory();
  }
  //#endregion

  //#region fuicntion to change the page in the Category
  pageChangedCategory(e) {
    this.configCategoryList.itemsPerPage = e.pageSize;
    this.configCategoryList.currentPage = e.pageIndex + 1;
    this.getallcategory();
  }
  //#endregion

  //#region function to create the form to add or update the warehouse
  addUpdateWarehouseForms() {
    this.addUpdateWarehouseForm = this.formBuilder.group({
      warehouseName: ["", Validators.required],
      warehouseDescription: ["", Validators.required],
      warehouseAddress: ["", Validators.required],
    });
  }
  get warehouse() {
    return this.addUpdateWarehouseForm.controls;
  }
  //#endregion

  //#region function to add opr update the warehouse
  addUpdateWarehouse(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value) ? this.submitValue(value.value) : "";
  }
  submitValue(value) {
    let apiName = "";
    !this.warehouseId ? (apiName = "addwarehouse") : ((apiName = "updatewarehouse"),
      (value["warehouseId"] = this.warehouseId));
    this.assetsService[apiName](value).subscribe((res: any) => {
      this.CRUDFunction.apiResponce(res, "") ? (this.getallwarehouse(), this.paginator.firstPage()) : "";
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region function to patch value in the warehouse form
  getwarehousebyid(value) {
    this.assetsService.getwarehousebyid(value).subscribe((res: any) => {
      let data = this.CRUDFunction.responceBindingAsObject(res);
      data ? this.patchValueWarehouse(data) : "";
    },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to patch the value
  patchValueWarehouse(data) {
    this.addUpdateWarehouseForm.patchValue({
      warehouseName: data.warehouseName,
      warehouseDescription: data.warehouseDescription,
      warehouseAddress: data.warehouseAddress,
    });
  }
  //#endregion

  //#region function to delete the warehouse
  deleteWarehouse(warehouseId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#FA543D",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.assetsService
          .deletewarehouse(warehouseId)
          .subscribe((data: any) => {
            if (data.status) {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success",
              ).then(() => {
                this.getallwarehouse();
              });
            }
          });
      }
    });
  }
  //#endregion

  //#region function to open popup for base category
  addUpdateBaseCategoryPopUp(addUpdateBaseCategoryComponent, baseCategoryId?) {
    (this.baseCategoryId = baseCategoryId)
      ? this.getbasecategorybyid(baseCategoryId)
      : "";
    this.getassetstypeenum();
    this.addUpdateBaseCategoryForms();
    this.popupFunctionService.poupOpenFunction(
      addUpdateBaseCategoryComponent,
      "lg",
    );
  }
  //#endregion

  //#region function to open popup for category
  addUpdateCategoryPopUp(addUpdateCategoryComponent, categoryId?) {
    (this.categoryId = categoryId) ? this.getcategorybyid(categoryId) : "";
    this.filesArray = [];
    this.imageSelection = false;
    this.getallbasecategoryfordropdown();
    this.addUpdateCategoryForms();
    this.popupFunctionService.poupOpenFunction(
      addUpdateCategoryComponent,
      "lg",
    );
  }
  //#endregion

  //#region function to get all the base categories
  getallbasecategory() {
    let post = {
      page: this.configBaseCategoryList.currentPage,
      count: this.configBaseCategoryList.itemsPerPage,
      searchString: this.searchString,
    };
    this.assetsService.getallbasecategory(post).subscribe(
      (res: any) => {
        let post = this.CRUDFunction.responceBindingInPagination(res);
        this.baseCategoryList = post["tableData"];
        this.configBaseCategoryList.totalItems = post["totalLength"];
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get all the categories
  getallcategory() {
    let post = {
      page: this.configCategoryList.currentPage,
      count: this.configCategoryList.itemsPerPage,
      searchString: this.searchString,
    };
    this.assetsService.getallcategory(post).subscribe(
      (res: any) => {
        let post = this.CRUDFunction.responceBindingInPagination(res);
        this.categoryList = post["tableData"];
        this.configCategoryList.totalItems = post["totalLength"];
        this.categoryList.map((category) => {
          this.assetsIcon.filter((icon) => {
            if (icon.iconId == category.assetsIconId) {
              let assetsIconName = icon.name;
              category.assetsIconName = assetsIconName;
            }
            return category;
          });
        });
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to create a form for base categoryy
  addUpdateBaseCategoryForms() {
    this.addUpdateBaseCategoryForm = this.formBuilder.group({
      assetsType: ["", Validators.required],
      assetsBCategoryName: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  get baseCategory() {
    return this.addUpdateBaseCategoryForm.controls;
  }
  //#endregion

  //#region function to get assets type
  getassetstypeenum() {
    this.assetsService.getassetstypeenum().subscribe(
      (res: any) => {
        this.assetsTypeList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to add or update base category
  addUpdateBaseCategory(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.submitBaseCategory(value.value)
      : "";
  }
  submitBaseCategory(value) {
    let apiName = "";
    !this.baseCategoryId
      ? (apiName = "addbasecategory")
      : ((apiName = "updatebasecategory"),
        (value["assetsBCategoryId"] = this.baseCategoryId));
    this.assetsService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "")
          ? (this.getallbasecategory(), this.paginator.firstPage())
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to create a form for base categoryy
  addUpdateCategoryForms() {
    this.addUpdateCategoryForm = this.formBuilder.group({
      baseCategoryId: ["", Validators.required],
      categoryName: ["", Validators.required],
      categoryDescription: ["", Validators.required],
      color: ["#080808"],
    });
  }
  get category() {
    return this.addUpdateCategoryForm.controls;
  }
  //#endregion

  //#region function to get the list of base categories for the category add update form
  getallbasecategoryfordropdown() {
    this.assetsService.getallbasecategoryfordropdown().subscribe(
      (res: any) => {
        this.baseCategoryListDropDown = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to submit the category form
  addUpdateCategory(addUpdateCategoryForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(addUpdateCategoryForm)
      ? this.submitCategory(addUpdateCategoryForm.value)
      : "";
  }
  submitCategory(value) {
    let post = {
      assetsBCategoryId: value.baseCategoryId,
      assetsCategoryName: value.categoryName,
      description: value.categoryDescription,
      colorCode: value.color,
      isAssetsIcon: !this.imageSelection,
      assetsIconId: !this.imageSelection ? this.icon.iconId : "",
      assetIconImgUrl: this.imageSelection ? this.filesArray[0] : "",
    };
    let apiName = "";
    !this.categoryId
      ? (apiName = "addcategory")
      : ((apiName = "updatecategory"),
        (post["assetsCategoryId"] = this.categoryId));
    this.assetsService[apiName](post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "")
          ? (this.getallcategory(), this.paginator.firstPage())
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to track the changes of the icons
  iconSelection(icon, value) {
    this.icon = icon;
  }
  //#endregion

  //#region function to upload the files
  uploadFiles(files: FileList) {
    files.length <= 1
      ? !this.CRUDFunction.checkFileSizeAndType(files, "image")
        ? this.upload(files)
        : ""
      : "";
  }

  upload(files) {
    for (let index = 0; index < files.length; index++) {
      const formData: FormData = new FormData();
      formData.append("file", files[index]);

      this.assetsService.uploadeassetsiconimg(formData).subscribe(
        (res: any) => {
          if (res.status) {
            let responce = res.data.path;
            this.filesArray.length < 1
              ? this.filesArray.push(responce)
              : this.toastrService.error("Only One file Can be uploaded");
          } else {
            this.toastrService.error(res.message);
          }
        },
        (error) => {
          this.CRUDFunction.handleHttpError(error);
        },
      );
    }
  }
  //#endregion

  //#region function to get the base category data
  getbasecategorybyid(baseCategoryId) {
    this.assetsService.getbasecategorybyid(baseCategoryId).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingAsObject(res);
        data ? this.patchValueBaseCategory(data) : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to patch the value of the base category
  patchValueBaseCategory(value) {
    this.addUpdateBaseCategoryForm.patchValue({
      assetsType: value.assetsType,
      assetsBCategoryName: value.assetsBCategoryName,
      description: value.description,
    });
  }
  //#endregion

  //#region function to get category information using category id
  getcategorybyid(categoryId) {
    this.assetsService.getcategorybyid(categoryId).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingAsObject(res);
        data ? this.patchValueCategory(data) : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to patch the value in category form
  patchValueCategory(value) {
    this.addUpdateCategoryForm.patchValue({
      baseCategoryId: value.assetsBCategoryId,
      categoryName: value.assetsCategoryName,
      categoryDescription: value.description,
      color: value.colorCode,
    });
    this.icon = this.assetsIcon.find((x) => x.iconId == value.assetsIconId);
    this.imageSelection = !value.isAssetsIcon;
    this.imageSelection ? (this.filesArray[0] = value.assetIconImgUrl) : [];
  }
  //#endregion

  //#region function to export the warehouse
  exportExcel(id) {
    let warehouseExportArray = [
      { name: "Warehouse Name", bindableValue: "warehouseName", isDate: false },
      { name: "Warehouse Address", bindableValue: "warehouseAddress", isDate: false },
      { name: "Total Items", bindableValue: "totalItems", isDate: false },
      { name: "Warehouse Description", bindableValue: "warehouseName", isDate: false },
    ];
    let baseCategoryExportArray = [
      { name: "Asset Type	", bindableValue: "baseCategoryName", isDate: false },
      { name: "Base Category Name", bindableValue: "assetsCategoryName", isDate: false },
      { name: "Description	", bindableValue: "description", isDate: false },
      { name: "Category Count", bindableValue: "count", isDate: false },
    ];
    let categoryExportArray = [
      { name: "Base Category Name", bindableValue: "assetsTypeName", isDate: false },
      { name: "Category Name", bindableValue: "assetsBCategoryName", isDate: false },
      { name: "Category Description", bindableValue: "description", isDate: false },
      { name: "Asstes Count", bindableValue: "categoryCount", isDate: false },
    ];
    let post = {
      checkBoxArray: id == 0 ? warehouseExportArray : id == 1 ? baseCategoryExportArray : categoryExportArray,
      visibleTableList: id == 0 ? this.warehouseList : id == 1 ? this.baseCategoryList : this.categoryList,
    };
    this.popupFunctionService.matDialogBoxPopup(ExportExcelComponent, post, '1000px');
  }
  //#endregion
}
