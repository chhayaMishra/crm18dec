import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from "xlsx";
import { ConformComponent } from "../conform/conform.component";
import { ActivityComponent } from "../activity/activity.component";
import { CrmService } from "src/app/shared/CRMService/crm.service";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"],
})
export class LeadComponent implements OnInit {
  element = true;
  AddformGroup: FormGroup;
  submit: boolean;
  panelOpenState = true;
  show = true;
  currencyList: any[] = [];
  currencyName: any;
  currencyId: any;
  // LeaddetailsData: any[] = [];
  LeaddetailsData: MatTableDataSource<any>;
  dataSource = new MatTableDataSource<any>();
  //LeaddetailsData: any[] = [];
  pageSize: number = 10;
  yourForm: FormGroup;
  isEditing = false;
  currentItem: any = null;
  currentPage = 1;
  isEditMode = false;
  //  pageSize = 10;
  totalItems = 0;
  leads: any[] = [];
  editData: any = null;
  searchKeyword: string = "";
  deletedLeads: any[] = [];
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
    "FirstName",
    "LastName",
    "Convo",
    // "Topic",
    // "PurchaseTimeFrame",
    "LeadSource",

    // "JobTitle",
    "CompanyName",
    "LeadType",
    "Email",
    "MobilePhone",
    // "CurrencyName",
    "Status",
    "createContact",

