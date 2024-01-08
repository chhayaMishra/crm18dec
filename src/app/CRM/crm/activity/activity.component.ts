import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CrmService } from "src/app/shared/CRMService/crm.service";
// import { ConformComponent } from "../conform/conform.component";
// import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";
// import { QuickactivityComponent } from "../quickactivity/quickactivity.component";

// import { TimelineItem } from "ngx-vertical-timeline";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
})
export class ActivityComponent implements OnInit {
  AddformGroup: FormGroup;
  submit: boolean;
  CurrencyId: any;
  // lead status
  leadStatus = [
    {
      statusId: 1,
      statusName: "New Lead",
      BackgroundColor: "rgb(120, 148, 209)",
      color: "white",
      margin: "10px",
    },
    {
      statusId: 2,
      statusName: "Attempted to contact",
      BackgroundColor: "rgb(193, 148, 252)",
      color: "white",
      margin: "10px",
    },
    {
      statusId: 3,
      statusName: "Contacted",
      BackgroundColor: "rgb(252, 148, 200)",
      color: "white",
      margin: "10px",
    },
    {
      statusId: 4,
      statusName: "Closed",
      BackgroundColor: "rgb(90, 77, 206)",
      color: "white",
      margin: "10px",
    },
  ];
  id: any;
  searchKeyword: string = "";
  pageSize: number = 10;
  currentPage = 1;
  //CurrencydetailsData: any[] = [];
  ActivitiesDetails: MatTableDataSource<any>; // Use MatTableDataSource
  displayedColumns: string[] = ["sno", "Name", "Owner", "Item", "actions"];
  Data: any;
  public files: any[] = [];
  activity: any[] = [];
  Status: any;
  // items: TimelineItem[] = [];
  @ViewChild("picker") picker: any;
  @ViewChild(MatSort) sort: MatSort;
  totalItems: any;
  isEditing: boolean = false;
  currentItem: any = null;
  oppoId: any;
  leadId: any;
  lId: void;
  activityName: any;
  showContent: boolean = false;
  showTime: boolean = false;
  Email: any;
  Phone: any;
  Company: any;
  stausData: string;
  backg: string;
  bg: string;
  activtyDatalength: any;
  ActivityData: any[] = [];
  profileImageUrl: string;
  // ActivityData: any
  // dialogRef: any;
  baseUrl="http://192.168.1.50:8086/";

  // leadId: any;
  constructor(
    private crmService: CrmService,
    private _liveAnnouncer: LiveAnnouncer,
    public fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.AddformGroup = this.fb.group({
      Name: [""],
      Owner: [""],
      Item: [""],
      Status: [""],
      ActivityType: [""],
      Starttime: [""],
      Endtime: [""],
      Notes: [""],
      Email: [""],
      Phone: [""],
      Company: [""],
    });
    this.AddformGroup.get("ActivityType").valueChanges.subscribe((value) => {
      this.updateShowContent(value);
    });
    this.AddformGroup.get("ActivityType").valueChanges.subscribe((value) => {
      this.updateShowTime(value);
    });
    console.log("activity", data);

    this.activityName = data.activity;
    if (this.activityName == "lead") {
      this.leadId = data.Id;
      (this.Email = data.ldata.Email),
        (this.Phone = data.ldata.MobilePhone),
        (this.Company = data.ldata.CompanyName);

      this.AddformGroup.patchValue({
        Name: data.ldata.FirstName,
        Email: data.ldata.Email,
        Phone: data.ldata.MobilePhone,
        Company: data.ldata.CompanyName,
        Owner: localStorage.getItem("FULLNAME"),
      });
    } else {
      this.oppoId = data.Id;

      this.AddformGroup.patchValue({
        // Name: data.ldata.FirstName,
        // Email : data.ldata.Email,
        // Phone : data.ldata.MobilePhone,
        Name: data.odata.Account,
        Owner: localStorage.getItem("FULLNAME"),
      });
    }


    console.log(this.oppoId);
    // Initialize MatTableDataSource
    this.ActivitiesDetails = new MatTableDataSource();
  }

