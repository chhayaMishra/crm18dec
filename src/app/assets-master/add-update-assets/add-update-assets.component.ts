import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormateDateService } from "../../shared/global-functions/formate-date.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-update-assets",
  templateUrl: "./add-update-assets.component.html",
  styleUrls: ["./add-update-assets.component.scss"],
})
export class AddUpdateAssetsComponent implements OnInit {
  addUpdateAssetsForm: FormGroup;
  assetsId: any;
  warehouseList: any[];
  assetsTypeList: any[];
  baseCategoryList: any[];
  categoryList: any[];
  employeeList: any[];
  submitted: boolean = false;
  isPhysicalAsset: boolean;
  assetsConditionList: any[];
  filesArray: any = [];
  api = environment.API_URL;
  assignable: boolean = true;

  constructor(
    private CRUDFunction: CRUDFunction,
    private assetsService: AssetsService,
    private formBuilder: FormBuilder,
    private formateDateService: FormateDateService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.addUpdateAssetsForms();
    this.dataFromURL();
    this.getallwarehousefordropdown();
    this.getasseststatusenum();
    this.getallemployeelist();
    this.getallconditionenum();
  }

  //#region functuion for create the form for add or update assets
  addUpdateAssetsForms() {
    this.addUpdateAssetsForm = this.formBuilder.group({
      wareHouseId: [""],
      assetsType: ["", Validators.required],
      assetsBaseCategoryId: ["", Validators.required],
      assetsCategoryId: ["", Validators.required],
      itemName: ["", Validators.required],
      itemCode: ["", Validators.required],
      serialNo: ["", Validators.required],
      licenseKey: [""],
      licenseStartDate: [""],
      licenseExpiryDate: [""],
      invoiceNo: ["", Validators.required],
      price: [""],
      purchaseDate: ["", Validators.required],
      warrantyExpDate: [""],
      location: ["", Validators.required],
      assetCondition: ["", Validators.required],
      assetsDescription: ["", Validators.required],
      assignToId: [""],
    });
  }
  get assets() {
    return this.addUpdateAssetsForm.controls;
  }
  //#endregion

  //#region functuion for get the data from the url
  dataFromURL() {
    (this.assetsId = this.CRUDFunction.dataDecoding())
      ? this.getassetsbyitemid(this.assetsId)
      : "";
  }
  //#endregion

  //#region functuion for get the list of warehouse
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