    "actions",
  ];
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("drawer") drawer: MatDrawer;
  @ViewChild("drawer2") drawer2: MatDrawer;
  constructor(
    private crmService: CrmService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.AddformGroup = this.fb.group({
      Topic: ["", Validators.required],
      BudgetAmount: ["", Validators.required],
      PurchaseTimeframe: [""],
      LeadType: [""],
      LeadSource: [""],
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      JobTitle: ["", Validators.required],
      CompanyName: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      MobilePhone: ["", [Validators.required]],
      Description: [""],
      CurrencyName: [""],
      currencyId: [""],
      Status: [""],
      Notes: [""],
    });
    // Initialize MatTableDataSource
    this.LeaddetailsData = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.loadData(this.currentPage, this.pageSize);
    this.getallcurrency();
    


    if (!this.LeaddetailsData.sort) this.LeaddetailsData.sort = this.sort;
    // this.LeaddetailsData.sort = this.sort;
    console.log("this.LeaddetailsData.sort", this.LeaddetailsData.sort);
    console.log("this.sort", this.sort);
  }
  ngAfterViewInit() {
    this.LeaddetailsData.sort = this.sort;
  }

  async announceSortChange(sortState: Sort) {
    console.log("sortState", sortState);

    if (sortState.direction) {
      await this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      await this._liveAnnouncer.announce("Sorting cleared");
    }
    // You might need to implement sorting logic here
  }
  // announceSortChange(sortState: Sort) {
  //   debugger
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }
  open(content) {
		this.modalService.open(content);
	}
  openEditDrawer(element: any) {
    debugger;
    var a = this.currencyList.filter(
      (y) => y.currencyName == element.currencyName
    );
    console.log(a);
    this.currencyId = a[0].CurrencyId;
    this.currencyName = a[0].CurrencyName;

    if (this.currencyId != null) {
      this.currentItem = element;
      console.log(element);
      this.isEditing = true;
      debugger;
      this.AddformGroup.patchValue({
        Topic: element.Topic,
        BudgetAmount: element.BudgetAmount,
        PurchaseTimeframe: element.PurchaseTimeFrame,
        LeadSource: element.LeadSource,
        LeadType: element.LeadType,
        FirstName: element.FirstName,
        LastName: element.LastName,
        JobTitle: element.JobTitle,
        CompanyName: element.CompanyName,
        Email: element.Email,
        MobilePhone: element.MobilePhone,
        Description: element.Description,
        Status: element.Status,
        currencyId: this.currencyId,
        CurrencyName: this.currencyName,
      });
      this.drawer.toggle();
      console.log(element);
    } else {
      debugger;
      this.currentItem = element;
      this.isEditing = true;
      this.AddformGroup.patchValue({
        Topic: element.Topic,
        BudgetAmount: element.BudgetAmount,
        PurchaseTimeframe: element.PurchaseTimeFrame,
        LeadSource: element.LeadSource,
        LeadType: element.LeadType,
        FirstName: element.FirstName,
        LastName: element.LastName,
        JobTitle: element.JobTitle,
        CompanyName: element.CompanyName,
        Email: element.Email,
        MobilePhone: element.MobilePhone,
        Description: element.Description,
        Status: element.Status,
        Notes:element.Notes,
        // currencyId: this.currencyId,
        // CurrencyName: this.currencyName,
      });
      this.drawer.toggle();
    } // Open the drawer for editing
  }


  // openActivityDrawer(){
  //   // this.isEditing = false;
  //   // this.currentItem = null; // Reset currentItem when adding
  //   // this.AddformGroup.reset(); // Clear form fields when adding
  //   // this.drawer.toggle(); 
  //   this.drawer2.toggle();
  // }

  openAddDrawer() {
    this.isEditing = false;
    this.currentItem = null; // Reset currentItem when adding
    this.AddformGroup.reset(); // Clear form fields when adding
    this.drawer.toggle(); // Open the drawer for adding
  }

  AddUtility(value) {
    if (this.isEditing) {
      // Call the edit API with this.currentItem.LeadId
      debugger;
      let updatedItem = {
        LeadId: this.currentItem.LeadId,
        Topic: value.Topic,
        BudgetAmount: value.BudgetAmount,
        PurchaseTimeframe: value.PurchaseTimeframe,
        LeadSource: value.LeadSource,
        LeadType: value.LeadType,
        FirstName: value.FirstName,
        LastName: value.LastName,
        JobTitle: value.JobTitle,
        CompanyName: value.CompanyName,
        Email: value.Email,
        MobilePhone: value.MobilePhone,
        Description: value.Description,
        currencyId: this.currencyId,
        CurrencyName: this.currencyName,
        Status: value.Status,
        Notes:value.Notes,
      };

      this.crmService.editleadentity(updatedItem).subscribe((res: any) => {
        this.loadData(this.currentPage, this.pageSize);
        this.drawer.toggle();
      });
    } else {
      debugger;
      let newItem = {
        // LeadId: value.LeadId,
        Topic: value.Topic,
        BudgetAmount: value.BudgetAmount,
        PurchaseTimeframe: value.PurchaseTimeframe,
        LeadSource: value.LeadSource,
        FirstName: value.FirstName,
        LeadType: value.LeadType,
        LastName: value.LastName,
        JobTitle: value.JobTitle,
        CompanyName: value.CompanyName,
        Email: value.Email,
        MobilePhone: value.MobilePhone,
        Description: value.Description,
        currencyId: this.currencyId,
        CurrencyName: this.currencyName,
        Status: value.Status,
        Notes:value.Notes,
      };
      this.crmService.createlead(newItem).subscribe((res: any) => {
        console.log(res);
        this.loadData(this.currentPage, this.pageSize);
        this.drawer.toggle();
      });
      this.crmService.createactivity(newItem).subscribe((res: any) => {
        console.log(res);
    })

    }
  }

  getlistoflead() {
    this.crmService.getlistoflead().subscribe((res: any[]) => {
      this.ngOnInit();
      console.log(res);
      this.LeaddetailsData.data = res.filter((lead) => !lead.isDeleted);
      //this.totalItems = this.LeaddetailsData.length;
    });
  }

  confirmDelete(leadId: any) {
    const confirmation = window.confirm(
      "Are you sure you want to delete the lead record?"
    );
    if (confirmation) {
      this.deleteUtilityItem(leadId);
    }
  }

  deleteUtilityItem(leadId: any) {
    const confirmation = window.confirm(
      "Are you sure you want to delete the lead record?"
    );

    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)
      this.crmService.softDeleteLead(leadId).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");
          this.getlistoflead();
          this.loadData(this.currentPage, this.pageSize);// Refresh the lead list
        },
        (error) => {
          console.error("Error soft deleting item:", error);
        }
      );
    }
  }

  onSearchChange() {
    this.currentPage = 1; // Reset to the first page when searching
    this.loadData(this.currentPage, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage, this.pageSize);
    this.ngOnInit();
  }


  async loadData(pageNumber: number, pageSize: number) {
    await this.crmService
      .getLeads(pageNumber, pageSize, this.searchKeyword)
      .subscribe((data: any) => {
        // this.LeaddetailsData.data = data.items.filter((lead) => !lead.isDeleted);
        this.LeaddetailsData = new MatTableDataSource(
          data.items.filter((lead) => !lead.isDeleted)
        );
        console.log("data", data);
        this.totalItems = data.totalItems;
        console.log("LeaddetailsData-->", this.LeaddetailsData);
      });
  }

  //Get all currency
  async getallcurrency() {
    await this.crmService.getlistofallcurrency().subscribe((res: any) => {
      this.currencyList = res;
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

  async exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      await this.LeaddetailsData.data
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    XLSX.writeFile(workbook, "LeadDetails.xlsx");
  }
  // exportToExcel() {
  //   // Extract the data from MatTableDataSource
  //   const data = this.LeaddetailsData.data;

  //   // Check if there is any data to export
  //   if (data.length === 0) {
  //     console.error('No data to export.');
  //     return;
  //   }

  //   // Convert the data to Excel worksheet
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  //   // Create a workbook
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ["data"],
  //   };

  //   // Save the workbook as an Excel file
  //   XLSX.writeFile(workbook, "LeadDetails.xlsx");
  // }

  //download template
  downloadTemplate(): void {
    this.templatedata = [
      {
        // "Id":"",
        Topic: "",
        PurchaseTimeframe: "",
        LeadSource: "",
        FirstName: "",
        LastName: "",
        JobTitle: "",
        CompanyName: "",
        LeadType: "",
        Email: "",
        MobilePhone: "",
        CurrencyId: "",
        CurrencyName: "",
      },
    ];
    this.crmService.exportAsExcelFile(this.templatedata, "Lead Template");
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

        this.crmService.ImportExcelLead(data).subscribe((res: any) => {
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

  CloseEvent() {
    this.drawer.close();
  }

  openDelete(leadId: any) {
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
        this.crmService.softDeleteLead(leadId).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");

            this.getlistoflead();
            this.loadData(this.currentPage, this.pageSize);// Refresh the lead list
          },

          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }

  addcontact(value) {
    let newItem = {
      FirstName: value.FirstName,
      LastName: value.LastName,
      Email: value.Email,
      MobilePhone: value.MobilePhone,
      // currencyId: this.currencyId,
      // CurrencyName: value.CurrencyName.CurrencyName,
      // CurrencyName: this.currencyName,
    };
    this.crmService.createcontact(newItem).subscribe((res: any) => {
      console.log(res);
    });
  }

  openActivity(element,leadId) {
    debugger
    var p = {
      "activity":'lead',
      "Id":leadId,
     "ldata":element
    }
   
    const dialogRef = this.dialog.open(ActivityComponent, {
      // data: newItem,
      data:p,
   
        height: '90%', // Set the desired height
        width: '100%',  // You can also set the width if needed
     
    });
   
    dialogRef.afterClosed().subscribe(() => {
      // Use newItem instead of data
      this.crmService.getactivitybylead(leadId).subscribe((res: any) => {
        console.log(res);
      });
   
 
    });
  }
}