  updateShowTime(ActivityType: string) {
    this.showTime =
      ActivityType === "CallSummary" || ActivityType === "Meeting";
  }
  updateShowContent(ActivityType: string): void {
    this.showContent = ActivityType === "FileUpload";
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("drawer") drawer: MatDrawer;
  ngOnInit(): void {
    // Get Token from local storage

    // var token = localStorage.getItem(btoa('token'));

    this.profileImageUrl = localStorage.getItem("profileImageUrl");

    var userID = localStorage.getItem("userid");
    console.log(userID, "userID");
    console.log(this.Company);
    this.getactivitybylead(this.leadId);
    this.getactivitybyoppo(this.oppoId);

    // this.getallactivity();
  }

  onFormSubmit(form: any) {
    // debugger;
    this.submit = true;
    console.log(form);
    // Add your form submission logic here
  }

  // openEditDrawer(element: any) {
  //   debugger;
  //   this.currentItem = element;
  //   this.isEditing = true;

  //   this.AddformGroup.patchValue({
  //     Name: element.Name,
  //     Owner: element.Owner,
  //     Notes: element.Notes,
  //     Item: element.Item,
  //     Status: element.Status,
  //     ActivityType: element.ActivityType,
  //     StartTime: element.StartTime,
  //     EndTime: element.EndTime,
  //   });
  //   this.drawer.toggle(); // Open the drawer for editing
  // }

  // openAddDrawer() {
  //   debugger;
  //   this.isEditing = false;
  //   this.currentItem = null; // Reset currentItem when adding
  //   this.AddformGroup.reset(); // Clear form fields when adding
  //   this.drawer.toggle(); // Open the drawer for adding
  // }

  // AddUtility(value) {
  //   debugger;
  //   if (this.isEditing) {
  //     let updatedItem = {
  //       Name: value.Name,
  //       Owner: value.Owner,
  //       Notes: value.Notes,
  //       Item: value.Item,
  //       Status: value.Status,
  //       ActivityType: value.ActivityType,
  //       StartTime: value.StartTime,
  //       EndTime: value.EndTime,
  //     };
  //     this.crmService.editcurrencyentity(updatedItem).subscribe((res: any) => {
  //       console.log(res);
  //       this.ngOnInit();
  //       // Close the drawer after editing
  //       this.drawer.toggle();
  //     });
  //   } else {
  //     // Call the add API as before
  //     let newItem = {
  //       Name: value.Name,
  //       Owner: value.Owner,
  //       Notes: value.Notes,
  //       Item: value.Item,
  //       Status: value.Status,
  //       ActivityType: value.ActivityType,
  //       StartTime: value.StartTime,
  //       EndTime: value.EndTime,
  //       Email: this.Email,
  //       Phone: this.Phone,
  //       Company: this.Company,
  //     };
  //     // Call the API to add the new item
  //     this.crmService.createactivity(newItem).subscribe((res: any) => {
  //       debugger;
  //       console.log(res);
  //       this.ngOnInit();
  //       // Close the drawer after adding
  //       this.drawer.toggle();
  //     });
  //   }
  // }

  // this.AddformGroup.patchValue({ currencyId: this.currencyId });

  onFileChange(pFileList: File[]) {
    debugger;
    this.files = Object.keys(pFileList).map((key) => pFileList[key]);
  }

  deleteFile(f) {
    this.files = this.files.filter(function (w) {
      return w.name != f.name;
    });
  }

  // openConfirmDialog(pIndex): void {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //     panelClass: "modal-xs",
  //   });
  //   dialogRef.componentInstance.fName = this.files[pIndex].name;
  //   dialogRef.componentInstance.fIndex = pIndex;

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result !== undefined) {
  //       this.deleteFromArray(result);
  //     }
  //   });
  // }

  deleteFromArray(index) {
    console.log(this.files);
    this.files.splice(index, 1);
  }

  getallactivity() {
    this.crmService.getallactivity().subscribe((res: any) => {
      this.ActivityData = res;
      this.ActivityData.forEach((activity) =>
        console.log(`Status: ${activity.Status}`),
      );
      this.ActivityData.forEach((activity) =>
        console.log(`notes: ${activity.Notes}`),
      );
      this.ActivityData.forEach((activity) =>
        console.log(`start: ${activity.StartTime}`),
      );
      this.ActivityData.forEach((activity) =>
        console.log(`end: ${activity.EndTime}`),
      );
      this.Status = res.Status;
      this.activity = res.Item;
      console.log("acc", this.activity);

      console.log(this.ActivityData);
      console.log(this.Status);
    });
  }

  getactivitybylead(leadId) {
    debugger;
    this.crmService.getactivitybylead(leadId).subscribe((res: any) => {
      this.ActivityData = res.items;
     this.activtyDatalength = this.ActivityData.length;
      // this.updateStatusDisplay();
      console.log(this.ActivityData);

      // var activitydata = this.ActivityData.forEach((activity) => activity.LeadId ==leadId
      
      // );
      // console.log(`leaid: ${activity.LeadId}`),

      console.log("activity by lead", this.ActivityData);
      console.log(res.items);
    });
  }

  createbylead(leadId) {
    this.crmService
      .createactivitybylead(leadId, this.AddformGroup.value)
      .subscribe((res: any) => {
        debugger;

        console.log(res);
        this.ngOnInit();
      });
  }
  getactivitybyoppo(oppoId) {
    debugger;
    this.crmService.getallactivitybyoppoId(oppoId).subscribe((res: any) => {
      this.ActivityData = res.items;
      // this.updateStatusDisplay();
      // console.log(this.Data);
      console.log(this.ActivityData);
      // console.log(  this.lId);
      console.log(res.items);
    });
  }
  createbyoppo(oppoId) {
    this.crmService
      .createactivitybyoppo(oppoId, this.AddformGroup.value)
      .subscribe((res: any) => {
        debugger;
        console.log(res);
        this.ngOnInit();
      });
  }

  createactivity(val) {
    debugger;
    console.log(this.leadId);

    if (this.activityName == "lead") {
      debugger;

      this.crmService
        .createactivitybylead(this.leadId, this.AddformGroup.value)
        .subscribe((res: any) => {
          debugger;
          console.log(res);
          this.ngOnInit();
        });
    } else {
      this.crmService
        .createactivitybyoppo(this.oppoId, this.AddformGroup.value)
        .subscribe((res: any) => {
          debugger;
          console.log(res);
          this.ngOnInit();
        });
    }
  }

  CloseEvent() {
    this.dialogRef.close();
  }
  // updateStatusDisplay() {
  //   // Iterate through the data and update the "Status" property
  //   this.Data.forEach((activity) => {
  //     if (activity.Status === false) {
  //       activity.Status = "Lost";
  //     } else {
  //       activity.Status = "Won";
  //     }
  //   });
  // }

  // SetStatus steper
  SetStatus(status) {
    debugger;
    if (status == "New Lead") {
      this.currentStatus = status;

      this.stausData = "New Lead";
      this.statusColors[status].color = "#4691ff";
      this.statusColors[status].clicked = true;
      this.backg = "rgb(120, 148, 209)";
      this.bg = "blue";
      this.AddformGroup.patchValue({ Status: this.stausData });
    } else if (status == "Attempted to contact") {
      this.currentStatus = status;
      this.statusColors[status].color = "#4691ff";
      this.statusColors[status].clicked = true;
      this.backg = "rgb(193, 148, 252)";
      this.AddformGroup.patchValue({ Status: "Attempted to contact" });
    } else if (status == "Contacted") {
      this.currentStatus = status;
      this.statusColors[status].color = "#4691ff";
      this.statusColors[status].clicked = true;
      this.backg = "rgb(252, 148, 200)";
      this.AddformGroup.patchValue({ Status: "Contacted" });
    } else if (status == "Closed") {
      this.currentStatus = status;
      this.statusColors[status].color = "#4691ff";
      this.statusColors[status].clicked = true;
      this.backg = "rgb(90, 77, 206)";
      this.AddformGroup.patchValue({ Status: "Closed" });
    }
  }

  currentStatus: string = "";

  statusColors: { [key: string]: { color: string; clicked: boolean } } = {
    "New Lead": { color: "#4691ff", clicked: false },

    "Attempted to contact": { color: "#4691ff", clicked: false },
    Contacted: { color: "#4691ff", clicked: false },
    Closed: { color: "#4691ff", clicked: false },
    // You can add more statuses and their corresponding colors as needed
  };

  // SetStatus(status: string): void {
  //   // Set the current status when a list item is clicked
  //   this.currentStatus = status;

  //   // You can perform additional logic here if needed
  // }
}
