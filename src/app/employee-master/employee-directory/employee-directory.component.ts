import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../Service/employee.service";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { environment } from "src/environments/environment";
import { OrganizationService } from "src/app/organization-master/Service/organization.service";

@Component({
  selector: "app-employee-directory",
  templateUrl: "./employee-directory.component.html",
  styleUrls: ["./employee-directory.component.scss"],
})
export class EmployeeDirectoryComponent implements OnInit {
  employeeList: any = [];
  API = environment.API_URL;
  organizationList: any = [];
  organization: any = [];
  departmentList: any = [];
  department: any = [];
  designationList: any = [];
  designation: any = [];
  employeeTypeList: any = [];
  employeeType: any = [];

  constructor(
    private employeeService: EmployeeService,
    private CRUDFunction: CRUDFunction,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit(): void {
    this.getallactiveorg();
    this.getallactivedeparmentlist();
    this.getallactivedesignation();
    this.getuserlogintype();
    this.empdirectoryfilteradmin();
  }

  //#region function to get the employee list for the employee directory
  empdirectoryfilteradmin() {
    let post = {
      orgId: this.organization,
      departmentId: this.department,
      designationId: this.designation,
      employeeTypeId: this.employeeType,
    };
    this.employeeService.empdirectoryfilteradmin(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingAsObject(res);
        this.employeeList = data.employeeList;
        this.employeeList.map((employee) => {
          let random = "0123456789ABCDEF";
          let color = "#";
          for (let i = 0; i < 6; i++) {
            color += random[Math.floor(Math.random() * 16)];
          }
          let background = color;
          employee.background = background;
          return employee;
        });
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to route to employee profile
  routerToEmployeeProfile(employeeInformation) {}
  //#endregion

  //#region function to get the list of all active organization
  getallactiveorg() {
    this.organizationService.getallactiveorg("").subscribe(
      (res: any) => {
        this.organizationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the department list
  getallactivedeparmentlist() {
    this.organizationService.getallactivedeparmentlist().subscribe(
      (res: any) => {
        this.departmentList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the desigation list
  getallactivedesignation() {
    this.organizationService.getallactivedesignation().subscribe(
      (res: any) => {
        this.designationList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get all employee type
  getuserlogintype() {
    this.organizationService.getuserlogintype().subscribe(
      (res: any) => {
        this.employeeTypeList = this.CRUDFunction.responceBinding(res);
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to search on the behalf of organization
  organizationSelection(organizationId) {
    this.organization = organizationId;
    this.empdirectoryfilteradmin();
  }
  //#endregion

  //#region function to search on the behalf of department
  departmentSelection(departmentId) {
    this.department = departmentId;
    this.empdirectoryfilteradmin();
  }
  //#endregion

  //#region function to search on the behalf of designation
  designationSelection(designationId) {
    this.designation = designationId;
    this.empdirectoryfilteradmin();
  }
  //#endregion

  //#region function to search on the behalf of employeeType
  employeeTypeSelection(employeeTypeId) {
    this.employeeType = employeeTypeId;
    this.empdirectoryfilteradmin();
  }
  //#endregion

  //#region function to reset the search filter
  resetSearchFilter() {
    this.organization = [];
    this.department = [];
    this.designation = [];
    this.employeeType = [];
    this.empdirectoryfilteradmin();
  }
  //#endregion
}
