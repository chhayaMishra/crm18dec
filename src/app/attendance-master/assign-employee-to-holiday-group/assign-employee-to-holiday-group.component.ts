import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CRUDFunction } from 'src/app/shared/global-functions/crudFunctions.service';
import { PopupFunctionService } from 'src/app/shared/global-functions/popup-function.service';
import { AttendanceService } from '../Service/attendance.service';

@Component({
  selector: 'app-assign-employee-to-holiday-group',
  templateUrl: './assign-employee-to-holiday-group.component.html',
  styleUrls: ['./assign-employee-to-holiday-group.component.scss']
})
export class AssignEmployeeToHolidayGroupComponent implements OnInit {
  searchString: string = '';
  organizationsList: any[];

  constructor(
    private popupFunctionService: PopupFunctionService,
    private CRUDFunction: CRUDFunction,
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
  ) { }

  ngOnInit(): void {
    this.getorglist();
  }

  //#region function for get the organizations list
  getorglist() {
    this.attendanceService.getorglist().subscribe((data: any) => {
      this.organizationsList = this.CRUDFunction.responceBinding(data);
      console.log(this.organizationsList);

    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region function for
  //#endregion

  //#region function for
  //#endregion

  //#region function for
  //#endregion

  //#region function for
  //#endregion

  //#region function for
  //#endregion

  //#region function for
  //#endregion

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? this.searchString = value : this.searchString = '';
  }
  //#endregion
}
