import { PopupFunctionService } from "./../../shared/global-functions/popup-function.service";
import { CRUDFunction } from "./../../shared/global-functions/crudFunctions.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { OrganizationService } from "../Service/organization.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  searchString: string = "";
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  departmentInformation: any;
  departmentId: any;
  addUpdateDepartmentForm: FormGroup;
  submitted: boolean = false;

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
    this.getdepartmentonadmin();
  }

  //#region function to get all department list
  getdepartmentonadmin() {
    let post = {
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      searchString: this.searchString,
    };
    this.organizationService
      .getdepartmentonadmin(post)
      .subscribe((res: any) => {
        this.departmentInformation =
          this.CRUDFunction.responceBindingInPagination(res);

        this.config.totalItems = this.departmentInformation.totalLength;
      });
  }
  //#endregion

  //#region function to open popup for the add/update department
  addUpdateDepartmentPopUp(addUpdateDepartmentComponent, id?) {
    (this.departmentId = id) ? this.getdepartmentid(id) : null;
    this.addUpdateDepartmentForms();
    this.popupFunctionService.poupOpenFunction(
      addUpdateDepartmentComponent,
      "lg",
    );
  }
  //#endregion

  //#region function to create the form for the add/update department
  addUpdateDepartmentForms() {
    this.addUpdateDepartmentForm = this.formBuilder.group({
      departmentName: ["", Validators.required],
      description: ["", Validators.required],
      usedForLogin: [false, Validators.required],
    });
  }
  get department() {
    return this.addUpdateDepartmentForm.controls;
  }
  //#endregion

  //#region function to create or update the department
  addUpdateDepartment(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.submitValue(value.value)
      : "";
  }

  submitValue(value) {
    let apiName = "";
    this.departmentId
      ? ((apiName = "updatedepartment"),
        (value["departmentId"] = this.departmentId))
      : (apiName = "createdepartment");
    this.organizationService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Department")
          ? this.getdepartmentonadmin()
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
    this.addUpdateDepartmentForm.patchValue({
      departmentName: value.departmentName,
      description: value.description,
      usedForLogin: value.usedForLogin,
    });
  }
  //#endregion

  //#region function to get the department data using the department id
  getdepartmentid(id) {
    this.organizationService.getdepartmentid(id).subscribe((res: any) => {
      let data = this.CRUDFunction.responceBindingAsObject(res);
      data ? this.patchValueInForm(data) : "";
    });
  }
  //#endregion

  //#region function to detete the department data using the department id
  deleteDepartment(departmentId) {
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
          .deletedepartment(departmentId)
          .subscribe((data: any) => {
            if (data.status) {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success",
              ).then(() => {
                this.getdepartmentonadmin();
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
    this.getdepartmentonadmin();
  }
  //#endregion

  //#region function to search using input tag
  searchInput(value) {
    value.length >= 3 ? (this.searchString = value) : (this.searchString = "");
    this.pageChanged(1);
  }
  //#endregion

  //#region function to export the department list
  exportDepartmentList() {
    let table = this.departmentInformation.tableData.map((item) => {
      return {
        "Department Name": item.departmentName,
        Description: item.description,
      };
    });
    this.CRUDFunction.exportAsExcelFile(table, "Department List" + new Date());
  }
  //#endregion
}
