import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { ConformComponent } from "../conform/conform.component";
import { ActivityComponent } from "../activity/activity.component";
import { CrmService } from "src/app/shared/CRMService/crm.service";
@Component({
  selector: "app-opportunity",
  templateUrl: "./opportunity.component.html",
  styleUrls: ["./opportunity.component.scss"],
})
export class OpportunityComponent implements OnInit {
  AddformGroup: FormGroup;
  show = true;
  submit: boolean;
  accountId: any;
  id: any;
  searchKeyword: string = "";
  pageSize: number = 10;
  currentPage = 1;
  Data: any;
  AccountList: any[] = [];
  totalItems: any;
  isEditing: boolean = false;
  currentItem: any = null;
  sortedData: any;
  dataSource = new MatTableDataSource<any>();
  OpportunitydetailsData: any[] = [];
  accountList: any[] = [];
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
  displayedColumns: string[] = [
    "sno",

    "contact",

    "Convo",
    "account",

    "Topic",
    "Bamount",

    "Erevenue",

    "Eclosedate",

    "OrganizationId",

    "CompanyId",
"Status",
    "CustomerNeed",

    "CurrencyName",

    "Actions",
  ];

  cId: any;
  cName: any;
  contactList: any[] = [];
  currencyList: any[] = [];
  currencyName: any;
  currencyId: any;
  aName: any;
  contactId: any;
  contactName: any;
  accountName: any;
  constructor(
    private crmService: CrmService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog
  ) {
    this.AddformGroup = this.fb.group({
      Topic: [""],

      Contact: [""],

      Account: [""],

      BudgetAmount: [""],

      Estrevenue: [""],

      Estclosedate: [""],

      Customerneed: [""],

      OrganizationId: [""],
      CompanyID: [""],
      CurrencyName: [""],
      contactId: [""],
      currencyId: [""],
      accountId: [""],
      Status: [""],
    });
  }

