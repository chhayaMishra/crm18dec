import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddUpdateAssetsComponent } from "./add-update-assets/add-update-assets.component";
import { AssetsDashboardComponent } from "./assets-dashboard/assets-dashboard.component";
import { AssetsReportComponent } from "./assets-report/assets-report.component";
import { AssetsWarehouseAndCategoryComponent } from "./assets-warehouse-and-category/assets-warehouse-and-category.component";
import { CompanyAssetsComponent } from "./company-assets/company-assets.component";
import { DeleteAndArchiveAssetsComponent } from "./delete-and-archive-assets/delete-and-archive-assets.component";
import { ExpireAssetsComponent } from "./expire-assets/expire-assets.component";
import { ExpireDashboardComponent } from "./expire-dashboard/expire-dashboard.component";
import { RecoverAssetsHistoryComponent } from "./recover-assets-history/recover-assets-history.component";

const routes: Routes = [
  {
    path: "assets-dashboard",
    component: AssetsDashboardComponent,
  },
  {
    path: "expire-dashboard",
    component: ExpireDashboardComponent,
  },
  {
    path: "company-assets",
    component: CompanyAssetsComponent,
  },
  {
    path: "assets-report",
    component: AssetsReportComponent,
  },
  {
    path: "assets-warehouse-categories",
    component: AssetsWarehouseAndCategoryComponent,
  },
  {
    path: "assets-delete-archive",
    component: DeleteAndArchiveAssetsComponent,
  },
  {
    path: "add-update-assets",
    component: AddUpdateAssetsComponent,
  },
  {
    path: "expire-assets",
    component: ExpireAssetsComponent,
  },
  {
    path: "recover-assets-history",
    component: RecoverAssetsHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsMasterRoutingModule { }
