import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonComponent } from "src/app/button/button.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ExportExcelComponent } from "./export-excel/export-excel.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { TableComponent } from "./table/table.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ImportExcelComponent } from './import-excel/import-excel.component';

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    ButtonComponent,
    TableComponent,
    ExportExcelComponent,
    ImportExcelComponent,
  ],

  imports: [CommonModule, MatCheckboxModule],

  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    ButtonComponent,
    TableComponent,
    ExportExcelComponent,
    ImportExcelComponent
  ],
})
export class ComponentsModule {}
