import { PopupFunctionService } from "./../../shared/global-functions/popup-function.service";
import { CRUDFunction } from "./../../shared/global-functions/crudFunctions.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { OrganizationService } from "../Service/organization.service";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.scss"],
})
export class DesignationComponent implements OnInit {
  searchString: string = "";
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  designationInformation: any;
  designationId: any;
  addUpdateDesignationForm: FormGroup;
  submitted: boolean = false;
  departmentList: any[];

  constructor(
    private organizationService: OrganizationService,
    private CRUDFunction: CRUDFunction,
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
    this.designationonadminview();
  }

  //#region function to get all designation list
  designationonadminview() {
    let post = {
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      searchString: this.searchString,
    };
    this.organizationService
      .designationonadminview(post)
      .subscribe((res: any) => {
        this.designationInformation =
          this.CRUDFunction.responceBindingInPagination(res);

        this.config.totalItems = this.designationInformation.totalLength;
      });
  }
  //#endregion

  //#region function to open popup for the add/update designation
  addUpdateDesignationPopUp(addUpdateDesignationComponent, id?) {
    (this.designationId = id) ? this.getdesignationid(id) : null;

    this.getallactivedeparmentlist();
    this.addUpdateDesignationForms();
    this.popupFunctionService.poupOpenFunction(
      addUpdateDesignationComponent,
      "lg",
    );
  }
  //#endregion

  //#region function to create the form for the add/update designation
  addUpdateDesignationForms() {
    this.addUpdateDesignationForm = this.formBuilder.group({
      departmentId: ["", Validators.required],
      designationName: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  get designation() {
    return this.addUpdateDesignationForm.controls;
  }
  //#endregion

  //#region function to create or update the designation
  addUpdateDesignation(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.submitValue(value.value)
      : "";
  }

  submitValue(value) {
    let apiName = "";
    this.designationId
      ? ((apiName = "updatedesignation"),
        (value["designationId"] = this.designationId))
      : (apiName = "createdesignation");
    this.organizationService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Designation")
          ? this.designationonadminview()
          : "";
      },
      (err: any) => {
        this.CRUDFunction.handleHttpError(err);
      },
    );
  }
  //#endregion

  //#region function to patch the value
  patchValueInForm(value) {
    this.addUpdateDesignationForm.patchValue({
      departmentId: value.departmentId,
      designationName: value.designationName,
      description: value.description,
      usedForLogin: value.usedForLogin,
    });
  }
  //#endregion

  //#region function to get the designation data using the designation id
  getdesignationid(id) {
    this.organizationService.getdesignationbyid(id).subscribe((res: any) => {
      // this.CRUDFunction.responceBindingAsObject(res);
      let data = this.CRUDFunction.responceBindingAsObject(res);
      data ? this.patchValueInForm(data) : "";
    });
  }
  //#endregion

  //#region function to detete the designation data using the designation id
  deleteDesignation(designationId) {
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
        this.organizationService
          .deletedesignation(designationId)
          .subscribe((data: any) => {
            if (data.status) {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success",
              ).then(() => {
                this.ngOnInit();
              });
            }
          });
      }
    });
  }
  //#endregion

  //#region
  pageChanged(e: any) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.designationonadminview();
  }
  //#endregion

  //#region function to search using input tag
  searchInput(value) {
    value.length >= 3 ? (this.searchString = value) : (this.searchString = "");
    this.pageChanged(1);
  }
  //#endregion

  //#region function to export the designation list
  exportDesignationList() {
    let table = this.designationInformation.tableData.map((item) => {
      return {
        "Department Name": item.departmentName,
        "Designation Name": item.designationName,
        Description: item.description,
      };
    });
    this.CRUDFunction.exportAsExcelFile(table, "Designation List" + new Date());
  }
  //#endregion

  //#region api to get department list for the designation
  getallactivedeparmentlist() {
    this.organizationService
      .getallactivedeparmentlist()
      .subscribe((res: any) => {
        this.departmentList = this.CRUDFunction.responceBinding(res);
      });
  }
  //#endregion
}
