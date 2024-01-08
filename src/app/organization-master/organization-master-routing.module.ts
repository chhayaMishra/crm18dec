import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DesignationComponent } from "./designation/designation.component";
import { DepartmentComponent } from "./department/department.component";
import { OrganizationComponent } from "./organization/organization.component";

const routes: Routes = [
  {
    path: "department",
    component: DepartmentComponent,
  },
  {
    path: "designation",
    component: DesignationComponent,
  },
  {
    path: "organization",
    component: OrganizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationMasterRoutingModule {}
