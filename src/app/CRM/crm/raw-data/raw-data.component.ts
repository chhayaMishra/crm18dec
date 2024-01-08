import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from "xlsx";
import { CrmService } from 'src/app/shared/CRMService/crm.service';
import { ConformComponent } from '../conform/conform.component';
@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.scss']
})
export class RawDataComponent implements OnInit {
  element = true;
  AddformGroup: FormGroup;
  submit: boolean;
  panelOpenState = true;
  show = true;
  isReadonly = true;
  // RawdetailsData: any[] = [];
  dataSource = new MatTableDataSource<any>();
  RawdetailsData: any[] = [];
  pageSize: number = 10;
  isEditing = false;
  currentItem: any = null;
  currentPage = 1;
  isEditMode = false;
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
    "name",
    "companyname",
    "companylinkedin",
    "industrydomain",
    "Designation",
    "actions",
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("drawer") drawer: MatDrawer;

  constructor(private crmService: CrmService, public fb: FormBuilder, private modalService: NgbModal,
    private dialog: MatDialog,) {
    this.AddformGroup = this.fb.group({
      Name: [""],
      CompanyName: [""],
      FirstName: [""],
      LastName: [""],
      PersonAssigned: [""],
      IndustryDomain: [""],
      NumberofEmployees: [""],
      Designation: [""],
      Status: [""],
      DemoStatus: [""],
      FollowUpBy: [""],
      StatusReason: [""],
      CreatedBy: [""],
      CreatedOn:[""],
      DataType:[""],
      WhatsappStatus:[""],
      Mobile:[""],
      BusinessPhone:[""],
      Email:[""],
      LinkedIn:[""],
      CompanyLinkedInPage:[""],
      CompanyWebsite:[""],
      AddressLine1:[""],
      AddressLine2:[""],
      State:[""],
      City:[""],
    });
  }

