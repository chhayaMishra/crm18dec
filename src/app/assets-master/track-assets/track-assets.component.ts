import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { AssetsService } from "../Service/assets.service";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { environment } from "src/environments/environment";
import { PopupFunctionService } from "../../shared/global-functions/popup-function.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-track-assets",
  templateUrl: "./track-assets.component.html",
  styleUrls: ["./track-assets.component.scss"],
})
export class TrackAssetsComponent implements OnInit {
  @Input() item: any = "";
  searchString: string = '';
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  assignAssetsList: any;
  api = environment.API_URL;
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
  recoverAssetsForm: FormGroup;
  employeeName: any;
  conditionList: any[];
  filesArray: any = [];
  submitted: boolean = false;
  itemId: any;

  constructor(
    private assetsService: AssetsService,
    private CRUDFunction: CRUDFunction,
    private popupFunctionService: PopupFunctionService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchString = changes.item.currentValue;
  }

  ngOnInit(): void {
    this.getallassigneassest();
    this.recoverAssetsForms();
    this.getallconditionenum();
  }

  //#region function for get the assigned assets
  getallassigneassest() {
    let post = {
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      searchString: this.searchString,
    };
    this.assetsService.getallassigneassest(post).subscribe(
      (res: any) => {
        let post = this.CRUDFunction.responceBindingInPagination(res);
        this.assignAssetsList = post["tableData"];
        this.config.totalItems = post["totalLength"];
        this.assignAssetsList.map((assets) => {
          this.assetsIcon.filter((icon) => {
            assets.physicalsAssets.filter((physical) => {
              if (icon.iconId == physical.iconId) {
                let assetsIconName = icon.name;
                physical.assetsIconName = assetsIconName;
              }
            });
            assets.digitalAssets.filter((digital) => {
              if (icon.iconId == digital.iconId) {
                let assetsIconName = icon.name;
                digital.assetsIconName = assetsIconName;
              }
            });
          });

          return assets;
        });
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function for change the page in assigned assets table
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.getallassigneassest();
  }
  //#endregion

  //#region function to open popup for recover assets
  openPopUpForRecoverAssets(recoverAssetsContent, assetsInformation) {
    this.popupFunctionService.poupOpenFunction(recoverAssetsContent, "lg");

    this.employeeName = assetsInformation.employeeName;
    this.itemId = assetsInformation.itemId;
    this.recoverAssetsForm.patchValue({
      assignedToName: assetsInformation.employeeName,
      conditionName: assetsInformation.condition,
    });
  }
  //#endregion

  //#region function to create the form to recover asset
  recoverAssetsForms() {
    this.recoverAssetsForm = this.formBuilder.group({
      assignedToName: [""],
      conditionName: [""],
      conditionId: ["", Validators.required],
    });
  }
  get recovery() {
    return this.recoverAssetsForm.controls;
  }
  //#endregion

  //#region function for get  the condition enum
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

  //#region function to upload the files
  uploadFiles(files: FileList) {
    files.length <= 5
      ? !this.CRUDFunction.checkFileSizeAndType(files, "image")
        ? this.upload(files)
        : ""
      : this.toastrService.error("Maximum 5 file can be uploaded");
  }

  upload(files) {
    for (let index = 0; index < files.length; index++) {
      const formData: FormData = new FormData();
      formData.append("file", files[index]);

      this.assetsService.recoverassetsimages(formData).subscribe(
        (res: any) => {
          if (res.success) {
            let responce = res.pathArray[0];
            this.filesArray.length < 5
              ? this.filesArray.push(responce)
              : this.toastrService.error("Only 5 file can be uploaded");
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

  //#region function to  recover assets from the employee
  recoverAssetsFromEmployee(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.recoverAssets(value.value)
      : "";
  }
  recoverAssets(value) {
    let post = {
      itemId: this.itemId,
      condition: value.conditionId,
      recoverImage1: this.filesArray[0],
      recoverImage2: this.filesArray[1],
      recoverImage3: this.filesArray[2],
      recoverImage4: this.filesArray[3],
      recoverImage5: this.filesArray[4],
    };
    this.assetsService.recoverdassets(post).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "")
          ? this.getallassigneassest()
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion
}
