import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDFunction } from 'src/app/shared/global-functions/crudFunctions.service';
import { PopupFunctionService } from 'src/app/shared/global-functions/popup-function.service';
import Swal from 'sweetalert2';
import { AttendanceService } from '../Service/attendance.service';

@Component({
  selector: 'app-add-update-holiday-group',
  templateUrl: './add-update-holiday-group.component.html',
  styleUrls: ['./add-update-holiday-group.component.scss']
})
export class AddUpdateHolidayGroupComponent implements OnInit {
  addUpdateHolidayGroupForm: FormGroup;
  submitted: boolean;
  groupId: any;
  holidayGroupList: any;
  selectedHolidayGroupId: any = 0;
  config: { itemsPerPage: number; currentPage: number; totalItems: string; };
  holidayGroupInfo: any;
  tabs: any = [
    { name: 'Assign Holiday', id: '2' },
    { name: 'Assign Employee', id: '1' },
  ]

  constructor(
    private popupFunctionService: PopupFunctionService,
    private CRUDFunction: CRUDFunction,
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.getallholidaygroup();
  }

  //#region function for open the popup for add or update holiday group
  addUpdateHolidayGroupPopup(addUpdateHolidayGroupContent, groupId?) {
    this.addUpdateHolidayGroupForms();
    (this.groupId = groupId) ? this.getholidaygroupbyid(groupId, true) : '';
    this.popupFunctionService.poupOpenFunction(addUpdateHolidayGroupContent, 'lg');
  }
  //#endregion

  //#region function for create the form for add or update holiday group
  addUpdateHolidayGroupForms() {
    this.addUpdateHolidayGroupForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get holidayGroup() {
    return this.addUpdateHolidayGroupForm.controls;
  }
  //#endregion

  //#region function for add or update holiday group
  addUpdateHolidayGroup(addUpdateHolidayGroupForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(addUpdateHolidayGroupForm) ? this.submitValue(addUpdateHolidayGroupForm.value) : '';
  }

  submitValue(value) {
    let apiName = ''
    this.groupId ? (apiName = 'updateholidaygroup', value['groupId'] = this.groupId) : apiName = 'createholidaygroup';
    this.attendanceService[apiName](value).subscribe((res: any) => {
      this.CRUDFunction.apiResponce(res, '') ? this.ngOnInit() : '';
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region function for get the list of holiday groups
  getallholidaygroup() {
    this.attendanceService.getallholidaygroup().subscribe((res: any) => {
      this.holidayGroupList = this.CRUDFunction.responceBindingAsObject(res);
      this.selectedHolidayGroupId = this.holidayGroupList[0].groupId;
      this.holidayGroupSelection(this.selectedHolidayGroupId);
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    })
  }
  //#endregion

  //#region function to change the css of selected pay group
  holidayGroupSelection(groupId) {
    this.selectedHolidayGroupId = groupId;
    this.holidayGroupList.map((holidayGroup) => {
      if (holidayGroup.groupId == groupId) {
        holidayGroup.className = "holidayGroupSelected";
      } else {
        holidayGroup.className = "";
      }
    })
    this.getholidaygroupbyid(groupId, false);
  }
  //#endregion

  //#region function for get the data of the selected holiday group
  getholidaygroupbyid(groupId, check: boolean) {
    this.attendanceService.getholidaygroupbyid(groupId).subscribe((res: any) => {
      this.holidayGroupInfo = this.CRUDFunction.responceBindingAsObject(res);
      check ? this.patchValue(this.holidayGroupInfo) : '';
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    })
  }
  //#endregion

  //#region function for patch the value in the form of holiday group
  patchValue(value) {
    this.addUpdateHolidayGroupForm.patchValue({
      title: value.title,
      description: value.description,
    });
  }
  //#endregion

  //#region function for delete the holiday group
  deleteHolidayGroup(groupId) {
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
        this.attendanceService.deleteholidaygroup(groupId).subscribe((data: any) => {
          if (data.status) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success",
            ).then(() => {
              this.getallholidaygroup();
            });
          }
        });
      }
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

  //#region function for
  //#endregion

  //#region function for reset the form on button click
  resetForm() {
    this.addUpdateHolidayGroupForm.reset();
  }
  //#endregion
}
