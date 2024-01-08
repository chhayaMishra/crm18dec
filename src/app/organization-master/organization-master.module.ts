import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { DepartmentComponent } from "./department/department.component";
import { DesignationComponent } from "./designation/designation.component";
import { OrganizationMasterRoutingModule } from "./organization-master-routing.module";
import { MatSelectModule } from "@angular/material/select";
import { OrganizationComponent } from "./organization/organization.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    DepartmentComponent,
    DesignationComponent,
    OrganizationComponent,
  ],
  imports: [
    CommonModule,
    OrganizationMasterRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatSelectModule,
    NgSelectModule,
    MatSlideToggleModule,
  ],
})
export class OrganizationMasterModule {}
