import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { environment } from "src/environments/environment";
import { TicketService } from "../Service/ticket.service";
import { PopupFunctionService } from "src/app/shared/global-functions/popup-function.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-ticket-chat",
  templateUrl: "./ticket-chat.component.html",
  styleUrls: ["./ticket-chat.component.scss"],
})
export class TicketChatComponent implements OnInit {
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
  status = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Progress" },
    { id: 3, name: "Completed" },
  ];
  ticketId: any;
  ticketDetials: any;
  baseURL = environment.API_URL;
  image: any;
  message: string = "";
  ticketCategoryList: any = [];
  priorityList: any = [];
  assigneeList: any = [];
  ticketStatusForm: FormGroup;
  subCategoryList: any = [];
  creatorPage: any;
  ticketReOpenForm: FormGroup;
  filesArray: any = [];
  submitted: boolean = false;

  constructor(
    private CRUDFunction: CRUDFunction,
    private ticketService: TicketService,
    private popupFunctionService: PopupFunctionService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dataFromURL();
    this.ticketStatusForms();
    this.getallticketcategory();
  }

  //#region function will extract data from the URL
  dataFromURL() {
    let post = this.CRUDFunction.dataDecoding();
    this.ticketId = post.ticketId;
    this.creatorPage = post.creatorPage;
    this.getticketdetails();
    this.ticketReOpenForms();
  }
  //#endregion

  //#region funciton to create a form
  ticketStatusForms() {
    this.ticketStatusForm = this.formBuilder.group({
      categoryId: [""],
      subCategoriesId: [""],
      priorityType: [""],
      assignedToId: [""],
      ticketStatus: [""],
    });
  }
  //#endregion

  //#region funciton to create a form for reopen ticket reason
  ticketReOpenForms() {
    this.ticketReOpenForm = this.formBuilder.group({
      message: ["", Validators.required],
    });
  }

  get reOpenTicekt() {
    return this.ticketReOpenForm.controls;
  }
  //#endregion

  //#region function will give the data to the ticket on the reciver side
  getticketdetails() {
    this.ticketService.getticketdetails(this.ticketId).subscribe(
      (res: any) => {
        this.ticketDetials = this.CRUDFunction.responceBindingAsObject(res);

        this.priorityIcons.forEach((icon) => {
          if (this.ticketDetials.priorityType === icon.priorityType) {
            this.ticketDetials.class = icon.class;
            this.ticketDetials.iconName = icon.iconName;
            this.ticketDetials.color = icon.color;
          }
        });
        this.ticketCategorySelection(this.ticketDetials.categoryId);
        this.ticketDetials?.commentList.reverse();
        this.ticketStatusForm.patchValue({
          categoryId: this.ticketDetials.categoryId,
          subCategoriesId: this.ticketDetials.subCategoriesId,
          priorityType: this.ticketDetials.priorityType,
          assignedToId: this.ticketDetials.assignedToId,
          ticketStatus: this.ticketDetials.ticketStatus,
        });
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to open a popup window to show the image in full view
  imageViewPopup(imageViewContent, item) {
    this.image = item;
    this.popupFunctionService.poupOpenFunction(imageViewContent, "lg");
  }
  //#endregion

  //#region function to submit the comment in the ticket
  submitComment() {
    if (this.message.trim() === "") {
      return this.toastrService.error("Comment can not be empty");
    }
    let post = {
      ticketId: this.ticketId,
      message: this.message.trim(),
      imageURLs: [],
    };
    this.ticketService.createticketcomment(post).subscribe((res: any) => {
      this.CRUDFunction.apiResponceWithOutToaster(res) ? (this.getticketdetails(), (this.message = "")) : "";
    }, (error: any) => {
      this.CRUDFunction.handleHttpError(error);
    },
    );
  }
  //#endregion

  //#region function to get all ticket category which is active
  getallticketcategory() {
    this.ticketService.getallticketcategory(true).subscribe(
      (res: any) => {
        this.ticketCategoryList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function will hit on the selection of ticket category
  ticketCategorySelection(categoryId) {
    this.getallprioritiesbyid(categoryId);
    this.ticketcategoryidemp(categoryId);
  }
  //#endregion

  //#region function to get all priorities by the categoryid
  getallprioritiesbyid(categoryId) {
    this.ticketService.getallprioritiesbyid(categoryId).subscribe(
      (res: any) => {
        this.priorityList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get all priorities by the categoryid
  getallsubcategorybyid(categoryId) {
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

  //#region funciton to get all assignee for the ticket category
  ticketcategoryidemp(categoryId) {
    this.ticketService.ticketcategoryidemp(categoryId).subscribe(
      (res: any) => {
        this.assigneeList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to update the ticket status for the user help
  updateTicketStatus(value) {
    this.CRUDFunction.checkValidation(value)
      ? this.submitValue(value.value)
      : "";
  }

  submitValue(value) {
    value["ticketId"] = this.ticketId;
    this.ticketService.updateticket(value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Ticket")
          ? this.CRUDFunction.routingWithOutData("/help-desk/ticket-received")
          : "";
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region funciton to open popup for the reopen ticket
  reOpenTicketPopUp(reOpenTicketContent) {
    this.popupFunctionService.poupOpenFunction(reOpenTicketContent, "lg");
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

  //#region function to submit the reopen ticket
  reOpenTicket(ticketReOpenForm) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(ticketReOpenForm)
      ? this.submitReOpenTicekt(ticketReOpenForm.value)
      : "";
  }

  submitReOpenTicekt(value) {
    value["imageURL"] = this.filesArray[0];
    value["ticketId"] = this.ticketId;
    this.ticketService.updateticketstatus(value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Ticket Status")
          ? this.CRUDFunction.routingWithOutData("/help-desk/ticket-raised")
          : "";
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region send msg using enter key press
  enterKeyPress(value) {
    value.key === "Enter" || value.keyCode === 13 ? this.submitComment() : "";
  }
  //#endregion
}
