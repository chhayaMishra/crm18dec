import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CRUDFunction } from 'src/app/shared/global-functions/crudFunctions.service';
import { AttendanceService } from '../Service/attendance.service';

@Component({
  selector: 'app-add-holiday-in-holiday-group',
  templateUrl: './add-holiday-in-holiday-group.component.html',
  styleUrls: ['./add-holiday-in-holiday-group.component.scss']
})
export class AddHolidayInHolidayGroupComponent implements OnInit {
  holidayList: any = [];
  @Input() groupId: any;
  searchString: string = '';
  config: { itemsPerPage: number; currentPage: number; totalItems: string; };
  checkBoxSelection: any;
  selectAllCheck: boolean;
  constructor(
    private CRUDFunction: CRUDFunction,
    private attendanceService: AttendanceService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this.groupId = changes.groupId.currentValue) != 0 ? this.getassignholidayingroup() : '';
  }
  ngOnInit(): void {
    this.groupId != 0 ? this.getassignholidayingroup() : '';
  }

  //#region function for get all holidays for the table
  getassignholidayingroup() {
    this.attendanceService.getassignholidayingroup(this.groupId).subscribe((res: any) => {
      this.holidayList = this.CRUDFunction.responceBindingAsObject(res);
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    })
  }
  //#endregion

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? this.searchString = value : this.searchString = '';
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
  }
  //#endregion

  //#region select single check box function
  selectSingle(check: boolean, holidayId) {
    this.holidayList.map((holiday) => {
      if (holiday.holidayId == holidayId) {
        holiday.isChecked = check;
      }
    });
  }
  //#endregion

  //#region function for add or update the holidays in holiday group
  addHolidayInHolidayGroup() {
    let post = {
      groupId: this.groupId,
      holidayList: this.holidayList,
    }
    this.attendanceService.assignholidayinholidaygroup(post).subscribe((res: any) => {
      this.CRUDFunction.apiResponce(res, '');
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    })
  }
  //#endregion
}
