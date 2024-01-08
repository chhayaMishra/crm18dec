import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { TicketService } from "../Service/ticket.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-update-ticket",
  templateUrl: "./add-update-ticket.component.html",
  styleUrls: ["./add-update-ticket.component.scss"],
})
export class AddUpdateTicketComponent implements OnInit {
  categoryId: any;
  employeeList: any[];
  priorityList: any = [
    {
      priorityType: 1,
      name: "Low",
      isRequired: false,
      icon: "star_border",
      color: "#ff9800",
    },
    {
      priorityType: 2,
      name: "Medium",
      isRequired: false,
      icon: "star_half",
      color: "#2196f3",
    },
    {
      priorityType: 3,
      name: "High",
      isRequired: false,
      icon: "star",
      color: "#ec8686",
    },
    {
      priorityType: 4,
      name: "Urgent",
      isRequired: false,
      icon: "warning",
      color: "#f44336",
    },
    {
      priorityType: 5,
      name: "Road Blocker",
      isRequired: false,
      icon: "whatshot",
      color: "#c2b89d",
    },
  ];
  addUpdateCategoryForm: FormGroup;
  selected: string = "2";
  ticketCategoryData: any[];
  submitted: boolean = false;

  constructor(
    private CRUDFunction: CRUDFunction,
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.dataFromURL();
    this.emplistoforg();
    this.addUpdateCategoryForms();
  }

  //#region function to create the from to category cu
  addUpdateCategoryForms() {
    this.addUpdateCategoryForm = this.formBuilder.group({
      categoryName: ["", Validators.required],
      description: ["", Validators.required],
      categoryTag: ["", Validators.required],
      categoryHead: [, Validators.required],
      categoriesAssign: [""],
      reOpenTicket: [false, Validators.required],
      active: [true, Validators.required],
      subCategories: this.formBuilder.array([]),
    });
  }
  get category() {
    return this.addUpdateCategoryForm.controls;
  }

  get subCategories(): FormArray {
    return this.addUpdateCategoryForm.controls["subCategories"] as FormArray;
  }

  addSubCategory() {
    const subcategory = this.formBuilder.group({
      subCategoriesName: [""],
      subCategoriesDescription: [""],
    });
    this.subCategories.push(subcategory);
  }

  deleteSubCategory(i: number) {
    this.subCategories.removeAt(i);
  }
  //#endregion

  //#region fucntion to get the data from the params
  dataFromURL() {
    this.categoryId = this.CRUDFunction.dataDecoding();
    this.categoryId ? this.getticketcategorybyid(this.categoryId) : "";
  }
  //#endregion

  //#region function to get alll the employee list
  emplistoforg() {
    this.ticketService.emplistoforg().subscribe(
      (res: any) => {
        this.employeeList = this.CRUDFunction.responceBinding(res);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the priority selection
  prioritySelection(check: boolean, priorityType: number) {
    this.priorityList.forEach((element) => {
      if (element.priorityType == priorityType) {
        element.isRequired = check;
      }
    });
  }
  //#endregion

  //#region function to show the button to add the sub categories
  radioChange(value) {
    this.selected = value;
  }
  //#endregion

  //#region function to check the validation error in form submission
  submitCategory(value) {
    this.submitted = true;
    this.CRUDFunction.checkValidation(value)
      ? this.checkFormArray(value.value)
      : "";
  }

  checkFormArray(value) {
    let errorBox = [];
    value.subCategories.forEach((element) => {
      !element.subCategoriesName || !element.subCategoriesDescription
        ? errorBox.push(true)
        : errorBox.push(false);
    });
    errorBox.some((element) => element === true)
      ? this.toastrService.error("Please enter sub category information")
      : this.submitValue(value);
  }
  //#endregion

  //#region function to submit the category information
  submitValue(value) {
    value["priorities"] = this.priorityList;
    let apiName = "";
    this.categoryId
      ? ((apiName = "updatecategory"), (value["categoryId"] = this.categoryId))
      : (apiName = "createcategory");
    this.ticketService[apiName](value).subscribe(
      (res: any) => {
        this.CRUDFunction.apiResponce(res, "Ticket Category")
          ? this.CRUDFunction.routingWithOutData("/help-desk/ticket-category")
          : "";
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the category information using category id
  getticketcategorybyid(categoryId) {
    this.ticketService.getticketcategorybyid(categoryId).subscribe(
      (res: any) => {
        this.ticketCategoryData = this.CRUDFunction.responceBinding(res);
        this.patchDataInTheCategoryForm(this.ticketCategoryData);
      },
      (error: any) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to patch the category information
  patchDataInTheCategoryForm(ticketCategoryData) {
    this.addUpdateCategoryForm.patchValue({
      categoryName: ticketCategoryData.categoryName,
      description: ticketCategoryData.description,
      categoryTag: ticketCategoryData.categoryTag,
      categoryHead: ticketCategoryData.categoryHead,
      categoriesAssign: ticketCategoryData.employeeNameList,
      reOpenTicket: ticketCategoryData.reOpenTicket,
      active: ticketCategoryData.active,
    });
    let priorityList = ticketCategoryData.priorities;
    this.priorityList.forEach((element) => {
      priorityList.filter((elements) => {
        if (element.priorityType == elements.priorityType) {
          element.isRequired = elements.isRequired;
        }
      });
    });
    ticketCategoryData.subCategories.length != 0
      ? (this.selected = "1")
      : (this.selected = "2");
    this.selected == "1"
      ? this.setsubcategories(ticketCategoryData.subCategories)
      : "";
  }
  //#endregion

  //#region function to patch the value in the sub category form array
  setsubcategories(quantities: any[]) {
    const formArray = new FormArray([]);
    for (let x of quantities) {
      formArray.push(
        this.formBuilder.group({
          subCategoriesName: x.subCategoriesName,
          subCategoriesDescription: x.subCategoriesDescription,
        }),
      );
    }
    this.addUpdateCategoryForm.setControl("subCategories", formArray);
  }
  //#endregion
}
