import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class PopupFunctionService {
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private dialog: MatDialog,
  ) {}

  //#region popup open function
  poupOpenFunction(content, size) {
    this.modalService
      .open(content, {
        windowClass: "radious",
        size: size,
        centered: true,
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.modalService.dismissAll(
            reason,
          )}`;
        },
      );
  }
  //#endregion

  matDialogBoxPopup(component, information, width) {
    this.dialog
      .open(component, {
        panelClass: "my-centered-dialog",
        width: width,
        data: information,
      })
      .afterClosed()
      .subscribe((data) => {});
  }
}