  //#region functuion for get the all assets type
  getasseststatusenum() {
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

  //#region functuion for get the base category
  assetsTypeSelection(assetsTypeId) {
    let formarray = ["licenseKey", "licenseStartDate", "licenseExpiryDate"];
    if (assetsTypeId == 1) {
      this.isPhysicalAsset = true;

      this.addUpdateAssetsForm.controls.warrantyExpDate.setValidators([
        Validators.required,
      ]);
      this.addUpdateAssetsForm.controls.warrantyExpDate.updateValueAndValidity();

      formarray.forEach((form) => {
        this.addUpdateAssetsForm.controls[form].setValidators([]);
        this.addUpdateAssetsForm.controls[form].updateValueAndValidity();
      });
    } else {
      this.isPhysicalAsset = false;

      this.addUpdateAssetsForm.controls.warrantyExpDate.setValidators([]);
      this.addUpdateAssetsForm.controls.warrantyExpDate.updateValueAndValidity();

      formarray.forEach((form) => {
        this.addUpdateAssetsForm.controls[form].setValidators([
          Validators.required,
        ]);
        this.addUpdateAssetsForm.controls[form].updateValueAndValidity();
      });
    }
    let post = {
      type: assetsTypeId,
    };
    this.assetsService.getbasecategorybyassetstypeid(post).subscribe(
      (res: any) => {
        this.baseCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region functuion for get the category
  baseCategorySelection(baseCategoryId) {
    this.assetsService.getallcategorybybasecategoryid(baseCategoryId).subscribe(
      (res: any) => {
        this.categoryList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get the list of employee
  getallemployeelist() {
    this.assetsService.getallemployeelist().subscribe(
      (res: any) => {
        this.employeeList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for get the list of condition
  getallconditionenum() {
    this.assetsService.getallconditionenum().subscribe(
      (res: any) => {
        this.assetsConditionList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region functuion for get the information about the asset using asset id
  getassetsbyitemid(assetId) {
    this.assetsService.getassetsbyitemid(assetId).subscribe(
      (res: any) => {
        let assetInformation = this.CRUDFunction.responceBindingAsObject(res);
        assetInformation ? this.patchValue(assetInformation) : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region functuion for patch the value in the asset form
  patchValue(assetInformation) {
    this.assetsTypeSelection(assetInformation.assetsType);
    this.baseCategorySelection(assetInformation.assetsBaseCategoryId);
    this.conditionSelection(assetInformation.assetCondition);
    for (let i = 9; i != 0; i--) {
      this.filesArray.push(assetInformation[`upImg${i + 1}`]);
    }

    this.addUpdateAssetsForm.patchValue({
      wareHouseId: assetInformation.wareHouseId,
      assetsType: assetInformation.assetsType,
      assetsBaseCategoryId: assetInformation.assetsBaseCategoryId,
      assetsCategoryId: assetInformation.assetsCategoryId,
      itemName: assetInformation.itemName,
      itemCode: assetInformation.itemCode,
      serialNo: assetInformation.serialNo,
      licenseKey: assetInformation.licenseKey,
      licenseStartDate: assetInformation.licenseStartDate,
      licenseExpiryDate: assetInformation.licenseExpiryDate,
      invoiceNo: assetInformation.invoiceNo,
      price: assetInformation.price,
      purchaseDate: assetInformation.purchaseDate,
      warrantyExpDate: assetInformation.warrantyExpDate,
      location: assetInformation.location,
      assetCondition: assetInformation.assetCondition,
      assetsDescription: assetInformation.assetsDescription,
      assignToId:
        assetInformation.assetCondition == 3 ||
          assetInformation.assetCondition == 4
          ? ""
          : assetInformation.assignToId,
    });
  }
  //#endregion

  //#region function to upload the files
  uploadFiles(files: FileList) {
    files.length <= 10 ? !this.CRUDFunction.checkFileSizeAndType(files, "image") ? this.upload(files) : "" : this.toastrService.error("Maximum 10 file can be uploaded");
  }

  upload(files) {
    for (let index = 0; index < files.length; index++) {
      const formData: FormData = new FormData();
      formData.append("file", files[index]);

      this.assetsService.uploadmulltiassetsimg(formData).subscribe(
        (res: any) => {
          if (res.status) {
            let responce = res.data.path;
            this.filesArray.length < 10 ? this.filesArray.push(responce) : this.toastrService.error("Only 10 file can be uploaded");
          } else {
            this.toastrService.error(res.message);
          }
        },
        (error: any) => {
          this.CRUDFunction.handleHttpError(error);
        },
      );
    }
  }
  //#endregion

  //#region function to delete the image from the array of uploaded images in
  deleteImage(index) {
    this.filesArray.splice(index, 1);
  }
  //#endregion

  //#region function will trigger on the selection of assets condition
  conditionSelection(conditionId) {
    conditionId == 3 || conditionId == 4
      ? ((this.assignable = false),
        this.addUpdateAssetsForm.get("assignToId").setValue(""))
      : (this.assignable = true);
  }
  //#endregion

  //#region functuion for add or update the assets form
  submitAssetValue(addUpdateAssetsForm) {
    this.CRUDFunction.checkValidation(addUpdateAssetsForm) ? this.submitValue(addUpdateAssetsForm.value) : "";
  }
  submitValue(value) {
    let images = this.filesArray.reduce((obj, img, index) => {
      return { ...obj, [`upImg${index + 1}`]: img };
    }, {});
    value["licenseStartDate"] = value["licenseStartDate"]
      ? this.formateDateService.formatDate(value["licenseStartDate"])
      : value["licenseStartDate"];
    value["licenseExpiryDate"] = value["licenseExpiryDate"]
      ? this.formateDateService.formatDate(value["licenseExpiryDate"])
      : value["licenseExpiryDate"];
    value["purchaseDate"] = value["purchaseDate"]
      ? this.formateDateService.formatDate(value["purchaseDate"])
      : value["purchaseDate"];
    value["warrantyExpDate"] = value["warrantyExpDate"]
      ? this.formateDateService.formatDate(value["warrantyExpDate"])
      : value["warrantyExpDate"];
    value = { ...value, ...images };
    let apiName = "";
    !this.assetsId
      ? (apiName = "additemmaster")
      : ((apiName = "edititemmaster"), (value["itemId"] = this.assetsId));
    this.assetsService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "")
          ? this.CRUDFunction.routingWithOutData("assets-master/company-assets")
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion
}
