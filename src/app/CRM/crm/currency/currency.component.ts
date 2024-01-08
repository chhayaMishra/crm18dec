import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { ConformComponent } from "../conform/conform.component";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CrmService } from "src/app/shared/CRMService/crm.service";
@Component({
  selector: "app-currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.scss"],
})
export class CurrencyComponent implements OnInit {
  AddformGroup: FormGroup;
  submit: boolean;
  CurrencyId: any;
  id: any;
  searchKeyword: string = "";
  pageSize: number = 10;
  currentPage = 1;
  //CurrencydetailsData: any[] = [];
  CurrencydetailsData: MatTableDataSource<any>; // Use MatTableDataSource
  displayedColumns: string[] = [
    "sno",
    "CurrencyName",
    "CurrencyCode",
    "CurrencySymbol",
    "actions",
  ];
  Data: any;
  @ViewChild(MatSort) sort: MatSort;
  totalItems: any;
  isEditing: boolean = false;
  currentItem: any = null;
  constructor(
    private crmService: CrmService,
    private _liveAnnouncer: LiveAnnouncer,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.AddformGroup = this.fb.group({
      CurrencyName: ["", [Validators.required]],
      CurrencyCode: ["", [Validators.required]],
      CurrencySymbol: ["", [Validators.required]],
    });

        this.CurrencydetailsData = new MatTableDataSource();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("drawer") drawer: MatDrawer;
  ngOnInit(): void {
    this.loadData(this.currentPage, this.pageSize);
    this.CurrencydetailsData.sort = this.sort;
  }
  ngAfterViewInit(){
    this.CurrencydetailsData.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    debugger
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onFormSubmit(form: any) {
    // debugger;
    this.submit = true;
    console.log(form);
    // Add your form submission logic here
  }

  openEditDrawer(element: any) {
    debugger;
    this.currentItem = element;
    this.isEditing = true;
    // Bind the data to the form fields
    this.AddformGroup.patchValue({
      CurrencyName: element.CurrencyName,
      CurrencyCode: element.CurrencyCode,
      CurrencySymbol: element.CurrencySymbol,
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
      let updatedItem = {
        CurrencyId: this.currentItem.CurrencyId,
        CurrencyCode: value.CurrencyCode,
        CurrencyName: value.CurrencyName,
        CurrencySymbol: value.CurrencySymbol,
      };
      this.crmService.editcurrencyentity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
        // Close the drawer after editing
        this.drawer.toggle();
      });
    } else {
      // Call the add API as before
      let newItem = {
        CurrencyCode: value.CurrencyCode,
        CurrencyName: value.CurrencyName,
        CurrencySymbol: value.CurrencySymbol,
      };
      // Call the API to add the new item
      this.crmService.createcurrency(newItem).subscribe((res: any) => {
        debugger;
        console.log(res);
        this.ngOnInit();
        // Close the drawer after adding
        this.drawer.toggle();
      });
    }
  }

  

  DeleteUtility(currencyId: any) {
    debugger;
    this.crmService.deletecurrency(currencyId).subscribe((res: any) => {
      this.getlistofcurrency();
    });
    const confirmation = window.confirm(
      "Are you sure you want to delete the lead record?"
    );

    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)
      this.crmService.deletecurrency(currencyId).subscribe(
        (res: any) => {
          console.log("Item soft deleted successfully");
          this.getlistofcurrency(); // Refresh the lead list
        },
        (error) => {
          console.error("Error soft deleting item:", error);
        }
      );
    }
  }
  // getlistofcurrency() {
  //   debugger;
  //   this.crmService.getlistofallcurrency().subscribe((res: any) => {
  //     this.CurrencydetailsData = res;
  //     console.log(this.CurrencydetailsData);
  //    // this.ngOnInit();
  //   });
  // }
  getlistofcurrency() {
    debugger;
    this.crmService.getlistofallcurrency().subscribe((res: any) => {
      this.CurrencydetailsData.data = res; // Update MatTableDataSource data
      console.log(this.CurrencydetailsData);
    });
  }

  editlistofcurrency() {
    // debugger;
    this.crmService.getlistofallcurrency().subscribe((res: any) => {
      this.CurrencydetailsData = res
      console.log(res);
      console.log(res); 
    });
  }

  getcurrencybyid(value: any) {
    // debugger;
    this.crmService.getcurrencybyid(value.CurrencyId).subscribe((res: any) => {
      // this.Data = res;
      console.log(res);
    });
  }

  onSearchChange() {
    this.currentPage = 1; // Reset to the first page when searching
    this.AddformGroup.reset();
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
      .getcurrency(pageNumber, pageSize, this.searchKeyword)
      .subscribe((data: any) => {
       // this.CurrencydetailsData = data.items;
       debugger
       this.CurrencydetailsData.data = data.items; // Update MatTableDataSource data
        this.totalItems = data.totalItems;
        console.log("CurrencydetailsData-->",this.CurrencydetailsData);
      });
  }
  CloseEvent()
  {
    this.drawer.close();
  }

  openDelete(currencyId: any) {
    debugger
    const dialogRef = this.dialog.open(ConformComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.crmService.deletecurrency(currencyId).subscribe(
          (res: any) => {
            console.log("Item soft deleted successfully");
  
            this.getlistofcurrency(); // Refresh the lead list
            this.ngOnInit();
          },
  
          (error) => {
            console.error("Error soft deleting item:", error);
          }
        );
      }
    });
  }
}
