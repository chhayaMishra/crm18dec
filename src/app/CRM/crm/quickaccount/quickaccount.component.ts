import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrmService } from 'src/app/shared/CRMService/crm.service';

@Component({
  selector: 'app-quickaccount',
  templateUrl: './quickaccount.component.html',
  styleUrls: ['./quickaccount.component.scss']
})
export class QuickaccountComponent implements OnInit {

  AddformGroup: FormGroup;
  submit: boolean;

  AccountdetailsData: any[] = [];
  displayedColumns: string[] = ["actions"];

  constructor(
    public dialog: MatDialog,
    public crmService: CrmService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef< QuickaccountComponent>
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
      Fax: [""],
      ParentAccount: [""],
      PrimaryContact: [""],
      Website: ["" ],
      Address1: [""],
      Address2: [""],
      Address3: [""],
      TickerSymbol: [""],
      contactId: [""],
    });
  }

  ngOnInit(): void {}

  onFormSubmit(form: any) {
    debugger;
    this.submit = true;
    console.log(form);
  }

  AddUtility(value) {
    this.crmService
      .createaccount(this.AddformGroup.value)
      .subscribe((res: any) => {
        console.log(res);
        this.ngOnInit();
      });
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  CloseEvent() {
    this.dialogRef.close();
  }
}
