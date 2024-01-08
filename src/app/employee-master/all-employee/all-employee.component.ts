import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../Service/employee.service";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { OrganizationService } from "../../organization-master/Service/organization.service";

@Component({
  selector: "app-all-employee",
  templateUrl: "./all-employee.component.html",
  styleUrls: ["./all-employee.component.scss"],
})
export class AllEmployeeComponent implements OnInit {
  orgId: any = [];
  departmentId: any = [];
  designationId: any = [];
  employeeTypeId: any = [];
  searchString: string = "";
  employeeInformation: any;
  config: { itemsPerPage: number; currentPage: number };
  organizationList: any[];

  constructor(
    private employeeService: EmployeeService,
    private CRUDFunction: CRUDFunction,
    private organizationService: OrganizationService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.empdirectoryfilter();
    this.getallactiveorg();
  }

  //#region function to get all the employees
  empdirectoryfilter() {
    let post = {
      orgId: this.orgId,
      departmentId: this.departmentId,
      designationId: this.designationId,
      employeeTypeId: this.employeeTypeId,
    };
    this.employeeService.empdirectoryfilter(post).subscribe(
      (res: any) => {
        this.employeeInformation =
          this.CRUDFunction.responceBindingAsObject(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region fuction toi filter data of employee by organization
  organizationSelection(organizationId) {}
  //#endregion

  //#region filter employee data by input
  searchInput(searchString) {}
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
  }
  //#endregion

  //#region function to lock the credential of employee
  employeeActivationChange(employeeId) {
    this.employeeService.lockemployee(employeeId).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Employee");
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region
  getallactiveorg() {
    let seach = "";
    this.organizationService.getallactiveorg(seach).subscribe(
      (res: any) => {
        this.organizationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region fucntion to route to the page where the employee can be add or update
  addUpdateEmployee(employeeId?) {
    let post = {
      employeeId: employeeId,
      message: employeeId ? "Edit" : "Add",
    };
    this.CRUDFunction.routingWithData(
      "employee-master/add-update-employee",
      post,
    );
  }
  //#endregion
}
