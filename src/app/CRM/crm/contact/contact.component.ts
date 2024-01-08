import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import * as XLSX from "xlsx";
import { ConformComponent } from "../conform/conform.component";
import { QuickaccountComponent } from "../quickaccount/quickaccount.component";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { CrmService } from "src/app/shared/CRMService/crm.service";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  AddformGroup: FormGroup;
  submit: boolean;
  panelOpenState = true;
  show = true;
  pageSize: number = 10;
  currentPage = 1;
  totalItems = 0;
  contacts: any[] = [];
  isEditing = false;
  currentItem: any;
  searchKeyword: string = "";
  contact: any[] = [];
  account: any[] = [];
  currency: any[] = [];
  editData: any = null;
  element = true;
  isEditMode = false;
  dataSource = new MatTableDataSource<any>();
  id: number;
  name: string;
  isDeleted: boolean;
  ticketnumb: string;
  actionsColumn: any;
  accountList: any[] = [];
  ContactdetailsData: any[] = [];
  showContent: boolean = false;
  selectedEmployee: any;
  displayedColumns: string[] = [
    "sno",
    "EmployeeId",
    "OrganizationId",
    // "FirstName",
    // "LastName",
    "FullName",
    "JobTitle",

    "AccountName",
    "Email",
    "BusinessPhone",
    "MobilePhone",
    // "Fax",
    // "Address",
    //"CurrencyName",
    // 'Gender',

    "Actions",
  ];
  ContactId: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("drawer") drawer: MatDrawer;
  cId: any;
  accountName: any;
  // currency: any[] = [];
  aId: any;
  accountId: any;

  currencyList: any[] = [];
  currencyName: any;
  currencyId: any;

  templatedata: any[];
  isExcelFile: boolean;
  content1: string = "";
  inputFile: any;
  keys: string[];
  hrService: any;
  updateMessage: any;
  faultyAssets: any;
  importResult: string;
  closeResult: string;
  accountItem: any;
  AllPage: number;
  employeeList: any[];
  constructor(
    public dialog: MatDialog,
    private crmService: CrmService,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.AddformGroup = this.fb.group({
      EmployeeId: [""],
      OrganizationId: [""],
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      JobTitle: [""],
      AccountName: [""],
      Email: ["", [Validators.required, Validators.email]],
      BusinessPhone: ["", [Validators.required, Validators.minLength(10)]],
      MobilePhone: [
        "",
        [Validators.required, Validators.pattern("[0-9 ]{10}")],
      ],
      Fax: ["", [Validators.required, Validators.maxLength(7)]],
      Address: ["", [Validators.required]],
      PreferdMethodofContact: ["", [Validators.required]],
      MaritalStatus: [""],
      Gender: ["", [Validators.required]],
      SpousePartnerName: [""],
      Birthday: [""],
      Anniversary: [""],
      // Currency: ["", [Validators.required]],
      CreditLimit: [""],
      CreditHold: [""],
      PaymentTerms: ["", [Validators.required]],
      CurrencyName: [""],
      currencyId: [""],
      accountId: [""],
      contactId: [""],
      ContactType: [""],
    });

    this.AddformGroup.get('ContactType').valueChanges.subscribe((value) => {
      this.updateShowContent(value);
    });
  }
  isReadOnly = false;
  form = new FormControl();
  ngOnInit(): void {
    // this.getAllAccount();
    // this.getAllCurrency();
    this.loadData(this.currentPage, this.pageSize);
    //this.getallcurrency()
    this.getallaccount();
    this.employee()
  }


  employee(){
    this.crmService.getEmployeeList().subscribe((data: any) => {
      debugger;
      this.employeeList= data.data;
      console.log(this.employeeList)
    });
  }
  updateShowContent(contactType: string): void {
    // Update showContent based on ContactType value
    this.showContent = contactType === 'Employee';
  }
  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }

  openEditDrawer(element: any) {
    if (this.accountList.length > 0) {
      var a = this.accountList.filter(
        (x) => x.AccountName == element.AccountName
      );
      if (a.length > 0) {
        console.log(a);
        this.accountId = a[0].AccountId;
        this.accountName = a[0].AccountName;
        this.AddformGroup.patchValue({
          accountId: this.accountId,
        });
      }
    }

    this.currentItem = element;
    console.log(element);
    this.isEditing = true;
    debugger;

    // this.AddformGroup.patchValue({ currencyId: this.currencyId });
    this.AddformGroup.patchValue({
      EmployeeId: element.EmployeeId,
      OrganizationId: element.OrganizationId,
      FirstName: element.FirstName,
      LastName: element.LastName,
      JobTitle: element.JobTitle,
      Email: element.Email,
      BusinessPhone: element.BusinessPhone,
      MobilePhone: element.MobilePhone,
      Fax: element.Fax,
      Address: element.Address,
      PreferdMethodofContact: element.PreferdMethodofContact,
      MaritalStatus: element.MaritalStatus,
      Gender: element.Gender,
      SpousePartnerName: element.SpousePartnerName,
      Birthday: element.Birthday,
      Anniversary: element.Anniversary,
      CreditLimit: element.CreditLimit,
      CreditHold: element.CreditHold,
      PaymentTerms: element.PaymentTerms,
      FullName:element.FullName,
      // currencyId: this.currencyId,
      ContactType: element.ContactType,
      // ... bind other form fields as needed
    });

    this.drawer.toggle();
  }

  openAddDrawer() {
    this.isEditing = false;

    this.currentItem = null; // Reset currentItem when adding

    this.AddformGroup.reset(); // Clear form fields when adding

    this.drawer.toggle(); // Open the drawer for adding
  }

  AddUtility(value) {
    if (this.isEditing) {
      debugger;
      // Call the edit API with this.currentItem.LeadId

      let updatedItem = {
        ContactId: this.currentItem.ContactId,
        EmployeeId: value.EmployeeId,
        OrganizationId: value.OrganizationId,
        FirstName: value.FirstName,
        LastName: value.LastName,
        JobTitle: value.JobTitle,
        //AccountName: value.AccountName.AccountName,
        Email: value.Email,
        BusinessPhone: value.BusinessPhone,
        MobilePhone: value.MobilePhone,
        Fax: value.Fax,
        Address: value.Address,
        MaritalStatus: value.MaritalStatus,
        PreferdMethodofContact: value.PreferdMethodofContact,
        Gender: value.Gender,
        SpousePartnerName: value.SpousePartnerName,
        Birthday: value.Birthday,
        Anniversary: value.Anniversary,
        Currency: value.Currency,
        CreditLimit: value.CreditLimit,
        CreditHold: value.CreditHold,
        PaymentTerms: value.PaymentTerms,
        //AccountId: this.AccountId,
        // currencyId: this.currencyId,
        ContactType: value.ContactType,
        FullName:value.FullName,
        // CurrencyName: value.CurrencyName.CurrencyName,
        // CurrencyName: this.currencyName,
        AccountId: this.accountId,
        AccountName: this.accountName,

        // ... update other fields
      };

      this.crmService.editcontactentity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
        // Close the drawer after editing

        this.drawer.toggle();
      });
    } else {
      // Call the add API as before

      // ...
      debugger;
      let newItem = {
        EmployeeId: value.EmployeeId,
        OrganizationId: value.OrganizationId,
        FirstName: value.FirstName,
        LastName: value.LastName,
        JobTitle: value.JobTitle,
        // AccountName: value.AccountName.AccountNameResponse,
        Email: value.Email,
        BusinessPhone: value.BusinessPhone,
        MobilePhone: value.MobilePhone,
        Fax: value.Fax,
        Address: value.Address,
        MaritalStatus: value.MaritalStatus,
        PreferdMethodofContact: value.PreferdMethodofContact,
        Gender: value.Gender,
        SpousePartnerName: value.SpousePartnerName,
        Birthday: value.Birthday,
        Anniversary: value.Anniversary,
        Currency: value.Currency,
        CreditLimit: value.CreditLimit,
        CreditHold: value.CreditHold,
        PaymentTerms: value.PaymentTerms,
        AccountId: this.accountId,
        // currencyId: this.currencyId,
        AccountName: this.accountName,
        // CurrencyName: this.currencyName,
        ContactType: value.ContactType,
        FullName:value.FullName,
        // ... other fields for the new item
      };

      // Call the API to add the new item

      this.crmService.createcontact(newItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();

        // Close the drawer after adding

        this.drawer.toggle();
      });
    }
  }

  getlistofcontact() {
    debugger;
    this.crmService.getlistofcontact().subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
      this.ContactdetailsData = res;
      this.ContactdetailsData = res.filter((contact) => !contact.isDeleted);
      this.totalItems = this.ContactdetailsData.length;
    });
  }
  getcontactbyid(value: any) {
    debugger;
    this.crmService.getcontactbyid(value.contactId).subscribe((res: any) => {
      // this.Data = res;

      console.log(res);
    });
  }

  confirmDelete(contactId: any) {
    const confirmation = window.confirm(
      "Are you sure to delete contact information"
    );
    if (confirmation) {
      this.DeleteUtility(contactId);
    }
  }

  // Fetch data from your API based on the page number and page size
  DeleteUtility(contactId: any) {
    debugger;

    const confirmation = window.confirm(
      "Are you sure delete contact inforemation?"
    );

    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)

      this.crmService.softDeleteContact(contactId).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");
          this.getlistofcontact(); // Refresh
          this.ngOnInit();
        },
        (error) => {
          console.error("Error soft deleting item:", error);
        }
      );
    }
  }

  onSearchChange() {
    this.AllPage = 1; // Reset to the first page when searching
 
    this.loadData(this.AllPage, this.pageSize);
  }
  onPageChange(event: PageEvent) {
    this.AllPage = event.pageIndex + 1;
    this.ngOnInit();
    this.pageSize = event.pageSize;
 
    this.loadData(this.AllPage, this.pageSize);
  }
 
  async loadData(pageNumber: number, pageSize: number) {
    await this.crmService
    .getContact(pageNumber, pageSize, this.searchKeyword)
 
     .subscribe((data: any) => {
        this.ContactdetailsData = data.items;
        this.ContactdetailsData = data.items.filter((lead) => !lead.isDeleted);
        this.totalItems = data.totalItems;
      });
      console.log(  this.ContactdetailsData)
  }

  //   onSearchChange() {
  //   this.AllPage = 1; // Reset to the first page when searching

  //   this.loadData(this.AllPage, this.pageSize);
  // }
  // onPageChange(event: PageEvent) {
  //   this.AllPage = event.pageIndex + 1;
  //   this.ngOnInit();
  //   this.pageSize = event.pageSize;

  //   this.loadData(this.AllPage, this.pageSize);
  // }

  // async loadData(pageNumber: number, pageSize: number) {
  //   await this.crmService
  //   .getContact(pageNumber, pageSize, this.searchKeyword)

  //    .subscribe((data: any) => {
  //       this.ContactdetailsData = data.items;
  //       this.ContactdetailsData = data.items.filter((lead) => !lead.isDeleted);
  //       this.totalItems = data.totalItems;
  //     });
  // }
  contactData(pageNumber: number, pageSize: number) {
    debugger;
    this.crmService
      .getContact(pageNumber, pageSize, this.searchKeyword)

      .subscribe((data: any) => {
        this.ContactdetailsData = data.items.filter(
          (contact) => !contact.isDeleted
        ); // Filter for Detele data

        this.totalItems = data.totalItems;

        this.ContactdetailsData = data.items;

        this.totalItems = data.totalItems;
      });
  }

  //Export

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.ContactdetailsData
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    XLSX.writeFile(workbook, "ContactDetails.xlsx");
  }

  // getAllAccount() {
  //   this.crmService.getlistofaccount().subscribe((res: any) => {
  //     this.accountList = res["items"];
  //     console.log(this.accountList);
  //   });
  // }

  // Get seleted value
  getAccountSelect(event) {
    debugger;
    console.log(event);
    var a = this.accountList.filter((x) => x.AccountId == event.value);
    console.log(a);
    this.accountId = a[0].AccountId;
    this.accountName = a[0].AccountName;
    console.log(this.accountName);
  }

  //download template
  downloadTemplate(): void {
    this.templatedata = [
      {
        EmployeeId: "",
        OrganizationId: "",
        FirstName: "",
        LastName: "",
        JobTitle: "",
        AccountName: "",
        Email: "",
        BusinessPhone: "",
        MobilePhone: "",
        Fax: "",
        Address: "",
        AccountId: "",
        CurrencyId: "",
        CurrencyName: "",
      },
    ];
    this.crmService.exportAsExcelFile(this.templatedata, "Contact Template");
  }
  //import
  Import(content1) {
    debugger;
    this.modalService.open(content1, { size: "lg" }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  onChange(evt, content1) {
    debugger;
    let data, header;
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);

    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = "";
    }
    if (this.isExcelFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        // / read workbook /
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {
          type: "binary",
          cellDates: true,
        });

        // / grab first sheet /
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // / save data /
        data = XLSX.utils.sheet_to_json(ws);
      };
      reader.readAsBinaryString(target.files[0]);
      reader.onloadend = (e) => {
        this.keys = Object.keys(data);

        this.crmService.ImportExcelContact(data).subscribe((res: any) => {
          this.Import(content1);
          this.updateMessage = res.message;
          this.faultyAssets = res.data;
          this.ngOnInit();
        });
      };
    } else {
      this.inputFile.nativeElement.value = "";
    }
  }

  CloseEvent() {
    this.drawer.close();
  }

  getallaccount() {
    debugger;
    this.crmService.getlistofallaccount().subscribe((res: any) => {
      this.accountList = res;
      console.log(this.accountList);
    });
  }

  openDelete(contactId: any) {
    debugger;
    const dialogRef = this.dialog.open(ConformComponent, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Save",
          cancel: "No",
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.crmService.softDeleteContact(contactId).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");
            this.getlistofcontact(); // Refresh
            this.ngOnInit();
          },
          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }

  addAccount(data: any): void {
    // Open the dialog
    const dialogRef = this.dialog.open(QuickaccountComponent, {
      width: '600px',
      height: "600px",
     
    });
   
    // Handle the dialog result
    dialogRef.afterClosed().subscribe(result => {
    
    
    });
    
  }
  onEmployeeSelected(event: MatAutocompleteSelectedEvent): void {
    // Find the selected employee from the list
    this.selectedEmployee = this.employeeList.find(
      (employee) => employee.displayName === event.option.viewValue
    );
 console.log(this.employeeList )
    // Update form controls with selected employee data
  //   this.myForm.patchValue({
  //     EmployeeId: this.selectedEmployee.employeeId,
  //     OfficeEmail: this.selectedEmployee.officeEmail,
  //   });
  }
}
