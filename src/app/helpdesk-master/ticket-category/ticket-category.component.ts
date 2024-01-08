import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { TicketService } from "../Service/ticket.service";

@Component({
  selector: "app-ticket-category",
  templateUrl: "./ticket-category.component.html",
  styleUrls: ["./ticket-category.component.scss"],
})
export class TicketCategoryComponent implements OnInit {
  ticketCategoryList: any = [];
  categoryType = true;
  constructor(
    private CRUDFunction: CRUDFunction,
    private ticketService: TicketService,
  ) { }

  ngOnInit(): void {
    this.getallticketcategory(this.categoryType);
  }

  //#region function to get the category list1
  getallticketcategory(check: boolean) {
    this.ticketService.getallticketcategory(check).subscribe(
      (res: any) => {
        this.ticketCategoryList = this.CRUDFunction.responceBinding(res);


      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to route to the page for add or update the ticket category
  addUpdateTicketCategory(categoryId?) {
    this.CRUDFunction.routingWithData(
      "/help-desk/add-update-ticket",
      categoryId,
    );
  }
  //#endregion
}
