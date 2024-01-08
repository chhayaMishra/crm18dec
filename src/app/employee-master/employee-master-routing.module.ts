import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeOnbordingComponent } from "./employee-onbording/employee-onbording.component";
import { AllEmployeeComponent } from "./all-employee/all-employee.component";
import { AddUpdateEmployeeComponent } from "./add-update-employee/add-update-employee.component";
import { EmployeeDirectoryComponent } from "./employee-directory/employee-directory.component";

const routes: Routes = [
  {
    path: "employee-onboarding",
    component: EmployeeOnbordingComponent,
  },
  {
    path: "all-employee",
    component: AllEmployeeComponent,
  },
  {
    path: "add-update-employee",
    component: AddUpdateEmployeeComponent,
  },
  {
    path: "employee-directory",
    component: EmployeeDirectoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeMasterRoutingModule {}