  @ViewChild("drawer") drawer: MatDrawer;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // this.getlistofopportunity();
    // this.getAllCurrency();
    this.getlistofopportunity();
    // this.getAllContact();
    // this.getAllAccount()
    this.getallaccount();
    this.getallcurrency();
    this.getallcontact();
    this.loadData(this.currentPage, this.pageSize);
  }

  onFormSubmit(form: any) {
    debugger;

    this.submit = true;

    console.log(form);
  }

  openEditDrawer(element: any) {
    var a = this.currencyList.filter(
      (y) => y.currencyName == element.currencyName
    );

    var b = this.contactList.filter((x) => x.FullName == element.FullName);

    var c = this.accountList.filter((x) => x.AccountName == element.Account);

    console.log(a);
    console.log(b);
    this.accountId = c[0].AccountId;
    this.currencyId = a[0].CurrencyId;
    this.currencyName = a[0].CurrencyName;
    this.contactName = c[0].PrimaryContact;
    this.accountName = c[0].AccountName;
    if (this.accountId != null) {
      this.currentItem = element;

      this.isEditing = true;
      // Bind the data to the form fields
      debugger;
      this.AddformGroup.patchValue({
        accountId: this.accountId,
        Topic: element.Topic,
        BudgetAmount: element.BudgetAmount,
        Estrevenue: element.Estrevenue,
        Estclosedate: element.Estclosedate,

        Customerneed: element.Customerneed,

        OrganizationId: element.OrganizationId,

        Status: element.Status,
        CompanyID: element.CompanyID,

        currencyId: this.currencyId,

      });
      this.ngOnInit();
      this.drawer.toggle();
    } else {
      this.currentItem = element;

      this.isEditing = true;
      debugger;
      this.AddformGroup.patchValue({
      
        Topic: element.Topic,

        // Contact: element.Contact,
        // Contact: this.cName,
        // Account: element.Account,
        // Account: this.aName,

        // Account:this.accountName,
        BudgetAmount: element.BudgetAmount,

        Estrevenue: element.Estrevenue,

        Estclosedate: element.Estclosedate,

        Customerneed: element.Customerneed,

        OrganizationId: element.OrganizationId,

        CompanyID: element.CompanyID,

        // currencyId: this.currencyId,

        CurrencyName: this.currencyName,

        // contactId: this.contactId,

        // contactName:this.contactName,
        // accountName: this.accountName,
        Status: element.Status,
        // AccountId: this.accountId
      });
      this.ngOnInit();
      this.drawer.toggle();
    } // Open the drawer for editing
  }

  openAddDrawer() {
    this.isEditing = false;

    this.currentItem = null; // Reset currentItem when adding

    this.AddformGroup.reset(); // Clear form fields when adding

    this.drawer.toggle(); // Open the drawer for adding
  }

  onSearchChange() {
    this.currentPage = 1; // Reset to the first page when searching

    this.loadData(this.currentPage, this.pageSize);
  }

  AddUtility(value) {
    console.log("value", value);
    if (this.isEditing) {
      debugger;
      // Call the edit API with this.currentItem.LeadId

      let updatedItem = {
        Id: this.currentItem.Id,

        Topic: value.Topic,

        // Contact: value.Contact.FullName,

        // Account: value.Account,
        // Account:this.aName ,
        BudgetAmount: value.BudgetAmount,

        Estrevenue: value.Estrevenue,

        Estclosedate: value.Estclosedate,

        Customerneed: value.Customerneed,

        OrganizationId: value.OrganizationId,

        CompanyID: value.CompanyID,

        currencyId: this.currencyId,

        CurrencyName: this.currencyName,
        contactId: this.contactId,
        accountName: this.accountName,
        // contactName:this.contactName,
        FullName: this.contactName,
        Status: value.Status,
        AccountId: this.accountId,
        Account: this.accountName,
        // ... update other fields
      };

      this.crmService.editOpportunity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.loadData(this.currentPage, this.pageSize);

        this.drawer.toggle();
      });
    } else {
      console.log("value:", value);
      let newItem = {
        Topic: value.Topic,
        // ContactId: value.Contact,
        // Account: value.Account,
        // Account:this.aName ,
        BudgetAmount: value.BudgetAmount,
        Estrevenue: value.Estrevenue,
        Estclosedate: value.Estclosedate,
        Customerneed: value.Customerneed,
        OrganizationId: value.OrganizationId,
        CompanyID: value.CompanyID,
        // contactId: this.cId,
        // currencyId: this.currencyId,
        // CurrencyName: value.CurrencyName,
        contactId: this.contactId,
        //  AccountId: this.accountId,
        accountName: this.accountName,
        contactName: this.contactName,
        currencyId: this.currencyId,
        FullName: this.contactName,
        // CurrencyName: value.CurrencyName.CurrencyName,
        CurrencyName: this.currencyName,
        Status: value.Status,
        AccountId: this.accountId,
        Account: this.accountName,

        // currencyId: this.currencyId,
        //AccountName:this.accountName,

        // ... other fields for the new item
      };

      console.log("newItem:", newItem);
      this.crmService.createopportunity(newItem).subscribe((res: any) => {
        console.log(res);
        this.loadData(this.currentPage, this.pageSize);
        this.drawer.toggle();
      });
    }
  }

  getlistofopportunity() {
    debugger;

    this.crmService.getlistofopportunity().subscribe((res: any) => {
      console.log(res);

      this.OpportunitydetailsData = res?.items;

      console.log(res);

      this.totalItems = this.OpportunitydetailsData.length;
    });
  }

  // DeleteUtility(accountId: any) {
  //   debugger;

  //   this.crmService.deleteopportunity(accountId).subscribe((res: any) => {
  //     this.getlistofopportunity();
  //   });
  // }

  deleteUtilityItem(Id: any) {
    const confirmation = window.confirm(
      "Are you sure you want to delete the lead record?"
    );

    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)

      this.crmService.deleteopportunity(Id).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");
          this.getlistofopportunity();
          this.loadData(this.currentPage, this.pageSize); // Refresh the lead list
        },

        (error) => {
          console.error("Error soft deleting item:", error);
        }
      );
    }
  }

  onPageChange(event: PageEvent) {
    debugger;

    this.currentPage = event.pageIndex + 1;

    this.pageSize = event.pageSize;

    this.loadData(this.currentPage, this.pageSize);
  }

  loadData(pageNumber: number, pageSize: number) {
    this.crmService

      .getopportunity(pageNumber, pageSize, this.searchKeyword)

      .subscribe((data: any) => {
        this.OpportunitydetailsData = data.items;

        this.totalItems = data.totalItems;
      });
  }

  //Get all contact
  //Get all contact
  getAllContact() {
    this.crmService.getlistofcontact().subscribe((res: any) => {
      this.contactList = res["items"];
      console.log(this.contactList);
    });
  }

  // Get seleted value
  getContactSelect(event) {
    console.log(event);
    var a = this.contactList.filter((x) => x.ContactId == event.value);

    //CurrencyName
    console.log(a);
    this.contactName = a[0].FullName;
    this.contactId = a[0].ContactId;
    this.accountName = a[0].AccountName;
    // this.AccountName = a[0].accountName;
    // this.cId = event.value.ContactId;
    // this.cName = event.value.FullNameResponse;
    // this.aName = event.value.AccountNameResponse;
    // console.log(this.cName);
    // console.log(this.aName);
  }
  //Get all currency
  //Get all currency
  getAllCurrency() {
    this.crmService.getlistofcurrency().subscribe((res: any) => {
      this.currencyList = res["items"];
      console.log(this.currencyList);
    });
  }

  // Get seleted value
  getCurrencySelect(event) {
    console.log(event);

    var a = this.currencyList.filter((x) => x.CurrencyId == event.value);

    //CurrencyName
    console.log(a);
    this.currencyName = a[0].CurrencyName;
    this.currencyId = a[0].CurrencyId;

    console.log(this.currencyName);
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.OpportunitydetailsData
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    XLSX.writeFile(workbook, "OpportunityDetails.xlsx");
  }

  //download template
  downloadTemplate(): void {
    this.templatedata = [
      {
        Topic: "",
        ContactId: "",
        Account: "",
        BudgetAmount: "",
        Estrevenue: "",
        Estclosedate: "",
        OrganizationId: "",
        CustomerNeed: "",
        CompanyID: "",
        CurrencyId: "",
        CurrencyName: "",
      },
    ];
    this.crmService.exportAsExcelFile(
      this.templatedata,
      "Opportunity Template"
    );
  }

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

        this.crmService.ImportExcelopportunity(data).subscribe((res: any) => {
          this.Import(content1);
          this.updateMessage = res.message;
          this.faultyAssets = res.data;
          this.loadData(this.currentPage, this.pageSize);
        });
      };
    } else {
      this.inputFile.nativeElement.value = "";
    }
  }

  getallcurrency() {
    this.crmService.getlistofallcurrency().subscribe((res: any) => {
      this.currencyList = res;
      console.log(this.currencyList);
    });
  }
  getallcontact() {
    this.crmService.getlistofallcontact().subscribe((res: any) => {
      this.contactList = res;
      console.log(this.contactList);
    });
  }
  CloseEvent() {
    this.drawer.close();
  }

  openDelete(Id: any) {
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
        this.crmService.deleteopportunity(Id).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");
            this.getlistofopportunity();
            this.loadData(this.currentPage, this.pageSize);// Refresh the lead list
          },

          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }

  getAccountSelect(event) {
    debugger;
    console.log(event);
    var a = this.accountList.filter((x) => x.AccountId == event.value);
    console.log(a);
    this.accountId = a[0].AccountId;
    this.accountName = a[0].AccountName;
    console.log(this.accountName);
  }

  getAllAccount() {
    this.crmService.getlistofaccount().subscribe((res: any) => {
      this.accountList = res;
      console.log(this.accountList);
    });
  }

  getallaccount() {
    debugger;
    this.crmService.getlistofallaccount().subscribe((res: any) => {
      this.accountList = res;
      console.log(this.accountList);
    });
  }
  openActivity(oppoId: any,element) {
    debugger
    var p = {
      "activity":'oppo',
      "Id":oppoId,
      "odata":element
    }
   
    const dialogRef = this.dialog.open(ActivityComponent, {
      // data: newItem,
      data:p,
      height: '90%', // Set the desired height
      width: '100%', 
    });

    dialogRef.afterClosed().subscribe(() => {
 
      this.crmService.getallactivitybyoppoId(oppoId).subscribe((res: any) => {
        console.log(res);
      });
      
    
    });
  }
  getStatusCellStyle(status: boolean): any {
    if (status) {
      return {
        'background-color': 'rgb(252, 148, 200)',
        color: 'white'
      };
    } else {
      return {
        'background-color': 'rgb(120, 148, 209)',
        color: 'white'
      };
    }
  }

}
