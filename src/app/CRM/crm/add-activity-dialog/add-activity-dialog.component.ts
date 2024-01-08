import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.scss']
})
export class AddActivityDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Add your logic to handle the new activity here
  addActivity(): void {
    // Example: Send data to a service, update the UI, etc.
    // ...

    // Close the dialog
    this.dialogRef.close();
  }
}