  ngOnInit(): void {
    this.loadData(this.currentPage, this.pageSize);
   // this.getallcurrency()
    this.dataSource.sort = this.sort;
  }

  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }

  openEditDrawer(element: any) {
    debugger;
    this.currentItem = element;
    console.log(element);
    this.isEditing = true;
    // this.isReadonly = !this.isReadonly;
    // debugger;
    // var a = this.currencyList.filter(
    //   (y) => y.currencyName == element.currencyName
    // )
    // console.log(a);
    // this.currencyId = a[0].CurrencyId;
    // this.currencyName = a[0].CurrencyName;
   
    this.AddformGroup.patchValue({
      Name: element.Name,
      CompanyName: element.CompanyName,
      FirstName: element.FirstName,
      LastName: element.LastName,
      PersonAssigned: element.PersonAssigned,
      IndustryDomain: element.IndustryDomain,
      NumberofEmployees: element.NumberOfEmployees,
      Designation: element.Designation,
      Status: element.Status,
      DemoStatus: element.DemoStatus,
      FollowUpBy: element.FollowUpBy,
      StatusReason: element.StatusReason,
      CreatedBy: element.CreatedBy,
      CreatedOn: element.CreatedOn,
      DataType: element.DataType,
      WhatsappStatus: element.WhatsappStatus,
      Mobile: element.Mobile,
      BusinessPhone:element.BusinessPhone,
      Email: element.Email,
      LinkedIn: element.LinkedIn,
      CompanyLinkedInPage: element.CompanyLinkedInPage,
      CompanyWebsite: element.CompanyWebsite,
      AddressLine1:element.AddressLine1,
      AddressLine2: element.AddressLine2,
      State: element.State,
      City: element.City,
    });

    this.drawer.toggle(); // Open the drawer for editing
  }

  openAddDrawer() {
    this.isEditing = false;
    this.currentItem = null; // Reset currentItem when adding
    this.AddformGroup.reset(); // Clear form fields when adding
    this.drawer.toggle(); // Open the drawer for adding
  }

  AddUtility(value) {
    debugger;
    if (this.isEditing) {
      // Call the edit API with this.currentItem.LeadId
      let updatedItem = {
        RawId: this.currentItem.RawId,
      ContactId: this.currentItem.ContactId,  

        Name: value.Name,
      CompanyName: value.CompanyName,
      FirstName: value.FirstName,
      LastName: value.LastName,
      PersonAssigned: value.PersonAssigned,
      IndustryDomain: value.IndustryDomain,
      NumberofEmployees: value.NumberofEmployees,
      Designation: value.Designation,
      Status: value.Status,
      DemoStatus: value.DemoStatus,
      FollowUpBy: value.FollowUpBy,
      StatusReason: value.StatusReason,
      CreatedBy: value.CreatedBy,
      CreatedOn: value.CreatedOn,
      DataType: value.DataType,
      WhatsappStatus: value.WhatsappStatus,
      Mobile: value.Mobile,
      BusinessPhone:value.BusinessPhone,
      Email: value.Email,
      LinkedIn: value.LinkedIn,
      CompanyLinkedInPage: value.CompanyLinkedInPage,
      CompanyWebsite: value.CompanyWebsite,
      AddressLine1:value.AddressLine1,
      AddressLine2: value.AddressLine2,
      State: value.State,
      City: value.City,
      };
      this.crmService.editrawentity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.loadData(this.currentPage, this.pageSize);
        this.drawer.toggle();
      });
      this.crmService.editcontactentity(updatedItem).subscribe((res: any) => {
        console.log(res);
    })

    } else {
      debugger;
      let newItem = {
        Name: value.Name,
        CompanyName: value.CompanyName,
        FirstName: value.FirstName,
        LastName: value.LastName,
        PersonAssigned: value.PersonAssigned,
        IndustryDomain: value.IndustryDomain,
        NumberofEmployees: value.NumberofEmployees,
        Designation: value.Designation,
        Status: value.Status,
        DemoStatus: value.DemoStatus,
        FollowUpBy: value.FollowUpBy,
        StatusReason: value.StatusReason,
        CreatedBy: value.CreatedBy,
        CreatedOn: value.CreatedOn,
        DataType: value.DataType,
        WhatsappStatus: value.WhatsappStatus,
        Mobile: value.Mobile,
        BusinessPhone:value.BusinessPhone,
        Email: value.Email,
        LinkedIn: value.LinkedIn,
        CompanyLinkedInPage: value.CompanyLinkedInPage,
        CompanyWebsite: value.CompanyWebsite,
        AddressLine1:value.AddressLine1,
        AddressLine2: value.AddressLine2,
        State: value.State,
        City: value.City,
      };
      this.crmService.createraw(newItem).subscribe((res: any) => {
        console.log(res);
        this.loadData(this.currentPage, this.pageSize);
        this.drawer.toggle();
      });

      this.crmService.createcontact(newItem).subscribe((res: any) => {
        console.log(res);
    })

    
    this.crmService.createaccount(newItem).subscribe((res: any) => {
      console.log(res);
  })
  }
  }

  getlistofraw() {
    this.crmService.getlistoflead().subscribe((res: any[]) => {
      this.ngOnInit();
      console.log(res);
      this.RawdetailsData = res;
      this.RawdetailsData = res.filter((lead) => !lead.isDeleted);
      this.totalItems = this.RawdetailsData.length;
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

      this.crmService.softDeleteraw(leadId).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");
          this.getlistofraw();
          this.loadData(this.currentPage, this.pageSize); // Refresh the lead list
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
    this.ngOnInit();
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage, this.pageSize);
  }

  loadData(pageNumber: number, pageSize: number) {
    this.crmService
      .getraws(pageNumber, pageSize, this.searchKeyword)
      .subscribe((data: any) => {
        this.RawdetailsData = data.items.filter((lead) => !lead.isDeleted); // Filter out deleted leads
        this.totalItems = data.totalItems;
        this.RawdetailsData = data.items;
        this.totalItems = data.totalItems;
      });
  }

  //Get all currency
  // getallcurrency() {
  //   this.crmService.getlistofallcurrency().subscribe((res: any) => {
  //     this.currencyList = res;
  //     console.log(this.currencyList);
  //   });
  // }

  // Get seleted value
  // getCurrencySelect(event) {
  //   console.log(event);
  //   var a = this.currencyList.filter((x) => x.CurrencyId == event.value);
  //   //CurrencyName
  //   console.log(a);
  //   this.currencyName = a[0].CurrencyName;
  //   this.currencyId = a[0].CurrencyId;
  //   console.log(this.currencyName);
  // }


  //export
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.RawdetailsData
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    XLSX.writeFile(workbook, "LeadDetails.xlsx");
  }

  //download template
  downloadTemplate(): void {
    this.templatedata = [
      {
        // "Id":"",
        'Contact Person Name': "",
        'Optional Contact': "",
        'Company Linkedin page': "",
        'Company Name': "",
        'Company Product Services': "",
        'Company Website': "",
        'Created By': "",
        'Created On': "",
        'Data Type': "",
        'Date Added on WP': "",
        'Demo Date': "",
        'Designation': "",
        'Email Add.':'',
        'Industry Domain':"",
        'CP Linkedin Page':'',
        'Meeting Date and Time':"",
        'Contact No.':"",
        'Notes':"",
        'Number of employees':"",
        'Owner':"",
        'Owning Business Unit':"",
        'Person Assigned':"",
        'Record Created On':"",
        'Status':"",
        'Status Reason':"",
        'Whatsapp Status':"",
      },
    ];
    this.crmService.exportAsExcelFile(this.templatedata, "Lead Template");
  }



  //import
  Import(content1) {
    debugger;
    this.modalService.open(content1, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
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
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary", cellDates: true });

        // / grab first sheet /
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // / save data /
        data = XLSX.utils.sheet_to_json(ws);
      };
      reader.readAsBinaryString(target.files[0]);
      reader.onloadend = e => {
        this.keys = Object.keys(data);

        this.crmService.ImportExcelRaw(data).subscribe((res: any) => {
          this.Import(content1);
          this.updateMessage = res.message;
          this.faultyAssets = res.data;
          this.ngOnInit();
        })
      };
    } else {
      this.inputFile.nativeElement.value = "";
    }
  }

  CloseEvent() {
    this.drawer.close();
  }



  openDelete(RawId: any) {
    debugger
    const dialogRef = this.dialog.open(ConformComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        debugger
        this.crmService.softDeleteraw(RawId).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");
            this.getlistofraw();
            this.loadData(this.currentPage, this.pageSize);// Refresh the lead list
          },
          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }

 async addLead(value) {
    let newItem = {

      FirstName: value.FirstName,
      LastName: value.LastName,
      CompanyName : value.CompanyName,
      Designation : value.JobTitle,
      Mobile : value.MobilePhone,
      //BusinessPhone : value.BusinessPhone,
      Email: value.Email,
    
    };
    await this.crmService.createlead(newItem).subscribe((res: any) => {
      console.log(res);
    });
  }

}
