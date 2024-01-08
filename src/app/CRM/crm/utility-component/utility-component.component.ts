import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { UtilityserviceService } from 'src/app/shared/Utility/utilityservice.service';

@Component({
  selector: 'app-utility-component',
  templateUrl: './utility-component.component.html',
  styleUrls: ['./utility-component.component.scss']
})
export class UtilityComponentComponent implements OnInit {
  panelOpenState = true;
  utilityForm: FormGroup;
  companyName: any = [
    {
      cname: 'ABC',
      gstNo: 123456789,
      address: 'Indore',
      email: 'test@gmail.com',
      createnodate: '06 Jul 2023',
    },
    {
      cname: 'ABCd',
      gstNo: 1234567890,
      address: 'Indore',
      email: 'test1@gmail.com',
      createnodate: '06 Jul 2023',
    },
    {
      cname: 'ABCe',
      gstNo: 123456789,
      address: 'Indore',
      email: 'teste@gmail.com',
      createnodate: '06 Jul 2023',
    },
    {
      cname: 'ABCr',
      gstNo: 123456789,
      address: 'Indore',
      email: 'test@gmail.com',
      createnodate: '06 Jul 2023',
    },
    {
      cname: 'ABCt',
      gstNo: 123456789,
      address: 'Indore',
      email: 'testt@gmail.com',
      createnodate: '06 Jul 2023',
    },
  ];
  Comapnydetails: any;
  Utilitydetails: any;
  ComapnydetailsData: any = [];
  ComapnydetailsUtilityList: any = [];
  isEditing: boolean;
  currentItem: null;
  AddformGroup:FormGroup;
  myFlagForSlideToggle: boolean = false;
  enabled: boolean = false;
  registerCompanyName: any;
  companyId: any;
  Editform: boolean = false;
  Addform: boolean = false;
  utilityId: any;
  ComanyList: any = [];
  companyDomain: any;
  constructor(
    private utilityservice: UtilityserviceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    // private tosterservice: MainService       ///tostar service
  ) {
    this.utilityForm = fb.group({
      utilityName: [null, Validators.required],
      linkUrl: [null, Validators.required],
      userName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(500),
        ]),
      ],
      userToken: [null, Validators.required],
      serverIp: [null, Validators.required],
      //'isDefaultCreated':[null, Validators.required],
      isEnabled: [null, Validators.required],
    });

    this.AddformGroup = this.fb.group({
      utilityName: ['', Validators.required],
      linkUrl: [''],
      userName: [''],
      userToken: [''],
      serverIp: [''],
      isEnabled: [''],
      ComanyName: [''],
    });
  }
  @ViewChild("drawer") drawer: MatDrawer;
  ngOnInit(): void {
    // this.GetSuperadmin();
    this.GetAllByCompanyGroupSuperadmin();
    this.GetAllCompanies();
  }

  async  GetAllCompanies() {
    this.utilityservice.GetAllCompanies().subscribe((res: any) => {
      console.log(res, 'rescomapny');
      this.ComanyList = res.data.jsonData;
      // var comData = this.ComanyList.filter(
      //   (x: { companyId: any }) => x.companyId == this.data.data.companyId
      // );
      // this.companyDomain = comData[0].companyDomain;
    });
  }

  GetAllByCompanyGroupSuperadmin() {
    this.utilityservice
      .GetAllByCompanyGroupSuperadmin()
      .subscribe((res: any) => {
        console.log(res);
        this.ComapnydetailsData = res['data']['jsonData'];
      });
  }

  GetSuperadmin() {
    this.utilityservice.GetSuperadmin().subscribe((res: any) => {
      if (res.status == true) {
        this.Utilitydetails = res.data.jsonData;
        console.log(this.Utilitydetails);
      }
    });
  }
  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    debugger;
    //this.SharePointCreateItem(form)
  }

  openAddDrawer() {
    debugger
    this.isEditing = false;
    this.currentItem = null; // Reset currentItem when adding
    this.AddformGroup.reset(); // Clear form fields when adding
    this.drawer.toggle(); // Open the drawer for adding
  }
  onNoClick(): void {
    this.drawer.close();
  }
  CloseEvent() {
    this.drawer.close();
  }
 
 async openEditDrawer(element: any) {
    debugger;
    this.currentItem = element;
    this.isEditing = true;
    this.utilityId = element.utilityId;
    //companyId
    var a =  this.ComanyList.filter(x=>x.companyId==element.companyId)
    // Bind the data to the form fields
    await this.AddformGroup.patchValue({
      //   this.warehouseForm.patchValue({ "ComanyName":  }),
      utilityName: element.utilityName,
      linkUrl: element.linkUrl,
      userName: element.userName,
      userToken: element.userToken,
      serverIp: element.serverIp,
      isEnabled: element.isEnabled,
      ComanyName: a[0].companyDomain
    });
    this.drawer.toggle(); // Open the drawer for editing
  }

  AddUtility() {
    debugger
    if (this.AddformGroup.value.utilityName) {
      this.enabled = true;
    var a =  this.ComanyList.filter(x=>x.companyDomain==this.AddformGroup.value.ComanyName)
      //ComanyName
      let post = {
        utilityName: this.AddformGroup.value.utilityName,
        linkUrl: this.AddformGroup.value.linkUrl,
        userName: this.AddformGroup.value.userName,
        userToken: this.AddformGroup.value.userToken,
        serverIp: this.AddformGroup.value.serverIp,
        companyId: a[0].companyId,
        isEnabled: this.AddformGroup.value.isEnabled,
      };
      this.utilityservice.CreateSuperadmin(post).subscribe((res: any) => {
        if (res.status == true) {
          this.utilityservice.showToaster('Utility Added SuccessFully');
          setTimeout(() => {
            this.CloseEvent();
            this.GetAllByCompanyGroupSuperadmin();
          }, 3000);
        } else {
          this.utilityservice.showErrorToaster(res.message);
          setTimeout(() => {
            this.CloseEvent();
            this.GetAllByCompanyGroupSuperadmin();
          }, 3000);
        }
      });
    } else {
      this.enabled = false;
    }
  }

  EditUtility() {
    debugger
    var a =  this.ComanyList.filter(x=>x.companyDomain==this.AddformGroup.value.ComanyName)
    if (this.AddformGroup.value.utilityName) {
      this.enabled = true;
      let post = {
        utilityId: this.utilityId,
        utilityName: this.AddformGroup.value.utilityName,
        linkUrl: this.AddformGroup.value.linkUrl,
        userName: this.AddformGroup.value.userName,
        userToken: this.AddformGroup.value.userToken,
        serverIp: this.AddformGroup.value.serverIp,
        companyId: a[0].companyId,
        isEnabled: this.AddformGroup.value.isEnabled,
      };
      this.utilityservice.UpdateSuperadmin(post).subscribe((res: any) => {
        if (res.status == true) {
          this.utilityservice.showToaster('Utility Added SuccessFully');
          setTimeout(() => {
            this.CloseEvent();
            this.GetAllByCompanyGroupSuperadmin();
          }, 3000);
        } else {
          this.utilityservice.showErrorToaster(res.message);
          setTimeout(() => {
            this.CloseEvent();
            this.GetAllByCompanyGroupSuperadmin();
          }, 3000);
        }
      });
    } else {
      this.enabled = false;
    }
  }

  openDialog(): void {
  //   const dialogRef = this.dialog.open(CompanydialogComponent, {
  //     data: {
  //      // data: conpanydata,
  //       id: '',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.GetAllByCompanyGroupSuperadmin();
  //   });
   }

   DeleteUtility(id: any) {
    this.utilityservice.DeleteSuperadminUtility(id).subscribe((res: any) => {
      if (res.status == true) {
        this.utilityservice.showToaster('Delete sucessfully');

        setTimeout(() => {
          this.GetAllByCompanyGroupSuperadmin();
        }, 1000);

      } else {
        this.utilityservice.showErrorToaster(res.message);
      }
    });
  }



getComanySelect(event: any) {
  console.log(event);
  this.companyName=event.companyDomain;
  var a =  this.ComanyList.filter(x=>x.companyDomain==event.companyDomain)
  this.companyId = a[0].companyId;
}

}