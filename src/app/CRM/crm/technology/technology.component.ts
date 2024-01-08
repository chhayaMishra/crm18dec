import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConformComponent } from '../conform/conform.component';
import { CrmService } from 'src/app/shared/CRMService/crm.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  element = true;
 
  AddformGroup: FormGroup;
  submit: boolean;
  panelOpenState = true;
  show = true;
  // LeaddetailsData: any[] = [];
  dataSource = new MatTableDataSource<any>();
  // TechnologydetailsData: any[] = [];
  pageSize: number = 10;
 isEditing = false;
 currentItem: any=null;
 currentPage = 1;
 isEditMode = false;
//  pageSize = 10;
 
 totalItems = 0;
  Technology: any[] = [];
 editData: any = null;
 searchKeyword: string = '';
 deletedTechnology: any[] = [];
 
  displayedColumns: string[] = [
    "sno",
    "Technologyname",
    "Description",
    "Actions",
  ];
  data = {
    name: 'hii',
    TechnoId: 1,
  }
 
 
  TechnologydetailsData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // drawer: any;
      @ViewChild('drawer') drawer: MatDrawer;
   
 
  constructor(
 
    private crmService: CrmService,

    public fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.AddformGroup = this.fb.group({
      Technologyname: [""],
      Description: [""],
     
     
    });
  }
  ngOnInit(): void {
    this.getlistofTechno();
    this.loadData(this.currentPage, this.pageSize);
  }
  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }
 
  openEditDrawer(element: any) {
    debugger;
    this.currentItem = element;
    this.isEditing = true;
    // Bind the data to the form fields
 
    this.AddformGroup.patchValue({
      Technologyname: element.Technologyname,
      Description: element.Description,
     
    });
 
    this.drawer.toggle(); // Open the drawer for editing
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
    if (this.isEditing) {
      // Call the edit API with this.currentItem.LeadId
 
      let updatedItem = {
      TechnoId: this.currentItem.TechnoId,
        Technologyname: value.Technologyname,
        Description: value.Description,
       
 
        // ... update other fields
      };
 
      this.crmService.editTechnoentity(updatedItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit()  
        this.drawer.toggle();
      });
    } else {
      // Call the add API as before
      let newItem = {
        Technologyname: value.Technologyname,
        Description: value.Description,
 
 
        // ... other fields for the new item
      };
 
      this.crmService.createTechno(newItem).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit()
        this.drawer.toggle();
      });
 
    }
  }
 
  getlistofTechno() {
    debugger;
    this.crmService.getlistofTechno().subscribe((res: any) => {
      
      console.log(res);
      this.TechnologydetailsData = res?.items;
      console.log(res);
      // this.OpportunitydetailsData = new MatTableDataSource(res);
      // this.TechnologydetailsData.paginator = this.paginator;
      // this.OpportunitydetailsData.sort = this.sort;
    });
  }
 
  onPageChange(event: PageEvent) {
    debugger;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage, this.pageSize);
  }
 
  loadData(pageNumber: number, pageSize: number) {
    // console.log(pageNumber, pageNumber.toString());
    this.crmService.getTechno(pageNumber, pageSize, this.searchKeyword)
    // this.crmService.getLeads(pageNumber, pageSize, this.searchKeyword)
 
      .subscribe((data: any) => {
        this.TechnologydetailsData = data.items;
        this.totalItems = data.totalItems;
      });
  }
 
  // confirmDelete(TechnoId: any) {
  //   const confirmation = window.confirm('Are you sure you want to Delete the TECHNOLOGY record?');
 
  //   if (confirmation) {
  //     this.deleteUtilityItem(TechnoId);
  //   }
  // }
  deleteUtilityItem(TechnoId: any) {
    debugger;
    const confirmation = window.confirm('Are you sure you want to Delete the TECHNOLOGY record?');
    if (confirmation) {
      // Instead of directly deleting the item, mark it as deleted (soft delete)
      this.crmService.softDeleteTechnology(TechnoId).subscribe(
        (res: any) => {
          console.log('Item soft deleted successfully');
          this.getlistofTechno();
          this.ngOnInit();
        },
 
        (error) => {
          console.error('Error soft deleting item:', error);
        }
      );
    }
  }
  CloseEvent()
  {
    this.drawer.close();
  }
  openDelete(TechnoId: any) {
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
        this.crmService.softDeleteTechnology(TechnoId).subscribe(
          (res: any) => {
            console.log('Item soft deleted successfully');
            this.getlistofTechno();
           
          },
   
          (error) => {
            console.error('Error soft deleting item:', error);
          }
        );
      }
    });
  }
 
 
}
