import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { AllEmployeeComponent } from "./all-employee/all-employee.component";
import { EmployeeMasterRoutingModule } from "./employee-master-routing.module";
import { EmployeeOnbordingComponent } from "./employee-onbording/employee-onbording.component";
import { AddUpdateEmployeeComponent } from "./add-update-employee/add-update-employee.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EmployeeDirectoryComponent } from "./employee-directory/employee-directory.component";
import { MatTooltipModule } from "@angular/material/tooltip";
@NgModule({
  declarations: [
    EmployeeOnbordingComponent,
    AllEmployeeComponent,
    AddUpdateEmployeeComponent,
    EmployeeDirectoryComponent,
  ],
  imports: [
    CommonModule,
    EmployeeMasterRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    SharedModule,
    MatSelectModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDatepickerModule,
    NgSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
})
export class EmployeeMasterModule {}
