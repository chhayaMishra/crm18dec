import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CheckBoxManageService {
  selectAllCheckBox: boolean;
  checkBoxSelection: any = [];
  selectAllCheck: boolean;

  constructor() {}

  //#region select all check box function
  selectAll(check: boolean, eventsData, id) {
    this.selectAllCheckBox = check;

    if (check) {
      eventsData.forEach((element) => {
        this.checkBoxSelection.push(element[id]);
      });
    } else {
      this.checkBoxSelection.length = 0;
    }
    return this.checkBoxSelection;
  }
  //#endregion

  //#region select single check box function
  selectSingle(check: boolean, objId, tableData, id) {
    if (check) {
      this.checkBoxSelection.push(objId);
    } else {
      let index = this.checkBoxSelection.findIndex((x) => x == objId);
      this.checkBoxSelection.splice(index, 1);
    }
    this.selectAllCheckBoxCheck(tableData, id);

    let post = {
      checkBoxSelection: this.checkBoxSelection,
      selectAllCheck: this.selectAllCheck,
    };
    return post;
  }
  //#endregion

  //#region function to check the id is in the array or not for the make checkbox checked or unchecked
  checkForIdInArray(id) {
    return this.checkBoxSelection.indexOf(id) != -1 ? true : false;
  }
  //#endregion

  //#region function to make check box of select all checkbox
  selectAllCheckBoxCheck(tableData, id) {
    let checkArray = [];
    tableData.forEach((element) => {
      checkArray.push(element[id]);
    });
    if (checkArray.length == this.checkBoxSelection.length) {
      this.selectAllCheck = true;
    } else {
      this.selectAllCheck = false;
    }
  }
  //#endregion
}
