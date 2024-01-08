import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceMasterRoutingModule } from './attendance-master-routing.module';
import { HolidayComponent } from './holiday/holiday.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AddUpdateHolidayComponent } from './add-update-holiday/add-update-holiday.component';
import { AddUpdateHolidayGroupComponent } from './add-update-holiday-group/add-update-holiday-group.component';
import { AssignHolidayGroupComponent } from './assign-holiday-group/assign-holiday-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddHolidayInHolidayGroupComponent } from './add-holiday-in-holiday-group/add-holiday-in-holiday-group.component';
import { AssignEmployeeToHolidayGroupComponent } from './assign-employee-to-holiday-group/assign-employee-to-holiday-group.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HolidayComponent,
    AddUpdateHolidayComponent,
    AddUpdateHolidayGroupComponent,
    AssignHolidayGroupComponent,
    AddHolidayInHolidayGroupComponent,
    AssignEmployeeToHolidayGroupComponent
  ],
  imports: [
    CommonModule,
    AttendanceMasterRoutingModule,
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgSelectModule
  ]
})
export class AttendanceMasterModule { }
