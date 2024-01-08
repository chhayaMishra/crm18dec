import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { MainLayoutComponent } from './app-layout/main-layout/main-layout.component';
@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule],
  declarations: [
    // MainLayoutComponent
  ],
})
export class LayoutModule {}
