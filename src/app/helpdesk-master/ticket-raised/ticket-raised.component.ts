import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { PopupFunctionService } from "src/app/shared/global-functions/popup-function.service";
import { environment } from "src/environments/environment";
import { TicketService } from "../Service/ticket.service";

@Component({
  selector: "app-ticket-raised",
  templateUrl: "./ticket-raised.component.html",
  styleUrls: ["./ticket-raised.component.scss"],
})
export class TicketRaisedComponent implements OnInit {
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
  ticketRaiseForm: FormGroup;
  ticketCategoryList: any = [];
  subCategoryList: any = [];
  priorityList: any[];
  filesArray: any = [];
  baseURL = environment.API_URL;
  submitted: boolean = false;
  configTicketRaisedOpen: {
    itemsPerPage: number;
    currentPage: number;
    id: string;
  };
  configTicketRaisedClose: {
    itemsPerPage: number;
    currentPage: number;
    id: string;
  };
  openTicketList: any = [];
  tableResponce: any;
  closeTicketList: any = [];

  constructor(
    private toastrService: ToastrService,
    private popupFunctionService: PopupFunctionService,
    private CRUDFunction: CRUDFunction,
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
  ) {
    this.configTicketRaisedOpen = {
      itemsPerPage: 5,
      currentPage: 1,
      id: "openTicketList",
    };

    this.configTicketRaisedClose = {
      itemsPerPage: 5,
      currentPage: 1,
      id: "closeTicketList",
    };
  }

  ngOnInit() {
    this.ticketsraised();
  }

  //#region form for raise the ticket
  ticketRaiseForms() {
    this.ticketRaiseForm = this.formBuilder.group({
      categoryId: [, Validators.required],
      subCategoriesId: [],
      priorityType: [, Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      createrLink: [""],
      reviewerLink: [""],
    });
  }

  get ticket() {
    return this.ticketRaiseForm.controls;
  }
  //#endregion

  //#region function to open the popup to raise the ticket
  raiseTicketPopUp(raiseTicketComponent) {
    this.getallcategorys();
    this.filesArray = [];
    this.ticketRaiseForms();
    this.popupFunctionService.poupOpenFunction(raiseTicketComponent, "lg");
  }
  //#endregion

  //#region function to et all ticket category to raise the ticket
  getallcategorys() {
    this.ticketService.getallcategorys().subscribe(
      (res: any) => {
        this.ticketCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function will hit on the selection of the ticket category
  categorySelection(categoryId) {
    this.getallsubcategorybyid(categoryId);
    this.getallprioritiesbyid(categoryId);
  }
  //#endregion

  //#region function will give the list of subcategories in the ticket category
  getallsubcategorybyid(categoryId: any) {
    this.ticketService.getallsubcategorybyid(categoryId).subscribe(
      (res: any) => {
        this.subCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function will give the list of priorities in the ticket category
  getallprioritiesbyid(categoryId: any) {
    this.ticketService.getallprioritiesbyid(categoryId).subscribe(
      (res: any) => {
        this.priorityList = this.CRUDFunction.responceBinding(res);
        // this.subCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to upload the files
  uploadFiles(files: FileList) {
    files.length <= 5
      ? !this.CRUDFunction.checkFileSizeAndType(files, "image")
        ? this.upload(files)
        : ""
      : this.toastrService.error("Maximum 5 file can be uploaded");
  }

  upload(files) {
    for (let index = 0; index < files.length; index++) {
      const formData: FormData = new FormData();
      formData.append("file", files[index]);
      this.ticketService.uploadticketmultiple(formData).subscribe(
        (res: any) => {
          if (res.success) {
            let responce = res.pathArray[0];
            this.filesArray.length < 5
              ? this.filesArray.push(responce)
              : this.toastrService.error("Only 5 file can be uploaded");
          } else {
            this.toastrService.error(res.message);
          }
        },
        (error: any) => {
          this.CRUDFunction.handleHttpError(error);
        },
      );
    }
  }
  //#endregion

  //#region function to delete the image from the array of uploaded images in
  deleteImage(index) {
    this.filesArray.splice(index, 1);
  }
  //#endregion

  //#region function to submit the ticket
  submitTicket(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.submitFunction(value.value)
      : "";
  }
  submitFunction(value) {
    value["createrLink"] = "#/help-desk/ticket-chat?data=";
    value["reviewerLink"] = "#/help-desk/ticket-chat?data=";
    value["imageURLs"] = this.filesArray;
    this.ticketService.createticket(value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Ticket") ? this.ngOnInit() : "";
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#regionfunction to get the ticket list crated by the user
  ticketsraised() {
    this.ticketService.ticketsraised().subscribe((res: any) => {
      this.tableResponce = this.CRUDFunction.responceBindingAsObject(res);
      this.openTicketList = this.tableResponce?.openTicket;
      this.closeTicketList = this.tableResponce?.closeTicket;
      this.openTicketList?.map((element) => {
        this.priorityIcons?.forEach((icon) => {
          if (element.priorityType === icon.priorityType) {
            element.class = icon.class;
            element.iconName = icon.iconName;
            element.color = icon.color;
          }
        });
        return element;
      });
      this.closeTicketList?.map((element) => {
        this.priorityIcons?.forEach((icon) => {
          if (element.priorityType === icon.priorityType) {
            element.class = icon.class;
            element.iconName = icon.iconName;
            element.color = icon.color;
          }
        });
        return element;
      });
    },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to change the page in the table of open tickets
  pageChangedOpenTicketList(e) {
    this.configTicketRaisedOpen.itemsPerPage = e.pageSize;
    this.configTicketRaisedOpen.currentPage = e.pageIndex + 1;
    // this.configTicketRaisedOpen.currentPage = event;
  }
  //#endregion

  //#region function to change the page in the table of close tickets
  pageChangedCloseTicketList(e) {
    this.configTicketRaisedClose.itemsPerPage = e.pageSize;
    this.configTicketRaisedClose.currentPage = e.pageIndex + 1;
  }
  //#endregion

  //#region function will route to chat section for the more information
  openChatSection(ticketId) {
    let post = {
      ticketId: ticketId,
      creatorPage: true,
    };
    this.CRUDFunction.routingWithData("/help-desk/ticket-chat", post);
  }
  //#endregion

  //#region clear the form
  clearForm() {
    this.ticketRaiseForm.reset();
    this.filesArray = [];
  }
  //#endregion
}
