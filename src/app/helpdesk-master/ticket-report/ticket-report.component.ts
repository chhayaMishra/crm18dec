import { Component, OnInit } from "@angular/core";
import { TicketService } from "../Service/ticket.service";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { FormateDateService } from "src/app/shared/global-functions/formate-date.service";

@Component({
  selector: "app-ticket-report",
  templateUrl: "./ticket-report.component.html",
  styleUrls: ["./ticket-report.component.scss"],
})
export class TicketReportComponent implements OnInit {
  startdate: any;
  enddate: any;
  categoryId: any;
  priorityId: any;
  statusId: any;
  searchString: string = '';
  ticketcategorylists: any[];
  config: any;
  ticketReportList: any = [];

  constructor(
    private ticketService: TicketService,
    private CRUDFunction: CRUDFunction,
    private formateDateService: FormateDateService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.ticketcategorylist();
  }

  //#region function to get the list of ticket categories
  ticketcategorylist() {
    this.ticketService.getallcategorys().subscribe(
      (res: any) => {
        this.ticketcategorylists = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to hit the search api for the ticket report
  reportSearch(check: boolean) {
    let post = {
      startdate: this.formateDateService.formatDate(this.startdate),
      enddate: this.formateDateService.formatDate(this.enddate),
      categoryId: this.categoryId,
      priorityId: this.priorityId,
      statusId: this.statusId,
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
      searchString: this.searchString,
    };
    this.ticketService.getticketdata(post).subscribe(
      (res: any) => {
        if (check) {
          let post = this.CRUDFunction.responceBindingInPagination(res);
          this.ticketReportList = post["tableData"];
          this.config.totalItems = post["totalLength"];
        } else {
          let post = this.CRUDFunction.responceBindingInPagination(res);
          this.config.itemsPerPage = 10;
          this.reportSearch(true);
          this.CRUDFunction.exportAsExcelFile(
            post["tableData"],
            "TiecktReport" + new Date(),
          );
        }
      },
      (err: any) => {
        this.CRUDFunction.handleHttpError(err);
      },
    );
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.reportSearch(true);
  }
  //#endregion

  //#region function to search with words in the ticket report
  searchInput(value) {
    value.length >= 3 ? (this.searchString = value) : (this.searchString = "");
    this.pageChanged(1);
  }
  //#endregion

  //#region function to export the excel sheet
  export() {
    this.config.itemsPerPage = this.config.totalItems;

    this.reportSearch(false);
  }
  //#endregion

  //#region function to reset the filter
  resetFilter() {
    this.startdate = "";
    this.enddate = "";
    this.categoryId = undefined;
    this.priorityId = undefined;
    this.statusId = undefined;
    this.searchString = undefined;
  }
  //#endregion
}
