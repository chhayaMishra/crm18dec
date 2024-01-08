import { Component, OnInit } from '@angular/core';
import { PopupFunctionService } from '../../shared/global-functions/popup-function.service';
import { CRUDFunction } from '../../shared/global-functions/crudFunctions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../Service/attendance.service';
import { FormateDateService } from '../../shared/global-functions/formate-date.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-holiday',
  templateUrl: './add-update-holiday.component.html',
  styleUrls: ['./add-update-holiday.component.scss']
})
export class AddUpdateHolidayComponent implements OnInit {
  holidayId: any;
  addUpdateHolidayForm: FormGroup;
  search: any;
  filter: any;
  descOrder: any;
  holidayList: any = [];
  config: { itemsPerPage: number; currentPage: number; totalItems: string; };
  submitted: boolean = false;

  constructor(
    private popupFunctionService: PopupFunctionService,
    private CRUDFunction: CRUDFunction,
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
    private formateDateService: FormateDateService
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.getallholidayfilter();
  }

  //#region function for open the popup for the add update
  addUpdateHolidayPopup(addUpdateHolidayContent, holidayId?) {
    (this.holidayId = holidayId) ? this.getholidaybyid(holidayId) : '';
    this.addUpdateHolidayForms();
    this.popupFunctionService.poupOpenFunction(addUpdateHolidayContent, 'lg');
  }
  //#endregion

  //#region function for create the form for add update holiday
  addUpdateHolidayForms() {
    this.addUpdateHolidayForm = this.formBuilder.group({
      holidayName: ['', Validators.required],
      description: ['', Validators.required],
      holidayDate: ['', Validators.required],
      isFloaterOptional: ['', Validators.required],
      textColor: ['', Validators.required],
    });
  }
  get holiday() {
    return this.addUpdateHolidayForm.controls;
  }
  //#endregion

  //#region function for submit the value for the add update holiday
  addUpdateHoliday(addUpdateHolidayForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(addUpdateHolidayForm) ? this.submitValue(addUpdateHolidayForm.value) : '';
  }

  submitValue(value) {
    let apiName = ''
    value['holidayDate'] = value['holidayDate'] ? this.formateDateService.formatDate(value['holidayDate']) : value['holidayDate'];
    this.holidayId ? (apiName = 'updateholiday', value['holidayId'] = this.holidayId) : apiName = 'createholiday';
    this.attendanceService[apiName](value).subscribe((res: any) => {
      this.CRUDFunction.apiResponce(res, '') ? this.getallholidayfilter() : '';
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region function for get the holiday list to show the user
  getallholidayfilter() {
    let post = {
      search: this.search,
      filter: this.filter,
      descOrder: this.descOrder,
    }
    this.attendanceService.getallholidayfilter(post).subscribe((res: any) => {
      this.holidayList = this.CRUDFunction.responceBindingAsObject(res);


    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
  }
  //#endregion

  //#region function for get the holiday nformation using holiday id
  getholidaybyid(holidayId) {
    this.attendanceService.getholidaybyid(holidayId).subscribe((res: any) => {
      let holiday = this.CRUDFunction.responceBindingAsObject(res);

      this.patchvalue(holiday);
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region function for patch the holiday data in the form
  patchvalue(holiday) {
    this.addUpdateHolidayForm.patchValue({
      holidayName: holiday.holidayName,
      description: holiday.description,
      holidayDate: holiday.holidayDate,
      isFloaterOptional: holiday.isFloaterOptional,
      textColor: holiday.textColor,
    });
  }
  //#endregion

  //#region funtion to delete the holiday
  deleteHoliday(holidayId) {
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
        this.attendanceService.deleteholiday(holidayId).subscribe((data: any) => {
          if (data.status) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success",
            ).then(() => {
              this.getallholidayfilter();
            });
          }
        });
      }
    });
  }
  //#endregion

  //#region Function for reset the form on button click
  resetForm() {
    this.addUpdateHolidayForm.reset();
  }
  //#endregion
}
