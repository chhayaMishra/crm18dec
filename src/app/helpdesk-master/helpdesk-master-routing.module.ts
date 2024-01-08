import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketDashboardComponent } from "./ticket-dashboard/ticket-dashboard.component";
import { TicketCategoryComponent } from "./ticket-category/ticket-category.component";
import { TicketRaisedComponent } from "./ticket-raised/ticket-raised.component";
import { TicketReceivedComponent } from "./ticket-received/ticket-received.component";
import { AddUpdateTicketComponent } from "./add-update-ticket/add-update-ticket.component";
import { TicketChatComponent } from "./ticket-chat/ticket-chat.component";
import { TicketReportComponent } from "./ticket-report/ticket-report.component";

const routes: Routes = [
  {
    path: "ticket-dashboard",
    component: TicketDashboardComponent,
  },
  {
    path: "ticket-category",
    component: TicketCategoryComponent,
  },
  {
    path: "ticket-raised",
    component: TicketRaisedComponent,
  },
  {
    path: "ticket-received",
    component: TicketReceivedComponent,
  },
  {
    path: "add-update-ticket",
    component: AddUpdateTicketComponent,
  },
  {
    path: "ticket-chat",
    component: TicketChatComponent,
  },
  {
    path: "ticket-report",
    component: TicketReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdeskMasterRoutingModule {}
