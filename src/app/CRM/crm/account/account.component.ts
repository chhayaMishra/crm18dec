import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSort } from "@angular/material/sort";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { ConformComponent } from "../conform/conform.component";
import { MatDialog } from "@angular/material/dialog";
import { CrmService } from "src/app/shared/CRMService/crm.service";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  AddformGroup: FormGroup;
  submit: boolean;
  accountId: any;
  id: any;

  searchKeyword: string = "";
  // AccountdetailsData: MatTableDataSource<any>;
  AccountdetailsData: any[] = [];
  pageSize: number = 10;
  currentPage = 1;

  displayedColumns: string[] = [
    "sno",
    "AccountName",
    "MainPhone",
    "Website",
    "fax",
    "tickerSymbol",
    "address1",
    "address2",
    "address3",
    "actions",
  ];
  Data: any;
  AccountId: any;

  totalItems: any;
  isEditing: boolean = false;
  currentItem: any = null;
  sortedData: any;
  contactList: any[] = [];
  contactId: any;
  contactName: any;
  cName: any;
  cId: any;

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
  constructor(
    private crmService: CrmService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog
  ) {
    this.AddformGroup = this.fb.group({
      AccountName: ["", [Validators.required, Validators.maxLength(20)]],
      MainPhone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9 ]{10}"),
        ]),
      ],
      Fax: ["", [Validators.required]],
      ParentAccount: ["", [Validators.required]],
      contactId: [""],
      PrimaryContact: ["", [Validators.required]],
      Website: ["", [Validators.required, Validators.minLength(5)]],
      Address1: ["", [Validators.required]],
      Address2: ["", [Validators.required]],
      Address3: [""],
      TickerSymbol: ["", [Validators.required]],
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild("empTbSort") empTbSort = new MatSort();

  @ViewChild("drawer") drawer: MatDrawer;

  ngOnInit(): void {
    this.getallcontact();

    this.loadData(this.currentPage, this.pageSize);
  }

  // ngAfterViewInit() {
  //   this.AccountdetailsData.sort = this.empTbSort;
  // }

  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }

  openEditDrawer(element: any) {
    debugger;
    if (this.contactList.length > 0) {
      var a = this.contactList.filter(
        (x) => x.FullName == element.PrimaryContact
      );
      if (a.length > 0) {
        console.log(a);
        this.contactId = a[0].ContactId;
        this.contactName = a[0].FullName;
        this.AddformGroup.patchValue({
          contactId: this.contactId,
        });
      }
    }
    this.currentItem = element;
    this.isEditing = true;
    this.AddformGroup.patchValue({
      AccountName: element.AccountName,
      MainPhone: element.MainPhone,
      Fax: element.Fax,
      ParentAccount: element.ParentAccount,

      TickerSymbol: element.TickerSymbol,
      Website: element.Website,
      Address1: element.Address1,
      Address2: element.Address2,
      Address3: element.Address3,
      // contactId: this.contactId,
    });

    this.drawer.toggle();
    // Open the drawer for editing
  }

  openAddDrawer() {
    this.isEditing = false;
    this.currentItem = null; // Reset currentItem when adding
    this.AddformGroup.reset(); // Clear form fields when adding

    this.drawer.toggle(); // Open the drawer for adding
  }

  AddUtility(value) {
    if (this.isEditing) {
      debugger
      let updatedItem = {
        AccountId: this.currentItem.AccountId,
        AccountName: value.AccountName,
        MainPhone: value.MainPhone,
        Fax: value.Fax,
        PrimaryContact: this.contactName,
        Website: value.Website,
        Address1: value.Address1,
        Address2: value.Address2,
        Address3: value.Address3,
        TickerSymbol: value.TickerSymbol,
        contactId: this.contactId,

        // contactName: this.contactName,
        //contactname: this.cName,
      };

      this.crmService.editaccountentity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
        this.drawer.toggle();
      });
    } else {
      let newItem = {
        AccountName: value.AccountName,
        MainPhone: value.MainPhone,
        Fax: value.Fax,
        ParentAccount: value.ParentAccount,
        Website: value.Website,
        Address1: value.Address1,
        Address2: value.Address2,
        Address3: value.Address3,
        TickerSymbol: value.TickerSymbol,
        contactId: this.contactId,
        // contactName: this.contactName,
        PrimaryContact: this.contactName,
      };

      this.crmService.createaccount(newItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
        this.drawer.toggle();
      });
    }
  }

  // DeleteUtility(accountId: any) {
  //   debugger;
  //   this.crmService.deleteaccount(accountId).subscribe((res: any) => {
  //     this.getlistofaccount();
  //     this.ngOnInit();
  //   });
  // }
  // confirmDelete(accountId: any) {
  //   const confirmation = window.confirm(
  //     "Are you sure you want to delete the lead record?"
  //   );

  //   if (confirmation) {
  //     this.deleteUtilityItem(accountId);
  //   }
  // }
 

  deleteUtilityItem(accountId: any) {
    const confirmation = window.confirm(
      "Are you sure you want to delete the lead record?"
    );

    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)

      this.crmService.deleteaccount(accountId).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");

          this.getlistofaccount();

          this.ngOnInit(); // Refresh the lead list
        },

        (error) => {
          console.error("Error soft deleting item:", error);
        }
      );
    }
  }

  //Get all contact

  getallcontact() {
    this.crmService.getlistofallcontact().subscribe((res: any) => {
      this.contactList = res;
      console.log(this.contactList);
    });
  }

  // Get seleted value
  getPrimaryContactSelect(event) {
    console.log(event);

    var a = this.contactList.filter((x) => x.ContactId == event.value);

    //CurrencyName
    console.log(a);
    this.contactId = a[0].ContactId;
    this.contactName = a[0].FullName;
  }
  getlistofaccount() {
    this.crmService.getlistofaccount().subscribe((res: any) => {
      this.ngOnInit();
      this.AccountdetailsData = res;
      this.AccountdetailsData = res.filter((lead) => !lead.isDeleted);
      //this.totalItems = this.AccountdetailsData.length;
      console.log(res);
      // this.ngOnInit();
      // console.log(res);
    });
  }

  getaccountbyid(value: any) {
    this.crmService.getaccountbyid(value.AccountId).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
  }

  // Fetch data from your API based on the page number and page size

  onSearchChange() {
    this.currentPage = 1; // Reset to the first page when searching

    this.loadData(this.currentPage, this.pageSize);
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.ngOnInit();
    this.pageSize = event.pageSize;

    this.loadData(this.currentPage, this.pageSize);
  }

  async loadData(pageNumber: number, pageSize: number) {
    await this.crmService
      .getAccount(pageNumber, pageSize, this.searchKeyword)

      .subscribe((data: any) => {
        this.AccountdetailsData = data.items;
        this.AccountdetailsData = data.items.filter((lead) => !lead.isDeleted);
        this.totalItems = data.totalItems;
      });
  }

  //export
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.AccountdetailsData
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    XLSX.writeFile(workbook, "AccountDetails.xlsx");
  }

  //download template
  downloadTemplate(): void {
    this.templatedata = [
      {
        // "Id":"",
        AccountName: "",
        MainPhone: "",
        Website: "",
        Fax: "",
        ContactId: "",
        TickerSymbol: "",
        Address1: "",
        Address2: "",
        Address3: "",
      },
    ];
    this.crmService.exportAsExcelFile(this.templatedata, "Account Template");
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

        this.crmService.ImportExcelAccount(data).subscribe((res: any) => {
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

  openDelete(accountId: any) {
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
        this.crmService.deleteaccount(accountId).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");

            this.getlistofaccount();

            this.ngOnInit(); // Refresh the lead list
          },

          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }


 
}
