import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { TicketService } from "../Service/ticket.service";

@Component({
  selector: "app-ticket-received",
  templateUrl: "./ticket-received.component.html",
  styleUrls: ["./ticket-received.component.scss"],
})
export class TicketReceivedComponent implements OnInit {
  priorityIcons = [
    {
      class: "low-icon",
      iconName: "star_border",
      name: "Low",
      color: "#ff9800",
      priorityType: 1,
    },
    {
      class: "medium-icon",
      iconName: "star_half",
      name: "Medium",
      color: "#2196F3",
      priorityType: 2,
    },
    {
      class: "hign-icon",
      iconName: "star",
      name: "High",
      color: "#ec8686",
      priorityType: 3,
    },
    {
      class: "urgent-icon",
      iconName: "warning",
      name: "Urgent",
      color: "#f44336",
      priorityType: 4,
    },
    {
      class: "roadblock-icon",
      iconName: "whatshot",
      name: "Road Blocker",
      color: "#c2b89d",
      priorityType: 5,
    },
  ];
  openTicketList: any = [];
  closeTicketList: any = [];
  configTicketRecivedOpen: {
    itemsPerPage: number;
    currentPage: number;
    id: string;
    totalItems: string;
  };
  configTicketRecivedClose: {
    itemsPerPage: number;
    currentPage: number;
    id: string;
    totalItems: string;
  };

  constructor(
    private CRUDFunction: CRUDFunction,
    private ticketService: TicketService,
  ) {
    this.configTicketRecivedOpen = {
      itemsPerPage: 5,
      currentPage: 1,
      id: "openTicketList",
      totalItems: "",
    };

    this.configTicketRecivedClose = {
      itemsPerPage: 5,
      currentPage: 1,
      id: "closeTicketList",
      totalItems: "",
    };
  }

  ngOnInit() {
    this.openticket();
    this.closeticket();
    // this.ticketsraised();
  }

  //#region function to get the open ticket list
  openticket() {
    let post = {
      page: this.configTicketRecivedOpen.currentPage,
      count: this.configTicketRecivedOpen.itemsPerPage,
    };
    this.ticketService.openticket(post).subscribe(
      (res: any) => {
        let responce = this.CRUDFunction.responceBindingAsObject(res);
        this.openTicketList = responce.listData;
        this.openTicketList.map((element) => {
          this.priorityIcons.map((icon) => {
            if (element.priorityType === icon.priorityType) {
              element.class = icon.class;
              element.iconName = icon.iconName;
              element.color = icon.color;
            }
          });
          return element;
        });
        this.configTicketRecivedOpen.totalItems = responce.totalLength;
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the open ticket list
  closeticket() {
    let post = {
      page: this.configTicketRecivedClose.currentPage,
      count: this.configTicketRecivedClose.itemsPerPage,
    };
    this.ticketService.closeticket(post).subscribe(
      (res: any) => {
        let responce = this.CRUDFunction.responceBindingAsObject(res);
        this.closeTicketList = responce.listData;
        this.closeTicketList.map((element) => {
          this.priorityIcons.forEach((icon) => {
            if (element.priorityType === icon.priorityType) {
              element.class = icon.class;
              element.iconName = icon.iconName;
              element.color = icon.color;
            }
          });
          return element;
        });
        this.configTicketRecivedClose.totalItems = responce.totalLength;
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to change the page in the table of open tickets
  pageChangedOpenTicketList(e) {
    this.configTicketRecivedOpen.itemsPerPage = e.pageSize;
    this.configTicketRecivedOpen.currentPage = e.pageIndex + 1;
    this.openticket();
    // this.configTicketRecivedOpen.currentPage = event;
  }
  //#endregion

  //#region function to change the page in the table of close tickets
  pageChangedCloseTicketList(e) {
    this.configTicketRecivedClose.itemsPerPage = e.pageSize;
    this.configTicketRecivedClose.currentPage = e.pageIndex + 1;
    this.closeticket();
    // this.configTicketRecivedClose.currentPage = event;
  }
  //#endregion

  //#region function will route to chat section for the more information
  openChatSection(ticketId) {
    let post = {
      ticketId: ticketId,
      creatorPage: false,
    };
    this.CRUDFunction.routingWithData("/help-desk/ticket-chat", post);
  }
  //#endregion
}
