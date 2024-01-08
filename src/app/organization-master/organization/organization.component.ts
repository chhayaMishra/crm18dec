import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PopupFunctionService } from "./../../shared/global-functions/popup-function.service";
import { CRUDFunction } from "./../../shared/global-functions/crudFunctions.service";
import { OrganizationService } from "../Service/organization.service";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-organization",
  templateUrl: "./organization.component.html",
  styleUrls: ["./organization.component.scss"],
})
export class OrganizationComponent implements OnInit {
  searchString: string = "";
  organizationList: any = [];
  config: { itemsPerPage: number; currentPage: number };
  organizationId: any;
  addUpdateOrganizationForm: FormGroup;
  countryList: any = [];
  timeZoneList: any = [];
  submitted: boolean = false;
  organizationActivity: any;

  constructor(
    private organizationService: OrganizationService,
    private CRUDFunction: CRUDFunction,
    private popupFunctionService: PopupFunctionService,
    private formBuilder: FormBuilder,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.getallactiveorg();
  }

  //#region function to search using input tag
  searchInput(value) {
    value.length >= 3 ? (this.searchString = value) : (this.searchString = "");
    this.pageChanged(1);
  }
  //#endregion

  //#region
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.getallactiveorg();
  }
  //#endregion

  //#region function to get the list of active organizations
  getallactiveorg() {
    this.organizationService.getallactiveorg(this.searchString).subscribe(
      (res: any) => {
        this.organizationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to open popup for add or update organization
  addUpdateOrganizationPopUp(addUpdateOrganizationComponent, organizationId?) {
    this.addUpdateOrganizationForms();
    this.getallcountry();
    this.gettimezonelist();
    (this.organizationId = organizationId)
      ? (this.getorgbyid(organizationId), this.disableRequiredFields())
      : "";
    this.popupFunctionService.poupOpenFunction(
      addUpdateOrganizationComponent,
      "lg",
    );
  }
  //#endregion

  //#region function to create the organization form to add or update
  addUpdateOrganizationForms() {
    this.addUpdateOrganizationForm = this.formBuilder.group({
      orgName: ["", Validators.required],
      orgAddress: ["", Validators.required],
      countryId: ["", Validators.required],
      timeZoneId: ["", Validators.required],
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      userPhoneNumber: ["", Validators.required],
      personalEmail: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      gender: ["", Validators.required],
      officeEmail: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get organization() {
    return this.addUpdateOrganizationForm.controls;
  }
  //#endregion

  //#region function to get the country list
  getallcountry() {
    this.organizationService.getallcountry().subscribe(
      (res: any) => {
        this.countryList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the country timezone for organization
  gettimezonelist() {
    this.organizationService.gettimezonelist().subscribe(
      (res: any) => {
        this.timeZoneList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }

  //#endregion

  //#region funciton to submit the organization information
  submitOrganizationInformation(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.submitValue(value.value)
      : "";
  }

  submitValue(value) {
    let apiName = "";
    this.organizationId
      ? ((apiName = "editorg"), (value["orgId"] = this.organizationId))
      : "addorg";
    this.organizationService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Organization")
          ? this.getallactiveorg()
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region funciton to get the organization information using the organization id and patch the value in form
  getorgbyid(organizationId) {
    this.organizationService.getorgbyid(organizationId).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingAsObject(res);
        data ? this.patchValueInForm(data) : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to patch the value in form
  patchValueInForm(value) {
    this.addUpdateOrganizationForm.patchValue({
      orgName: value.orgName,
      orgAddress: value.orgAddress,
      countryId: value.countryId,
      timeZoneId: value.timeZoneId,
    });
  }
  //#endregion

  //#region function to modify the fields of add hr required to normal
  disableRequiredFields() {
    let formarray = [
      "firstName",
      "middleName",
      "lastName",
      "userPhoneNumber",
      "personalEmail",
      "dateOfBirth",
      "gender",
      "officeEmail",
      "password",
    ];
    formarray.forEach((field) => {
      this.addUpdateOrganizationForm.controls[field].setValidators([]);
      this.addUpdateOrganizationForm.controls[field].updateValueAndValidity();
    });
  }
  //#endregion

  //#region function to delete the organization
  deleteOrgannization(orgId) {
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
        this.organizationService.deleteorg(orgId).subscribe((data: any) => {
          if (data.status) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success",
            ).then(() => {
              this.getallactiveorg();
            });
          }
        });
      }
    });
  }
  //#endregion

  //#region function tp activate or deactivate organization
  organizationActivityChange(organizationId) {
    this.organizationService.lockorg(organizationId).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Organization")
          ? this.getallactiveorg()
          : "";
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to export organization list
  exportOrganizationList() {
    let table = this.organizationList.map((item) => {
      return {
        "Organization Name": item.orgName,
        "Organizatin Address": item.orgAddress,
      };
    });
    this.CRUDFunction.exportAsExcelFile(
      table,
      "Organization List" + new Date(),
    );
  }
  //#endregion
}
