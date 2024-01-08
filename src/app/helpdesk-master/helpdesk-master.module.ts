import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { AddUpdateTicketComponent } from "./add-update-ticket/add-update-ticket.component";
import { HelpdeskMasterRoutingModule } from "./helpdesk-master-routing.module";
import { TicketCategoryComponent } from "./ticket-category/ticket-category.component";
import { TicketChatComponent } from "./ticket-chat/ticket-chat.component";
import { TicketDashboardComponent } from "./ticket-dashboard/ticket-dashboard.component";
import { TicketRaisedComponent } from "./ticket-raised/ticket-raised.component";
import { TicketReceivedComponent } from "./ticket-received/ticket-received.component";
import { TicketReportComponent } from "./ticket-report/ticket-report.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AddUpdateTicketComponent,
    TicketChatComponent,
    TicketReportComponent,
    TicketCategoryComponent,
    TicketDashboardComponent,
    TicketRaisedComponent,
    TicketReceivedComponent,
  ],
  imports: [
    CommonModule,
    HelpdeskMasterRoutingModule,
    MatSlideToggleModule,
    SharedModule,
    MatRadioModule,
    MatSelectModule,
    NgSelectModule,
    NgxPaginationModule,
    NgApexchartsModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatExpansionModule
  ],
})
export class HelpdeskMasterModule {}
