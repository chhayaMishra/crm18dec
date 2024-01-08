import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";
import { EmployeeService } from "../Service/employee.service";

@Component({
  selector: "app-employee-onbording",
  templateUrl: "./employee-onbording.component.html",
  styleUrls: ["./employee-onbording.component.scss"],
})
export class EmployeeOnbordingComponent implements OnInit {
  searchString: string = "";
  statusId: any = [];
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  onbordingInformation: any;
  constructor(
    private CRUDFunction: CRUDFunction,
    private employeeService: EmployeeService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.getnewemployeeonboarding();
  }

  //#region function to get new employee onboarding list
  getnewemployeeonboarding() {
    let post = {
      searchString: this.searchString,
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      status: this.statusId,
    };
    this.employeeService.getnewemployeeonboarding(post).subscribe(
      (res: any) => {
        this.onbordingInformation =
          this.CRUDFunction.responceBindingInPagination(res);
        this.config.totalItems = this.onbordingInformation.totalLength;
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to search employee onbording
  searchInput(searchString) {
    this.searchString = searchString;
  }
  //#endregion

  //#region search onbording employee using status
  statusSelection(statusId) {
    this.statusId = statusId;
  }
  //#endregion

  //#region
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
  }
  //#endregion

  //#region function to route to the page where employee can be onboard
  updateOnbordingEmployee(employeeOnBoardingId) {
    let post = {
      employeeId: employeeOnBoardingId,
      message: "Onboarding",
    };
    this.CRUDFunction.routingWithData(
      "employee-master/add-update-employee",
      post,
    );
  }
  //#endregion
}
